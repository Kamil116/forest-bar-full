# Forest Bar Backend - Документация

## Обзор проекта

FastAPI backend для управления сотрудниками и каталогом товаров. Включает полный CRUD API с базой данных SQLite.

## Структура файлов

```
backend/
├── main.py          # Основной FastAPI сервер
├── models.py        # SQLAlchemy модели базы данных
├── schemas.py       # Pydantic схемы для валидации
├── database.py      # Настройки подключения к БД
├── init_db.py       # Скрипт инициализации с тестовыми данными
├── test.py          # Простой тест API
├── requirements.txt # Зависимости Python
└── forest_bar.db    # SQLite база данных (создается автоматически)
```

## database.py

**Назначение:** Настройки подключения к базе данных

**Основные компоненты:**
- `DATABASE_URL` - URL подключения к БД (по умолчанию SQLite)
- `engine` - SQLAlchemy движок
- `SessionLocal` - Фабрика сессий
- `get_db()` - Dependency для получения сессии БД

**Использование:**
```python
from database import get_db, engine
from sqlalchemy.orm import Session

# В FastAPI endpoint
def some_endpoint(db: Session = Depends(get_db)):
    # Работа с БД через db
    pass
```

## models.py

**Назначение:** SQLAlchemy модели для базы данных

### Employee (Сотрудники)
```python
class Employee(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)      # Имя
    last_name = Column(String(100), nullable=False)       # Фамилия
    middle_name = Column(String(100), nullable=True)       # Отчество
    phone = Column(String(20), nullable=False)            # Телефон
    address = Column(String(255), nullable=False)         # Адрес
    work_hours = Column(String(50), nullable=False)       # Часы работы
    work_days = Column(String(100), nullable=False)        # Дни работы
    city = Column(String(100), nullable=False)             # Город
    region = Column(String(100), nullable=False)          # Область
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Связь с товарами
    products = relationship("Product", back_populates="seller")
```

### Product (Товары)
```python
class Product(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)            # Название
    price = Column(Float, nullable=False)                  # Цена
    short_description = Column(Text, nullable=True)       # Краткое описание
    long_description = Column(Text, nullable=True)         # Длинное описание
    image_url = Column(String(500), nullable=True)         # URL изображения
    seller_id = Column(Integer, ForeignKey("employees.id")) # ID продавца
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Связь с сотрудником
    seller = relationship("Employee", back_populates="products")
```

## schemas.py

**Назначение:** Pydantic схемы для валидации данных API

### Employee схемы:
- `EmployeeBase` - базовая схема с обязательными полями
- `EmployeeCreate` - для создания сотрудника
- `EmployeeUpdate` - для обновления (все поля опциональные)
- `EmployeeResponse` - для ответа API

### Product схемы:
- `ProductBase` - базовая схема с обязательными полями
- `ProductCreate` - для создания товара
- `ProductUpdate` - для обновления (все поля опциональные)
- `ProductResponse` - для ответа API

**Пример использования:**
```python
# Создание сотрудника
employee_data = {
    "first_name": "Иван",
    "last_name": "Петров",
    "phone": "+7 (495) 123-45-67",
    "address": "ул. Московская, д. 5",
    "work_hours": "9:00-18:00",
    "work_days": "Пн-Пт",
    "city": "Москва",
    "region": "Московская область"
}
```

## main.py

**Назначение:** Основной FastAPI сервер с API endpoints

### API Endpoints:

#### Сотрудники:
- `GET /employees` - получить всех сотрудников
- `GET /employees/{id}` - получить сотрудника по ID
- `POST /employees` - создать сотрудника
- `PUT /employees/{id}` - обновить сотрудника
- `DELETE /employees/{id}` - удалить сотрудника

#### Товары:
- `GET /products` - получить все товары
- `GET /products/{id}` - получить товар по ID
- `POST /products` - создать товар
- `PUT /products/{id}` - обновить товар
- `DELETE /products/{id}` - удалить товар
- `POST /products/{id}/upload-image` - загрузить изображение

#### Служебные:
- `GET /` - главная страница
- `GET /health` - проверка здоровья API

### Особенности:
- CORS настроен для фронтенда (localhost:3000, localhost:5173)
- Статические файлы доступны по `/uploads`
- Автоматическая документация Swagger UI
- Валидация данных через Pydantic

## init_db.py

**Назначение:** Инициализация базы данных с тестовыми данными

**Что делает:**
1. Создает таблицы в БД
2. Проверяет, есть ли уже данные
3. Если данных нет - заполняет тестовыми:
   - 3 сотрудника (Москва, СПб, Екатеринбург)
   - 5 товаров (яблоки, мед, овощи, хлеб, сыр)

**Запуск:**
```bash
python init_db.py
```

## test.py

**Назначение:** Простой тест API endpoints

**Что тестирует:**
- Главную страницу API
- Получение списка сотрудников
- Получение списка товаров
- Выводит результаты в консоль

