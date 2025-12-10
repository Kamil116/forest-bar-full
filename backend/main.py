from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError, OperationalError
from typing import List, Optional
import os
import shutil
from datetime import datetime, timedelta

from database import get_db, engine
from models import Base, Employee, Product, User, SMSCode, Vacancy, Profile
from schemas import (
    EmployeeCreate, EmployeeUpdate, EmployeeResponse,
    ProductCreate, ProductUpdate, ProductResponse,
    VacancyCreate, VacancyUpdate, VacancyResponse,
    ProfileCreate, ProfileUpdate, ProfileResponse,
    PhoneRequest, VerifyCodeRequest, AuthResponse, UserResponse
)
from sms_service import sms_service
from auth_utils import create_access_token, get_current_user
from utils import list_to_json, json_to_list, hash_password, verify_password

# Создаем таблицы в базе данных
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Forest Bar API",
    description="API для управления сотрудниками и каталогом товаров",
    version="1.0.0"
)

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://178.72.139.21"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создаем папку для загрузки файлов
UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# Подключаем статические файлы
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# ========== AUTH ENDPOINTS ==========

@app.post("/auth/send-code")
def send_sms_code(request: PhoneRequest, db: Session = Depends(get_db)):
    """
    Отправить SMS код на указанный номер телефона
    
    - Создает пользователя если его нет
    - Генерирует и отправляет 6-значный код
    - Код действителен 5 минут
    """
    phone = request.phone
    
    # Ищем или создаем пользователя
    user = db.query(User).filter(User.phone == phone).first()
    
    if not user:
        user = User(phone=phone)
        db.add(user)
        db.commit()
        db.refresh(user)
    
    # Генерируем и отправляем код
    code = sms_service.send_code(phone)
    
    if code is None:
        raise HTTPException(
            status_code=500,
            detail="Не удалось отправить SMS. Попробуйте позже."
        )
    
    # Сохраняем код в базе данных
    expires_at = datetime.utcnow() + timedelta(minutes=5)
    sms_code = SMSCode(
        user_id=user.id,
        code=code,
        expires_at=expires_at
    )
    db.add(sms_code)
    db.commit()
    
    return {
        "message": "SMS код отправлен",
        "phone": phone,
        "expires_in_seconds": 300
    }


@app.post("/auth/verify-code", response_model=AuthResponse)
def verify_sms_code(request: VerifyCodeRequest, db: Session = Depends(get_db)):
    """
    Проверить SMS код и авторизовать пользователя
    
    - Проверяет код из SMS
    - Возвращает JWT токен при успешной проверке
    """
    phone = request.phone
    code = request.code
    
    # Ищем пользователя
    user = db.query(User).filter(User.phone == phone).first()
    
    if not user:
        raise HTTPException(
            status_code=404,
            detail="Пользователь не найден. Сначала запросите код."
        )
    
    # Ищем неиспользованный код
    sms_code = db.query(SMSCode).filter(
        SMSCode.user_id == user.id,
        SMSCode.code == code,
        SMSCode.is_used == False,
        SMSCode.expires_at > datetime.utcnow()
    ).first()
    
    if not sms_code:
        raise HTTPException(
            status_code=400,
            detail="Неверный или истекший код"
        )
    
    # Помечаем код как использованный
    sms_code.is_used = True
    db.commit()
    
    # Создаем JWT токен
    access_token = create_access_token(
        data={"user_id": user.id, "phone": user.phone}
    )
    
    return AuthResponse(
        access_token=access_token,
        token_type="bearer",
        user_id=user.id,
        phone=user.phone
    )


@app.get("/auth/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """
    Получить информацию о текущем авторизованном пользователе
    
    Требуется JWT токен в заголовке Authorization: Bearer <token>
    """
    return current_user


@app.post("/auth/logout")
def logout(current_user: User = Depends(get_current_user)):
    """
    Выход из системы
    
    На клиенте нужно удалить JWT токен
    """
    return {"message": "Успешный выход из системы"}

# ========== HELPER FUNCTIONS ==========

def convert_product_response(product: Product) -> dict:
    """Преобразует Product с JSON полями в словарь для ответа"""
    return {
        "id": product.id,
        "name": product.name,
        "images": json_to_list(product.images),
        "price": product.price,
        "product_type": product.product_type,
        "long_description": product.long_description,
        "seller_id": product.seller_id,
        "vitamins": json_to_list(product.vitamins),
        "minerals": json_to_list(product.minerals),
        "antioxidants": json_to_list(product.antioxidants),
        "energy_value": product.energy_value,
        "shelf_life": product.shelf_life,
        "created_at": product.created_at,
        "updated_at": product.updated_at
    }

def convert_vacancy_response(vacancy: Vacancy) -> dict:
    """Преобразует Vacancy с JSON полями в словарь для ответа"""
    return {
        "id": vacancy.id,
        "title": vacancy.title,
        "city": vacancy.city,
        "schedule": vacancy.schedule,
        "salary": vacancy.salary,
        "additional_conditions": json_to_list(vacancy.additional_conditions),
        "long_description": vacancy.long_description,
        "created_at": vacancy.created_at,
        "updated_at": vacancy.updated_at
    }

# ========== EMPLOYEE ENDPOINTS ==========

@app.get("/employees", response_model=List[EmployeeResponse])
def get_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Получить список всех сотрудников"""
    try:
        employees = db.query(Employee).offset(skip).limit(limit).all()
        return employees
    except OperationalError as e:
        raise HTTPException(
            status_code=500, 
            detail="Ошибка подключения к базе данных. Проверьте, что база данных доступна."
        )
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Ошибка базы данных: {str(e)}"
        )

