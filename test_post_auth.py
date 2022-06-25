import requests

response = requests.post('http://localhost:8000/api/to_do/', data={'username': 'dm', 'password': '123'})
print(response.status_code)
