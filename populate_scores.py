import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='pratibhachavan@18',
    database='college_prediction_db'
)

cursor = conn.cursor()

# Get average cutoff score for each college from cutoff_history (2019 data)
cursor.execute('''
    SELECT college_id, AVG(closing_rank) as avg_rank
    FROM cutoff_history
    WHERE cutoff_year = 2019
    GROUP BY college_id
''')

college_ranks = {row[0]: row[1] for row in cursor.fetchall()}

# Update colleges table with average ranking score
for college_id, avg_rank in college_ranks.items():
    cursor.execute('''
        UPDATE colleges
        SET ranking_score = %s, cutoff_score = %s
        WHERE id = %s
    ''', (avg_rank, 100 - (avg_rank / 1000), college_id))

conn.commit()
print(f"[SUCCESS] Updated {len(college_ranks)} colleges with cutoff/ranking scores")

# Verify the update
cursor.execute('''
    SELECT name, city, cutoff_score, ranking_score
    FROM colleges
    WHERE ranking_score > 0
    ORDER BY ranking_score DESC
    LIMIT 5
''')

print("\nTop 5 Colleges by Ranking Score:")
for row in cursor.fetchall():
    print(f"  {row[0]}: Ranking={row[3]:.2f}, Cutoff={row[2]:.2f}")

conn.close()