@app.get("/employees/{employee_id}", response_model=EmployeeResponse)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    """Получить сотрудника по ID"""
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Сотрудник не найден")
    return employee

@app.post("/employees", response_model=EmployeeResponse)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    """Создать нового сотрудника"""
    db_employee = Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.put("/employees/{employee_id}", response_model=EmployeeResponse)
def update_employee(employee_id: int, employee: EmployeeUpdate, db: Session = Depends(get_db)):
    """Обновить данные сотрудника"""
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not db_employee:
        raise HTTPException(status_code=404, detail="Сотрудник не найден")
    
    update_data = employee.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_employee, field, value)
    
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.delete("/employees/{employee_id}")
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    """Удалить сотрудника"""
    db_employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not db_employee:
        raise HTTPException(status_code=404, detail="Сотрудник не найден")
    
    db.delete(db_employee)
    db.commit()
    return {"message": "Сотрудник удален"}

# ========== PRODUCT ENDPOINTS ==========

@app.get("/products", response_model=List[ProductResponse])
def get_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Получить список всех товаров"""
    try:
        products = db.query(Product).offset(skip).limit(limit).all()
        return [convert_product_response(p) for p in products]
    except OperationalError as e:
        raise HTTPException(
            status_code=500, 
            detail="Ошибка подключения к базе данных. Проверьте, что база данных доступна."
        )
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Ошибка базы данных: {str(e)}"
        )

@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Получить товар по ID"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    return convert_product_response(product)

@app.post("/products", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    """Создать новый товар"""
    product_data = product.dict()
    
    # Преобразуем списки в JSON
    product_data['images'] = list_to_json(product_data.get('images'))
    product_data['vitamins'] = list_to_json(product_data.get('vitamins'))
    product_data['minerals'] = list_to_json(product_data.get('minerals'))
    product_data['antioxidants'] = list_to_json(product_data.get('antioxidants'))
    
    db_product = Product(**product_data)
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    # Преобразуем JSON обратно в списки для ответа
    return convert_product_response(db_product)

@app.put("/products/{product_id}", response_model=ProductResponse)
def update_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    """Обновить данные товара"""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    
    update_data = product.dict(exclude_unset=True)
    
    # Преобразуем списки в JSON
    if 'images' in update_data:
        update_data['images'] = list_to_json(update_data['images'])
    if 'vitamins' in update_data:
        update_data['vitamins'] = list_to_json(update_data['vitamins'])
    if 'minerals' in update_data:
        update_data['minerals'] = list_to_json(update_data['minerals'])
    if 'antioxidants' in update_data:
        update_data['antioxidants'] = list_to_json(update_data['antioxidants'])
    
    for field, value in update_data.items():
        setattr(db_product, field, value)
    
    db.commit()
    db.refresh(db_product)
    return convert_product_response(db_product)

@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    """Удалить товар"""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    
    db.delete(db_product)
    db.commit()
    return {"message": "Товар удален"}

@app.post("/products/{product_id}/upload-image")
def upload_product_image(
    product_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Загрузить изображение для товара"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Файл должен быть изображением")
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"product_{product_id}_{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Добавляем изображение в список
    image_url = f"/uploads/{filename}"
    current_images = json_to_list(product.images) or []
    current_images.append(image_url)
    product.images = list_to_json(current_images)
    db.commit()
    
    return {"message": "Изображение загружено", "image_url": image_url}

@app.post("/employees/{employee_id}/upload-photo")
def upload_employee_photo(
    employee_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Загрузить фотографию сотрудника"""
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Сотрудник не найден")
    
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Файл должен быть изображением")
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"employee_{employee_id}_{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    employee.photo_url = f"/uploads/{filename}"
    db.commit()
    
    return {"message": "Фотография загружена", "photo_url": employee.photo_url}

