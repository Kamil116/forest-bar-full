from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    """Модель пользователя для авторизации"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(20), unique=True, nullable=False, index=True, comment="Номер телефона")
    is_active = Column(Boolean, default=True, comment="Активен ли пользователь")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Связь с SMS кодами
    sms_codes = relationship("SMSCode", back_populates="user", cascade="all, delete-orphan")

class SMSCode(Base):
    """Модель для хранения SMS кодов"""
    __tablename__ = "sms_codes"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    code = Column(String(6), nullable=False, comment="6-значный код")
    is_used = Column(Boolean, default=False, comment="Использован ли код")
    expires_at = Column(DateTime, nullable=False, comment="Время истечения кода")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Связь с пользователем
    user = relationship("User", back_populates="sms_codes")

class Employee(Base):
    """Модель сотрудника"""
    __tablename__ = "employees"
    
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False, comment="Имя")
    last_name = Column(String(100), nullable=False, comment="Фамилия")
    middle_name = Column(String(100), nullable=True, comment="Отчество")
    city = Column(String(100), nullable=False, comment="Город")
    region = Column(String(100), nullable=False, comment="Область")
    email = Column(String(255), nullable=True, comment="Электронная почта")
    phone = Column(String(20), nullable=False, comment="Номер телефона")
    referral_link = Column(String(500), nullable=True, comment="Реферальная ссылка")
    address = Column(String(255), nullable=False, comment="Адрес")
    work_hours = Column(String(100), nullable=False, comment="Часы работы")
    photo_url = Column(String(500), nullable=True, comment="URL фотографии")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Связь с товарами
    products = relationship("Product", back_populates="seller")

class Vacancy(Base):
    """Модель вакансии"""
    __tablename__ = "vacancies"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, comment="Название вакансии")
    city = Column(String(100), nullable=False, comment="Город")
    schedule = Column(String(100), nullable=False, comment="График работы")
    salary = Column(String(100), nullable=False, comment="Зарплата")
    additional_conditions = Column(Text, nullable=True, comment="Дополнительные условия (JSON список)")
    long_description = Column(Text, nullable=False, comment="Длинное описание")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Product(Base):
    """Модель товара"""
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, comment="Название товара")
    images = Column(Text, nullable=True, comment="Список изображений (JSON)")
    price = Column(Float, nullable=False, comment="Цена")
    product_type = Column(String(100), nullable=False, comment="Тип (мёд, чай, ягода, ягодный сбор и тд)")
    long_description = Column(Text, nullable=False, comment="Длинное описание")
    seller_id = Column(Integer, ForeignKey("employees.id"), nullable=False, comment="ID продавца")
    
    # Пищевая ценность
    vitamins = Column(Text, nullable=True, comment="Витамины (JSON)")
    minerals = Column(Text, nullable=True, comment="Минералы (JSON)")
    antioxidants = Column(Text, nullable=True, comment="Антиоксиданты (JSON)")
    energy_value = Column(String(100), nullable=True, comment="Энергетическая ценность")
    shelf_life = Column(String(100), nullable=True, comment="Срок годности")
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Связь с сотрудником
    seller = relationship("Employee", back_populates="products")


class Profile(Base):
    """Модель профиля покупателя"""
    __tablename__ = "profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(20), unique=True, nullable=False, index=True, comment="Номер телефона")
    password_hash = Column(String(255), nullable=False, comment="Зашифрованный пароль")
    city = Column(String(100), nullable=True, comment="Город")
    purchase_count = Column(Integer, default=0, comment="Количество покупок")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)