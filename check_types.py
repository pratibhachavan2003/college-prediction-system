import requests

resp = requests.get('http://localhost:8085/api/cutoff/college-types')
print(resp.status_code)
print(resp.text)