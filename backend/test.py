import requests
import json

def test_api():
    print("=" * 60)
    print("ТЕСТИРОВАНИЕ API")
    print("=" * 60)
    
    try:
        # Тест главной страницы
        print("\n1. Тест главной страницы...")
        response = requests.get("http://localhost:8001/")
        print(f"   Статус: {response.status_code}")
        print(f"   Ответ: {response.json()}")
        
        # Тест получения сотрудников
        print("\n2. Тест получения сотрудников...")
        response = requests.get("http://localhost:8001/employees")
        print(f"   Статус: {response.status_code}")
        
        if response.status_code == 200:
            employees = response.json()
            print(f"   ✓ Найдено сотрудников: {len(employees)}")
            if employees:
                emp = employees[0]
                print(f"   ✓ Первый: {emp['first_name']} {emp['last_name']} - {emp['city']}")
        elif response.status_code == 500:
            print(f"   ✗ ОШИБКА СЕРВЕРА!")
            try:
                error_detail = response.json()
                print(f"   ✗ Детали: {error_detail}")
            except:
                print(f"   ✗ Текст ошибки: {response.text}")
        else:
            print(f"   ✗ Неожиданный статус: {response.status_code}")
            print(f"   ✗ Ответ: {response.text}")
        
        # Тест получения товаров
        print("\n3. Тест получения товаров...")
        response = requests.get("http://localhost:8001/products")
        print(f"   Статус: {response.status_code}")
        
        if response.status_code == 200:
            products = response.json()
            print(f"   ✓ Найдено товаров: {len(products)}")
            if products:
                prod = products[0]
                print(f"   ✓ Первый: {prod['name']} - {prod['price']} руб.")
        elif response.status_code == 500:
            print(f"   ✗ ОШИБКА СЕРВЕРА!")
            try:
                error_detail = response.json()
                print(f"   ✗ Детали: {error_detail}")
            except:
                print(f"   ✗ Текст ошибки: {response.text}")
        else:
            print(f"   ✗ Неожиданный статус: {response.status_code}")
            print(f"   ✗ Ответ: {response.text}")
        
        print("\n" + "=" * 60)
        print("РЕЗУЛЬТАТ: Тесты завершены")
        print("Документация API: http://localhost:8001/docs")
        print("=" * 60)
        
    except requests.exceptions.ConnectionError:
        print("\n✗ ОШИБКА: Не удается подключиться к серверу!")
        print("  Убедитесь, что сервер запущен: uvicorn main:app --reload --port 8001")
    except Exception as e:
        print(f"\n✗ НЕПРЕДВИДЕННАЯ ОШИБКА: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_api()
