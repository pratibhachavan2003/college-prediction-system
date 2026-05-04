import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='pratibhachavan@18',
    database='college_prediction_db'
)
cur = conn.cursor()

# list all tables to find the correct one
cur.execute("SHOW TABLES;")
print('tables:', cur.fetchall())

# try to query a likely table name if it exists
cur.execute("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='college_prediction_db' AND TABLE_NAME LIKE '%college%';")
print('matching tables:', cur.fetchall())

# if there is a table called colleges or similar, inspect its data
try:
    cur.execute("SELECT college_type, city, branch, cutoff_score FROM colleges WHERE branch LIKE '%Computer Science%' LIMIT 20;")
    print('sample rows from colleges:')
    for row in cur.fetchall():
        print(row)
except Exception as e:
    print('error querying colleges table', e)

try:
    cur.execute("SELECT DISTINCT college_type FROM colleges;")
    print('distinct types:', cur.fetchall())
except Exception as e:
    print('error fetching distinct types', e)

conn.close()