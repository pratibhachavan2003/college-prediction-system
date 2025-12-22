# College Prediction System (backend)

This is a minimal Spring Boot backend for the college prediction demo. It contains an endpoint to predict colleges for a student based on a simple cutoff-score algorithm.

How to run locally (Windows PowerShell):

1. Build the project (uses your installed Maven or the wrapper):

```powershell
cd "c:\Users\pratibha chavan\OneDrive\Desktop\college_prediction_system\collegebackend\collegebackend"
./mvnw clean package ; mvn clean package
```

2. Run the application:

```powershell
./mvnw spring-boot:run
# or
mvn spring-boot:run
```

3. Test the prediction endpoint (example):

```powershell
curl -X POST http://localhost:8083/api/predict -H "Content-Type: application/json" -d '{"name":"Alice","score":85,"preferredCity":"Mumbai"}'
```

Notes:

- The project currently permits all requests (no JWT enforced) so it's easy to run and test locally. If you want JWT-based auth I can add it next.
- Seed some college rows into the database (MySQL) using SQL or a small data initializer - I can add a data loader if you'd like.
