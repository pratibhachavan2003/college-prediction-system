import requests
import json

print('Testing test user credentials...\n')

# Test admin credentials
print('=== ADMIN LOGIN TEST ===')
admin_response = requests.post(
    'http://localhost:8085/api/login',
    json={'email': 'admin@college.com', 'password': 'admin123'},
    timeout=5
)
print('Status:', admin_response.status_code)
if admin_response.status_code == 200:
    admin_data = admin_response.json()
    print('✓ Admin login successful!')
    print('  Role:', admin_data.get('role'))
    print('  ID:', admin_data.get('id'))
    print('  Name:', admin_data.get('name'))
else:
    print('✗ Response:', admin_response.text)

print()

# Test student credentials
print('=== STUDENT LOGIN TEST ===')
student_response = requests.post(
    'http://localhost:8085/api/login',
    json={'email': 'student@example.com', 'password': 'password123'},
    timeout=5
)
print('Status:', student_response.status_code)
if student_response.status_code == 200:
    student_data = student_response.json()
    print('✓ Student login successful!')
    print('  Role:', student_data.get('role'))
    print('  ID:', student_data.get('id'))
    print('  Name:', student_data.get('name'))
else:
    print('✗ Response:', student_response.text)

print()
print('=== INVALID CREDENTIALS TEST ===')
invalid_response = requests.post(
    'http://localhost:8085/api/login',
    json={'email': 'wrong@email.com', 'password': 'wrongpass'},
    timeout=5
)
print('Status:', invalid_response.status_code)
print('Response:', invalid_response.text)
