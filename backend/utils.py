"""
Вспомогательные функции для работы с данными
"""
import json
from typing import Optional, List
from passlib.context import CryptContext

# Контекст для хеширования паролей
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def list_to_json(data: Optional[List]) -> Optional[str]:
    """Преобразует список в JSON строку"""
    if data is None:
        return None
    return json.dumps(data, ensure_ascii=False)


def json_to_list(data: Optional[str]) -> Optional[List]:
    """Преобразует JSON строку в список"""
    if data is None or data == "":
        return None
    try:
        return json.loads(data)
    except (json.JSONDecodeError, TypeError):
        return None


def hash_password(password: str) -> str:
    """Хеширует пароль"""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Проверяет пароль"""
    return pwd_context.verify(plain_password, hashed_password)