# ========== VACANCY ENDPOINTS ==========

@app.get("/vacancies", response_model=List[VacancyResponse])
def get_vacancies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Получить список всех вакансий"""
    vacancies = db.query(Vacancy).offset(skip).limit(limit).all()
    return [convert_vacancy_response(v) for v in vacancies]

@app.get("/vacancies/{vacancy_id}", response_model=VacancyResponse)
def get_vacancy(vacancy_id: int, db: Session = Depends(get_db)):
    """Получить вакансию по ID"""
    vacancy = db.query(Vacancy).filter(Vacancy.id == vacancy_id).first()
    if not vacancy:
        raise HTTPException(status_code=404, detail="Вакансия не найдена")
    return convert_vacancy_response(vacancy)

@app.post("/vacancies", response_model=VacancyResponse)
def create_vacancy(vacancy: VacancyCreate, db: Session = Depends(get_db)):
    """Создать новую вакансию"""
    vacancy_data = vacancy.dict()
    vacancy_data['additional_conditions'] = list_to_json(vacancy_data.get('additional_conditions'))
    
    db_vacancy = Vacancy(**vacancy_data)
    db.add(db_vacancy)
    db.commit()
    db.refresh(db_vacancy)
    return convert_vacancy_response(db_vacancy)

@app.put("/vacancies/{vacancy_id}", response_model=VacancyResponse)
def update_vacancy(vacancy_id: int, vacancy: VacancyUpdate, db: Session = Depends(get_db)):
    """Обновить данные вакансии"""
    db_vacancy = db.query(Vacancy).filter(Vacancy.id == vacancy_id).first()
    if not db_vacancy:
        raise HTTPException(status_code=404, detail="Вакансия не найдена")
    
    update_data = vacancy.dict(exclude_unset=True)
    if 'additional_conditions' in update_data:
        update_data['additional_conditions'] = list_to_json(update_data['additional_conditions'])
    
    for field, value in update_data.items():
        setattr(db_vacancy, field, value)
    
    db.commit()
    db.refresh(db_vacancy)
    return convert_vacancy_response(db_vacancy)

@app.delete("/vacancies/{vacancy_id}")
def delete_vacancy(vacancy_id: int, db: Session = Depends(get_db)):
    """Удалить вакансию"""
    db_vacancy = db.query(Vacancy).filter(Vacancy.id == vacancy_id).first()
    if not db_vacancy:
        raise HTTPException(status_code=404, detail="Вакансия не найдена")
    
    db.delete(db_vacancy)
    db.commit()
    return {"message": "Вакансия удалена"}

# ========== PROFILE ENDPOINTS ==========

@app.get("/profiles", response_model=List[ProfileResponse])
def get_profiles(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Получить список всех профилей"""
    profiles = db.query(Profile).offset(skip).limit(limit).all()
    return profiles

@app.get("/profiles/{profile_id}", response_model=ProfileResponse)
def get_profile(profile_id: int, db: Session = Depends(get_db)):
    """Получить профиль по ID"""
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Профиль не найден")
    return profile

@app.post("/profiles", response_model=ProfileResponse)
def create_profile(profile: ProfileCreate, db: Session = Depends(get_db)):
    """Создать новый профиль"""
    # Проверяем, что телефон уникален
    existing = db.query(Profile).filter(Profile.phone == profile.phone).first()
    if existing:
        raise HTTPException(status_code=400, detail="Профиль с таким телефоном уже существует")
    
    profile_data = profile.dict()
    password = profile_data.pop('password')
    profile_data['password_hash'] = hash_password(password)
    
    db_profile = Profile(**profile_data)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

@app.put("/profiles/{profile_id}", response_model=ProfileResponse)
def update_profile(profile_id: int, profile: ProfileUpdate, db: Session = Depends(get_db)):
    """Обновить данные профиля"""
    db_profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Профиль не найден")
    
    update_data = profile.dict(exclude_unset=True)
    
    # Если обновляется пароль, хешируем его
    if 'password' in update_data:
        password = update_data.pop('password')
        update_data['password_hash'] = hash_password(password)
    
    for field, value in update_data.items():
        setattr(db_profile, field, value)
    
    db.commit()
    db.refresh(db_profile)
    return db_profile

@app.delete("/profiles/{profile_id}")
def delete_profile(profile_id: int, db: Session = Depends(get_db)):
    """Удалить профиль"""
    db_profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if not db_profile:
        raise HTTPException(status_code=404, detail="Профиль не найден")
    
    db.delete(db_profile)
    db.commit()
    return {"message": "Профиль удален"}

# ========== HEALTH CHECK ==========

@app.get("/")
def root():
    return {"message": "Forest Bar API работает!"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)