"""
Скрипт для инициализации базы данных с тестовыми данными
"""
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, Employee, Product, Vacancy, Profile
from utils import list_to_json, hash_password
from datetime import datetime
import json

def init_database():
    """Создает таблицы и заполняет их тестовыми данными"""
    
    # Создаем все таблицы
    Base.metadata.create_all(bind=engine)
    
    # Создаем сессию
    db = SessionLocal()
    
    try:
        # Проверяем, есть ли уже данные
        if db.query(Employee).count() > 0:
            print("База данных уже содержит данные. Пропускаем инициализацию.")
            return
        
        # Создаем тестовых сотрудников
        employees_data = [
            {
                "first_name": "Иван",
                "last_name": "Петров",
                "middle_name": "Сергеевич",
                "phone": "+7 (495) 123-45-67",
                "address": "ул. Московская, д. 5, кв. 10",
                "work_hours": "9:00-18:00",
                "work_days": "Пн-Пт",
                "city": "Москва",
                "region": "Московская область"
            },
            {
                "first_name": "Анна",
                "last_name": "Сидорова",
                "middle_name": "Владимировна",
                "phone": "+7 (812) 987-65-43",
                "address": "пр. Невский, д. 15, кв. 25",
                "work_hours": "10:00-19:00",
                "work_days": "Вт-Сб",
                "city": "Санкт-Петербург",
                "region": "Ленинградская область"
            },
            {
                "first_name": "Михаил",
                "last_name": "Козлов",
                "middle_name": "Александрович",
                "phone": "+7 (343) 555-77-99",
                "address": "ул. Ленина, д. 42, кв. 8",
                "work_hours": "8:00-17:00",
                "work_days": "Пн-Пт",
                "city": "Екатеринбург",
                "region": "Свердловская область"
            }
        ]
        
        # Добавляем сотрудников
        employees = []
        for emp_data in employees_data:
            employee = Employee(**emp_data)
            db.add(employee)
            employees.append(employee)
        
        db.commit()
        
        # Создаем тестовые товары
        products_data = [
            {
                "name": "Свежие яблоки",
                "price": 150.0,
                "short_description": "Сочные красные яблоки из собственного сада",
                "long_description": "Выращенные в экологически чистых условиях яблоки сорта 'Антоновка'. Собираются вручную, хранятся в специальных условиях. Богаты витаминами и минералами.",
                "seller_id": 1
            },
            {
                "name": "Мед натуральный",
                "price": 800.0,
                "short_description": "Натуральный цветочный мед",
                "long_description": "Собранный с цветущих лугов мед обладает неповторимым ароматом и вкусом. Не подвергается термической обработке, сохраняет все полезные свойства.",
                "seller_id": 1
            },
            {
                "name": "Овощной набор",
                "price": 300.0,
                "short_description": "Свежие овощи с грядки",
                "long_description": "Смешанный набор из моркови, свеклы, капусты и картофеля. Все овощи выращены без использования химических удобрений.",
                "seller_id": 2
            },
            {
                "name": "Домашний хлеб",
                "price": 120.0,
                "short_description": "Ржаной хлеб на закваске",
                "long_description": "Выпеченный по старинному рецепту ржаной хлеб на натуральной закваске. Имеет плотную структуру и насыщенный вкус.",
                "seller_id": 2
            },
            {
                "name": "Сыр домашний",
                "price": 600.0,
                "short_description": "Твердый сыр из коровьего молока",
                "long_description": "Выдержанный 3 месяца твердый сыр из цельного коровьего молока. Имеет насыщенный вкус и аромат.",
                "seller_id": 3
            }
        ]
        
        # Добавляем товары
        for prod_data in products_data:
            product = Product(**prod_data)
            db.add(product)
        
        db.commit()
        
        print("База данных успешно инициализирована!")
        print(f"Создано сотрудников: {len(employees)}")
        print(f"Создано товаров: {len(products_data)}")
        
    except Exception as e:
        print(f"Ошибка при инициализации базы данных: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_database()