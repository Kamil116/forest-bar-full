"""
Скрипт для инициализации базы данных с тестовыми данными (обновленная версия)
"""
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, Employee, Product, Vacancy, Profile
from utils import list_to_json, hash_password
from datetime import datetime

def init_database():
    """Создает таблицы и заполняет их тестовыми данными"""
    
    # Создаем все таблицы
    Base.metadata.create_all(bind=engine)
    
    # Создаем сессию
    db = SessionLocal()
    
    try:
        # Очищаем старые данные (опционально)
        print("Очистка старых данных...")
        db.query(Product).delete()
        db.query(Employee).delete()
        db.query(Vacancy).delete()
        db.query(Profile).delete()
        db.commit()
        
        # ========== СОТРУДНИКИ ==========
        print("\nСоздание сотрудников...")
        employees_data = [
            {
                "first_name": "Иван",
                "last_name": "Петров",
                "middle_name": "Сергеевич",
                "city": "Москва",
                "region": "Московская область",
                "email": "ivan.petrov@example.com",
                "phone": "+79991234567",
                "referral_link": "https://forest-bar.ru/ref/ivan_petrov",
                "address": "ул. Московская, д. 5, кв. 10",
                "work_hours": "9:00-18:00"
            },
            {
                "first_name": "Анна",
                "last_name": "Сидорова",
                "middle_name": "Владимировна",
                "city": "Санкт-Петербург",
                "region": "Ленинградская область",
                "email": "anna.sidorova@example.com",
                "phone": "+79219876543",
                "referral_link": "https://forest-bar.ru/ref/anna_sidorova",
                "address": "пр. Невский, д. 15, кв. 25",
                "work_hours": "10:00-19:00"
            },
            {
                "first_name": "Михаил",
                "last_name": "Козлов",
                "middle_name": "Александрович",
                "city": "Екатеринбург",
                "region": "Свердловская область",
                "email": "mikhail.kozlov@example.com",
                "phone": "+79123456789",
                "referral_link": "https://forest-bar.ru/ref/mikhail_kozlov",
                "address": "ул. Ленина, д. 42, кв. 8",
                "work_hours": "8:00-17:00"
            }
        ]
        
        employees = []
        for emp_data in employees_data:
            employee = Employee(**emp_data)
            db.add(employee)
            employees.append(employee)
        
        db.commit()
        print(f"✓ Создано сотрудников: {len(employees)}")
        
        # ========== ВАКАНСИИ ==========
        print("\nСоздание вакансий...")
        vacancies_data = [
            {
                "title": "Продавец мёда",
                "city": "Москва",
                "schedule": "5/2, с 10:00 до 19:00",
                "salary": "от 50 000 руб",
                "additional_conditions": list_to_json([
                    "Бесплатное обучение",
                    "Официальное трудоустройство",
                    "Скидки на продукцию",
                    "Дружный коллектив"
                ]),
                "long_description": "Требуется продавец в магазин натуральных продуктов. Опыт работы приветствуется, но не обязателен. Мы обучим всему необходимому. Работа с натуральными продуктами: мёд, чай, ягоды."
            },
            {
                "title": "Менеджер по продажам",
                "city": "Санкт-Петербург",
                "schedule": "Полный день",
                "salary": "от 70 000 руб + бонусы",
                "additional_conditions": list_to_json([
                    "Высокий процент от продаж",
                    "Карьерный рост",
                    "Корпоративное обучение",
                    "ДМС после испытательного срока"
                ]),
                "long_description": "Ищем активного менеджера по продажам для работы с оптовыми клиентами. Требуется опыт работы от 1 года, знание техник продаж, коммуникабельность."
            },
            {
                "title": "Сборщик заказов",
                "city": "Екатеринбург",
                "schedule": "Сменный график",
                "salary": "от 45 000 руб",
                "additional_conditions": list_to_json([
                    "Своевременная оплата",
                    "Спецодежда",
                    "Питание",
                    "Развозка"
                ]),
                "long_description": "Требуется сборщик заказов на склад. Обязанности: комплектация заказов, упаковка продукции, поддержание порядка на складе. График работы обсуждается индивидуально."
            }
        ]
        
        for vac_data in vacancies_data:
            vacancy = Vacancy(**vac_data)
            db.add(vacancy)
        
        db.commit()
        print(f"✓ Создано вакансий: {len(vacancies_data)}")
        
        # ========== ТОВАРЫ ==========
        print("\nСоздание товаров...")
        products_data = [
            {
                "name": "Мёд липовый",
                "images": list_to_json(["/uploads/honey1.jpg", "/uploads/honey1_2.jpg"]),
                "price": 850.0,
                "product_type": "мёд",
                "long_description": "Натуральный липовый мёд собран в экологически чистых районах. Обладает нежным ароматом липы и приятным вкусом. Идеален для чаепития и укрепления иммунитета.",
                "seller_id": 1,
                "vitamins": list_to_json(["B1", "B2", "B6", "C", "E"]),
                "minerals": list_to_json(["Калий", "Кальций", "Магний", "Железо"]),
                "antioxidants": list_to_json(["Флавоноиды", "Фенольные кислоты"]),
                "energy_value": "328 ккал на 100г",
                "shelf_life": "24 месяца"
            },
            {
                "name": "Чай Иван-чай ферментированный",
                "images": list_to_json(["/uploads/tea1.jpg"]),
                "price": 450.0,
                "product_type": "чай",
                "long_description": "Традиционный русский чай из кипрея узколистного. Собран вручную, ферментирован по классической технологии. Не содержит кофеина, обладает успокаивающим действием.",
                "seller_id": 1,
                "vitamins": list_to_json(["C", "A", "B"]),
                "minerals": list_to_json(["Железо", "Медь", "Марганец"]),
                "antioxidants": list_to_json(["Танины", "Флавоноиды"]),
                "energy_value": "15 ккал на 100г",
                "shelf_life": "12 месяцев"
            },
            {
                "name": "Клюква сушеная",
                "images": list_to_json(["/uploads/berry1.jpg", "/uploads/berry1_2.jpg", "/uploads/berry1_3.jpg"]),
                "price": 650.0,
                "product_type": "ягода",
                "long_description": "Сушеная клюква без добавления сахара. Сохраняет все полезные свойства свежей ягоды. Отличный источник витамина C и антиоксидантов. Можно добавлять в чай, выпечку или есть как перекус.",
                "seller_id": 2,
                "vitamins": list_to_json(["C", "K", "E"]),
                "minerals": list_to_json(["Марганец", "Медь"]),
                "antioxidants": list_to_json(["Проантоцианидины", "Кверцетин"]),
                "energy_value": "308 ккал на 100г",
                "shelf_life": "18 месяцев"
            },
            {
                "name": "Ягодный сбор 'Лесная поляна'",
                "images": list_to_json(["/uploads/mix1.jpg"]),
                "price": 720.0,
                "product_type": "ягодный сбор",
                "long_description": "Смесь сушеных лесных ягод: черника, брусника, малина, земляника. Идеален для приготовления компотов, морсов и чая. Богат витаминами и природными антиоксидантами.",
                "seller_id": 2,
                "vitamins": list_to_json(["C", "A", "E", "K"]),
                "minerals": list_to_json(["Калий", "Магний", "Железо"]),
                "antioxidants": list_to_json(["Антоцианы", "Флавоноиды", "Танины"]),
                "energy_value": "280 ккал на 100г",
                "shelf_life": "12 месяцев"
            },
            {
                "name": "Мёд гречишный",
                "images": list_to_json(["/uploads/honey2.jpg"]),
                "price": 900.0,
                "product_type": "мёд",
                "long_description": "Тёмный гречишный мёд с насыщенным вкусом и ароматом. Содержит больше железа и белка, чем светлые сорта мёда. Рекомендуется при анемии и для укрепления сосудов.",
                "seller_id": 3,
                "vitamins": list_to_json(["B1", "B2", "B6", "C", "PP"]),
                "minerals": list_to_json(["Железо", "Медь", "Цинк", "Магний"]),
                "antioxidants": list_to_json(["Полифенолы", "Флавоноиды"]),
                "energy_value": "309 ккал на 100г",
                "shelf_life": "24 месяца"
            },
            {
                "name": "Облепиха сушеная",
                "images": list_to_json(["/uploads/berry2.jpg"]),
                "price": 580.0,
                "product_type": "ягода",
                "long_description": "Сушеная облепиха - настоящий кладезь витаминов. Особенно богата витамином C и каротиноидами. Укрепляет иммунитет, улучшает состояние кожи и зрения.",
                "seller_id": 3,
                "vitamins": list_to_json(["C", "A", "E", "K", "B"]),
                "minerals": list_to_json(["Калий", "Кальций", "Магний", "Железо"]),
                "antioxidants": list_to_json(["Каротиноиды", "Флавоноиды", "Токоферолы"]),
                "energy_value": "295 ккал на 100г",
                "shelf_life": "18 месяцев"
            }
        ]
        
        for prod_data in products_data:
            product = Product(**prod_data)
            db.add(product)
        
        db.commit()
        print(f"✓ Создано товаров: {len(products_data)}")
        
        # ========== ПРОФИЛИ ==========
        print("\nСоздание тестовых профилей...")
        profiles_data = [
            {
                "phone": "+79001112233",
                "password_hash": hash_password("password123"),
                "city": "Москва",
                "purchase_count": 5
            },
            {
                "phone": "+79002223344",
                "password_hash": hash_password("password456"),
                "city": "Санкт-Петербург",
                "purchase_count": 12
            },
            {
                "phone": "+79003334455",
                "password_hash": hash_password("password789"),
                "city": "Екатеринбург",
                "purchase_count": 3
            }
        ]
        
        for prof_data in profiles_data:
            profile = Profile(**prof_data)
            db.add(profile)
        
        db.commit()
        print(f"✓ Создано профилей: {len(profiles_data)}")
        
        print("\n" + "="*50)
        print("✅ База данных успешно инициализирована!")
        print("="*50)
        print(f"Сотрудников: {len(employees)}")
        print(f"Вакансий: {len(vacancies_data)}")
        print(f"Товаров: {len(products_data)}")
        print(f"Профилей: {len(profiles_data)}")
        print("\nТестовые профили (телефон / пароль):")
        print("  +79001112233 / password123")
        print("  +79002223344 / password456")
        print("  +79003334455 / password789")
        
    except Exception as e:
        print(f"\n❌ Ошибка при инициализации базы данных: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_database()