**Запуск:**
```bash
python test.py
```

## Установка и запуск

### 1. Установка зависимостей:
```bash
pip install -r requirements.txt
```

### 2. Инициализация БД:
```bash
python init_db.py
```

### 3. Запуск сервера:
```bash
uvicorn main:app --host 127.0.0.1 --port 8001
```

### 4. Тестирование:
```bash
python test.py
```

### 5. Документация API:
```
http://localhost:8001/docs
```

## Технологии

- **FastAPI** - веб-фреймворк
- **SQLAlchemy** - ORM для работы с БД
- **Pydantic** - валидация данных
- **SQLite** - база данных
- **Uvicorn** - ASGI сервер

## Структура данных

### Сотрудник содержит:
- Личные данные (имя, фамилия, отчество, телефон)
- Адрес (полный адрес, город, область)
- Рабочее время (часы и дни работы)

### Товар содержит:
- Основную информацию (название, цена)
- Описания (краткое и длинное)
- Изображение (URL)
- Связь с продавцом (ID сотрудника)

## Примеры запросов

### Получить всех сотрудников:
```bash
curl http://localhost:8001/employees
```

### Создать нового сотрудника:
```bash
curl -X POST http://localhost:8001/employees \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Анна",
    "last_name": "Иванова",
    "phone": "+7 (495) 999-99-99",
    "address": "ул. Тестовая, д. 1",
    "work_hours": "9:00-18:00",
    "work_days": "Пн-Пт",
    "city": "Москва",
    "region": "Московская область"
  }'
```

### Получить все товары:
```bash
curl http://localhost:8001/products
```

## Структура проекта

```
Co/
├── forest-bar/           # React frontend
│   ├── src/
│   │   ├── components/  # React компоненты
│   │   ├── pages/       # Страницы приложения
│   │   └── ...
│   └── package.json
├── backend/              # FastAPI backend
│   ├── main.py          # Основной файл API
│   ├── models.py        # Модели базы данных
│   ├── schemas.py       # Pydantic схемы
│   ├── database.py      # Настройки БД
│   ├── init_db.py       # Инициализация БД
│   ├── test.py          # Тест API
│   ├── requirements.txt # Зависимости
│   └── forest_bar.db    # SQLite база данных
└── README.md
```

## Быстрый старт

### Frontend (React + Mantine)
```bash
cd forest-bar
npm install
npm run dev
```
Frontend: http://localhost:5173

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python init_db.py
uvicorn main:app --host 127.0.0.1 --port 8001
```
Backend: http://localhost:8001
Документация: http://localhost:8001/docs

## API Endpoints

### Сотрудники
- `GET /employees` - получить список сотрудников
- `GET /employees/{id}` - получить сотрудника по ID
- `POST /employees` - создать нового сотрудника
- `PUT /employees/{id}` - обновить данные сотрудника
- `DELETE /employees/{id}` - удалить сотрудника

### Товары
- `GET /products` - получить список товаров
- `GET /products/{id}` - получить товар по ID
- `POST /products` - создать новый товар
- `PUT /products/{id}` - обновить данные товара
- `DELETE /products/{id}` - удалить товар
- `POST /products/{id}/upload-image` - загрузить изображение для товара

### Служебные
- `GET /` - главная страница
- `GET /health` - проверка здоровья API

## Модели данных

### Employee (Сотрудник)
- **id** - уникальный идентификатор
- **first_name** - имя
- **last_name** - фамилия  
- **middle_name** - отчество (опционально)
- **phone** - телефон
- **address** - адрес (ул Московская, д. 5)
- **work_hours** - часы работы (9:00-18:00)
- **work_days** - дни работы (Пн-Пт)
- **city** - город
- **region** - область
- **created_at** - дата создания
- **updated_at** - дата обновления

### Product (Товар)
- **id** - уникальный идентификатор
- **name** - название товара
- **price** - цена
- **short_description** - краткое описание
- **long_description** - длинное описание
- **image_url** - URL изображения
- **seller_id** - ID продавца (связь с Employee)
- **created_at** - дата создания
- **updated_at** - дата обновления

## Тестирование

### Тест API
```bash
cd backend
python test.py
```

### Ручное тестирование
1. Откройте http://localhost:8001/docs
2. Используйте Swagger UI для тестирования endpoints
3. Проверьте создание, чтение, обновление и удаление данных

## Развертывание

### Локальная разработка
1. Запустите backend: `uvicorn main:app --host 127.0.0.1 --port 8001`
2. Запустите frontend: `cd forest-bar && npm run dev`
3. Откройте http://localhost:5173

### Продакшен
1. Соберите frontend: `cd forest-bar && npm run build`
2. Настройте веб-сервер для статических файлов
3. Запустите backend с production настройками

## Поддержка

При возникновении проблем:
1. Проверьте, что все зависимости установлены
2. Убедитесь, что порт 8001 свободен
3. Проверьте логи сервера в консоли
4. Убедитесь, что база данных инициализирована
