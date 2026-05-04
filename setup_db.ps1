# MySQL Database Setup Script
# This script drops and recreates the college_prediction_db database with the fixed schema

$sqlFile = "C:\Users\pratibha chavan\OneDrive\Desktop\college_prediction_system\COMPLETE_DATABASE_SETUP.sql"
$mysqlPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

# Check if MySQL exists
if (-not (Test-Path $mysqlPath)) {
    Write-Host "MySQL not found at $mysqlPath"
    Write-Host "Try using MySQL Workbench instead:"
    Write-Host "1. Open MySQL Workbench"
    Write-Host "2. Open File > Run SQL Script"
    Write-Host "3. Select: $sqlFile"
    Write-Host "4. Execute"
    exit 1
}

# Read the SQL file
$sqlContent = Get-Content $sqlFile -Raw

# Execute the SQL file
& $mysqlPath -u root -p "pratibhachavan@18" -e "DROP DATABASE IF EXISTS college_prediction_db; CREATE DATABASE college_prediction_db; USE college_prediction_db;" 

# Then execute the setup SQL
$sqlContent | & $mysqlPath -u root -p "pratibhachavan@18" college_prediction_db

Write-Host "Database setup completed!"
