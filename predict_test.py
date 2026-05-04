import requests

payload = {
    "name":"Test",
    "email":"test@example.com",
    "phoneNumber":"",
    "examType":"",
    "category":"GENERAL",
    "state":"Maharashtra",
    "preferredBranch":"Computer Science and Engineering",
    "preferredCollegeType":"All",
    "gender":"Female",
    "location":"All",
    "yearSession":"2024",
    "domicile":"Yes",
    "cetRank":1000,
    "attempt":"1st Attempt",
    "capRound":"Round 1",
    "physicsMarks":None,
    "chemistryMarks":None,
    "mathematicsMarks":None,
    "jeeScore":None,
    "mhtCetPercentile":90.0,
    "neetScore":None
}

r = requests.post('http://localhost:8085/api/predict', json=payload)
print(r.status_code)
print(r.text)
