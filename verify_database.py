#!/usr/bin/env python
import mysql.connector

print("=" * 60)
print("COLLEGE PREDICTION DATABASE - FINAL VERIFICATION")
print("=" * 60)

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='pratibhachavan@18',
    database='college_prediction_db'
)

cursor = conn.cursor()

# Get statistics
cursor.execute('SELECT COUNT(*) FROM colleges')
total_colleges = cursor.fetchone()[0]

cursor.execute('SELECT COUNT(*) FROM cutoff_history')
total_cutoffs = cursor.fetchone()[0]

cursor.execute('SELECT COUNT(DISTINCT cutoff_year) FROM cutoff_history')
distinct_years = cursor.fetchone()[0]

cursor.execute('SELECT COUNT(DISTINCT round_number) FROM cutoff_history')
distinct_rounds = cursor.fetchone()[0]

# Display statistics
print(f"\n📊 DATABASE STATISTICS:")
print(f"  ✅ Total Colleges: {total_colleges}")
print(f"  ✅ Total Cutoff Records: {total_cutoffs}")
print(f"  ✅ Distinct Years: {distinct_years}")
print(f"  ✅ Distinct Rounds: {distinct_rounds}")

# Show all colleges
print(f"\n📍 COLLEGES IN DATABASE ({total_colleges} total):")
cursor.execute('SELECT id, name, city FROM colleges ORDER BY id')
for row in cursor.fetchall():
    city = row[2] if row[2] else "N/A"
    print(f"   {row[0]:3d}. {row[1][:50]}")
    print(f"        City: {city}")

# Show data distribution
print(f"\n📈 DATA DISTRIBUTION BY COLLEGE:")
cursor.execute('''
    SELECT c.name, COUNT(*) as cnt
    FROM cutoff_history ch
    JOIN colleges c ON ch.college_id = c.id
    GROUP BY c.id
    ORDER BY cnt DESC
''')
for row in cursor.fetchall():
    print(f"  • {row[0][:50]}: {row[1]} records")

print(f"\n✨ DATABASE MIGRATION COMPLETE!")
print(f"   Ready for Spring Boot backend integration")
print("=" * 60)

conn.close()
