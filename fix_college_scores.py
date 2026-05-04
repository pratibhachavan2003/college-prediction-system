#!/usr/bin/env python
"""
Fix colleges with missing cutoff_score and ranking_score
"""
import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='pratibhachavan@18',
    database='college_prediction_db'
)

cursor = conn.cursor()

# Get colleges without scores
cursor.execute('''
    SELECT id, name FROM colleges 
    WHERE cutoff_score = 0 OR ranking_score = 0
''')

colleges_to_fix = cursor.fetchall()
print(f"Found {len(colleges_to_fix)} colleges without scores")

for college_id, college_name in colleges_to_fix:
    # Check if they have cutoff_history data
    cursor.execute('''
        SELECT COUNT(*) FROM cutoff_history WHERE college_id = %s
    ''', (college_id,))
    
    cutoff_count = cursor.fetchone()[0]
    
    if cutoff_count > 0:
        # Recalculate the scores
        cursor.execute('''
            SELECT AVG(closing_rank) FROM cutoff_history WHERE college_id = %s
        ''', (college_id,))
        
        avg_rank = cursor.fetchone()[0]
        if avg_rank:
            ranking_score = max(0, 100 - (avg_rank / 200))
            ranking_score = min(100, ranking_score)
            cutoff_score = max(0, 100 - (avg_rank / 500))
            cutoff_score = min(100, cutoff_score)
        else:
            ranking_score = 50.0
            cutoff_score = 50.0
    else:
        # No cutoff data - use default
        ranking_score = 50.0
        cutoff_score = 50.0
    
    cursor.execute('''
        UPDATE colleges 
        SET cutoff_score = %s, ranking_score = %s
        WHERE id = %s
    ''', (cutoff_score, ranking_score, college_id))

conn.commit()

# Verify
cursor.execute('''
    SELECT COUNT(*) FROM colleges 
    WHERE cutoff_score > 0 AND ranking_score > 0
''')

print(f"[OK] Fixed - Now {cursor.fetchone()[0]} colleges have both scores")

# Show sample
cursor.execute('''
    SELECT name, cutoff_score, ranking_score 
    FROM colleges 
    WHERE cutoff_score > 0 
    ORDER BY ranking_score DESC 
    LIMIT 3
''')

print("\nSample:")
for name, cutoff, ranking in cursor.fetchall():
    print(f"  {name[:50]:50s} - Cutoff: {cutoff:5.1f}, Ranking: {ranking:5.1f}")

conn.close()
