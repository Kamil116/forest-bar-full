"""
Сервис для отправки SMS через SMS.RU API
Документация: https://sms.ru/api
"""
import requests
import random
import os
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

class SMSService:
    """Сервис для отправки SMS кодов через SMS.RU"""
    
    def __init__(self):
        self.api_id = os.getenv("SMSRU_API_ID", "")
        self.api_url = "https://sms.ru/sms/send"
        self.test_mode = os.getenv("SMS_TEST_MODE", "true").lower() == "true"
    
    def generate_code(self) -> str:
        """Генерирует 6-значный код"""
        return str(random.randint(100000, 999999))
    
    def send_sms(self, phone: str, code: str) -> bool:
        """
        Отправляет SMS с кодом на указанный номер
        
        Args:
            phone: Номер телефона в формате +7XXXXXXXXXX
            code: 6-значный код
            
        Returns:
            True если SMS отправлена успешно, False в противном случае
        """
        # В тестовом режиме просто выводим код в консоль
        if self.test_mode:
            print(f"📱 [TEST MODE] SMS код для {phone}: {code}")
            return True
        
        # Проверяем наличие API ключа
        if not self.api_id:
            print("⚠️ SMSRU_API_ID не настроен! Используйте тестовый режим или добавьте API ключ в .env")
            print(f"📱 SMS код для {phone}: {code}")
            return True
        
        # Убираем + из номера для SMS.RU API
        phone_clean = phone.replace('+', '')
        
        # Формируем текст сообщения
        message = f"Ваш код подтверждения: {code}"
        
        # Параметры запроса к SMS.RU
        params = {
            'api_id': self.api_id,
            'to': phone_clean,
            'msg': message,
            'json': 1  # Получаем ответ в JSON формате
        }
        
        try:
            response = requests.get(self.api_url, params=params, timeout=10)
            response.raise_for_status()
            
            result = response.json()
            
            # Проверяем статус отправки
            if result.get('status') == 'OK':
                print(f"✅ SMS успешно отправлена на {phone}")
                return True
            else:
                error_code = result.get('status_code')
                error_text = result.get('status_text', 'Неизвестная ошибка')
                print(f"❌ Ошибка отправки SMS: {error_code} - {error_text}")
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Ошибка при отправке SMS: {str(e)}")
            return False
    
    def send_code(self, phone: str) -> Optional[str]:
        """
        Генерирует и отправляет SMS код
        
        Args:
            phone: Номер телефона
            
        Returns:
            Код если отправка успешна, None в противном случае
        """
        code = self.generate_code()
        
        if self.send_sms(phone, code):
            return code
        
        return None


# Альтернативный сервис для SMSC.RU (если нужен)
class SMSCService:
    """Сервис для отправки SMS через SMSC.RU"""
    
    def __init__(self):
        self.login = os.getenv("SMSC_LOGIN", "")
        self.password = os.getenv("SMSC_PASSWORD", "")
        self.api_url = "https://smsc.ru/sys/send.php"
        self.test_mode = os.getenv("SMS_TEST_MODE", "true").lower() == "true"
    
    def generate_code(self) -> str:
        """Генерирует 6-значный код"""
        return str(random.randint(100000, 999999))
    
    def send_sms(self, phone: str, code: str) -> bool:
        """Отправляет SMS через SMSC.RU"""
        if self.test_mode:
            print(f"📱 [TEST MODE] SMS код для {phone}: {code}")
            return True
        
        if not self.login or not self.password:
            print("⚠️ SMSC_LOGIN или SMSC_PASSWORD не настроены!")
            print(f"📱 SMS код для {phone}: {code}")
            return True
        
        phone_clean = phone.replace('+', '')
        message = f"Ваш код подтверждения: {code}"
        
        params = {
            'login': self.login,
            'psw': self.password,
            'phones': phone_clean,
            'mes': message,
            'fmt': 3  # JSON формат ответа
        }
        
        try:
            response = requests.get(self.api_url, params=params, timeout=10)
            response.raise_for_status()
            
            result = response.json()
            
            if 'id' in result:
                print(f"✅ SMS успешно отправлена на {phone}")
                return True
            else:
                error = result.get('error', 'Неизвестная ошибка')
                print(f"❌ Ошибка отправки SMS: {error}")
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Ошибка при отправке SMS: {str(e)}")
            return False
    
    def send_code(self, phone: str) -> Optional[str]:
        """Генерирует и отправляет SMS код"""
        code = self.generate_code()
        
        if self.send_sms(phone, code):
            return code
        
        return None


# Создаем глобальный экземпляр сервиса
sms_service = SMSService()
# Или используйте SMSC: sms_service = SMSCService()
