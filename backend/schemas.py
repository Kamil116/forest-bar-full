from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime
import re

# ========== EMPLOYEE SCHEMAS ==========

class EmployeeBase(BaseModel):
    """Базовая схема сотрудника"""
    first_name: str = Field(..., min_length=1, max_length=100, description="Имя")
    last_name: str = Field(..., min_length=1, max_length=100, description="Фамилия")
    middle_name: Optional[str] = Field(None, max_length=100, description="Отчество")
    city: str = Field(..., min_length=2, max_length=100, description="Город")
    region: str = Field(..., min_length=2, max_length=100, description="Область")
    email: Optional[str] = Field(None, max_length=255, description="Электронная почта")
    phone: str = Field(..., min_length=10, max_length=20, description="Номер телефона")
    referral_link: Optional[str] = Field(None, max_length=500, description="Реферальная ссылка")
    address: str = Field(..., min_length=5, max_length=255, description="Адрес")
    work_hours: str = Field(..., min_length=5, max_length=100, description="Часы работы")

class EmployeeCreate(EmployeeBase):
    """Схема для создания сотрудника"""
    pass

class EmployeeUpdate(BaseModel):
    """Схема для обновления сотрудника (все поля опциональные)"""
    first_name: Optional[str] = Field(None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(None, min_length=1, max_length=100)
    middle_name: Optional[str] = Field(None, max_length=100)
    city: Optional[str] = Field(None, min_length=2, max_length=100)
    region: Optional[str] = Field(None, min_length=2, max_length=100)
    email: Optional[str] = Field(None, max_length=255)
    phone: Optional[str] = Field(None, min_length=10, max_length=20)
    referral_link: Optional[str] = Field(None, max_length=500)
    address: Optional[str] = Field(None, min_length=5, max_length=255)
    work_hours: Optional[str] = Field(None, min_length=5, max_length=100)

class EmployeeResponse(EmployeeBase):
    """Схема для ответа с данными сотрудника"""
    id: int
    photo_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ========== VACANCY SCHEMAS ==========

class VacancyBase(BaseModel):
    """Базовая схема вакансии"""
    title: str = Field(..., min_length=1, max_length=255, description="Название вакансии")
    city: str = Field(..., min_length=2, max_length=100, description="Город")
    schedule: str = Field(..., min_length=2, max_length=100, description="График работы")
    salary: str = Field(..., min_length=1, max_length=100, description="Зарплата")
    additional_conditions: Optional[list] = Field(None, description="Дополнительные условия (список)")
    long_description: str = Field(..., min_length=10, description="Длинное описание")

class VacancyCreate(VacancyBase):
    """Схема для создания вакансии"""
    pass

class VacancyUpdate(BaseModel):
    """Схема для обновления вакансии"""
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    city: Optional[str] = Field(None, min_length=2, max_length=100)
    schedule: Optional[str] = Field(None, min_length=2, max_length=100)
    salary: Optional[str] = Field(None, min_length=1, max_length=100)
    additional_conditions: Optional[list] = None
    long_description: Optional[str] = Field(None, min_length=10)

class VacancyResponse(VacancyBase):
    """Схема для ответа с данными вакансии"""
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ========== PRODUCT SCHEMAS ==========

class ProductBase(BaseModel):
    """Базовая схема товара"""
    name: str = Field(..., min_length=1, max_length=255, description="Название товара")
    images: Optional[list] = Field(None, description="Список URL изображений")
    price: float = Field(..., gt=0, description="Цена")
    product_type: str = Field(..., min_length=1, max_length=100, description="Тип (мёд, чай, ягода, ягодный сбор)")
    long_description: str = Field(..., min_length=10, description="Длинное описание")
    seller_id: int = Field(..., gt=0, description="ID продавца")
    
    # Пищевая ценность
    vitamins: Optional[list] = Field(None, description="Витамины")
    minerals: Optional[list] = Field(None, description="Минералы")
    antioxidants: Optional[list] = Field(None, description="Антиоксиданты")
    energy_value: Optional[str] = Field(None, max_length=100, description="Энергетическая ценность")
    shelf_life: Optional[str] = Field(None, max_length=100, description="Срок годности")

class ProductCreate(ProductBase):
    """Схема для создания товара"""
    pass

class ProductUpdate(BaseModel):
    """Схема для обновления товара (все поля опциональные)"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    images: Optional[list] = None
    price: Optional[float] = Field(None, gt=0)
    product_type: Optional[str] = Field(None, min_length=1, max_length=100)
    long_description: Optional[str] = Field(None, min_length=10)
    seller_id: Optional[int] = Field(None, gt=0)
    vitamins: Optional[list] = None
    minerals: Optional[list] = None
    antioxidants: Optional[list] = None
    energy_value: Optional[str] = Field(None, max_length=100)
    shelf_life: Optional[str] = Field(None, max_length=100)

class ProductResponse(ProductBase):
    """Схема для ответа с данными товара"""
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ========== PROFILE SCHEMAS ==========

class ProfileBase(BaseModel):
    """Базовая схема профиля"""
    phone: str = Field(..., min_length=10, max_length=20, description="Номер телефона")
    city: Optional[str] = Field(None, max_length=100, description="Город")

class ProfileCreate(ProfileBase):
    """Схема для создания профиля"""
    password: str = Field(..., min_length=6, description="Пароль")

class ProfileUpdate(BaseModel):
    """Схема для обновления профиля"""
    phone: Optional[str] = Field(None, min_length=10, max_length=20)
    city: Optional[str] = Field(None, max_length=100)
    password: Optional[str] = Field(None, min_length=6, description="Новый пароль")

class ProfileResponse(ProfileBase):
    """Схема для ответа с данными профиля"""
    id: int
    purchase_count: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# ========== AUTH SCHEMAS ==========

class PhoneRequest(BaseModel):
    """Схема для запроса отправки SMS кода"""
    phone: str = Field(..., description="Номер телефона в формате +7XXXXXXXXXX")
    
    @validator('phone')
    def validate_phone(cls, v):
        # Убираем все нецифровые символы
        phone_digits = re.sub(r'\D', '', v)
        
        # Проверяем формат российского номера
        if not phone_digits.startswith('7') and not phone_digits.startswith('8'):
            raise ValueError('Номер должен начинаться с +7 или 8')
        
        # Нормализуем к формату 7XXXXXXXXXX
        if phone_digits.startswith('8'):
            phone_digits = '7' + phone_digits[1:]
        
        if len(phone_digits) != 11:
            raise ValueError('Номер телефона должен содержать 11 цифр')
        
        return '+' + phone_digits

class VerifyCodeRequest(BaseModel):
    """Схема для проверки SMS кода"""
    phone: str = Field(..., description="Номер телефона")
    code: str = Field(..., min_length=6, max_length=6, description="6-значный код из SMS")
    
    @validator('phone')
    def validate_phone(cls, v):
        phone_digits = re.sub(r'\D', '', v)
        if phone_digits.startswith('8'):
            phone_digits = '7' + phone_digits[1:]
        if len(phone_digits) != 11:
            raise ValueError('Неверный формат номера телефона')
        return '+' + phone_digits

class AuthResponse(BaseModel):
    """Схема ответа после успешной авторизации"""
    access_token: str = Field(..., description="JWT токен доступа")
    token_type: str = Field(default="bearer", description="Тип токена")
    user_id: int = Field(..., description="ID пользователя")
    phone: str = Field(..., description="Номер телефона")

class UserResponse(BaseModel):
    """Схема для ответа с данными пользователя"""
    id: int
    phone: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True