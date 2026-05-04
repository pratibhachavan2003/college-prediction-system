#!/usr/bin/env python
"""
Populate cutoff_score from closing_rank in the database.
The cutoff_score should represent the closing rank (the rank at which seats are filled).
"""
import mysql.connector
from mysql.connector import Error

def main():
    print("=" * 70)
    print("POPULATING CUTOFF SCORES FROM CLOSING RANKS")
    print("=" * 70)
    
    # Connect to database
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='pratibhachavan@18',
            database='college_prediction_db'
        )
        cursor = conn.cursor()
        print("\n[OK] Connected to MySQL database")
    except Error as e:
        print(f"\n✗ Connection error: {e}")
        return
    
    # Check current state
    cursor.execute("SELECT COUNT(*) FROM cutoff_history WHERE cutoff_score = 0 OR cutoff_score IS NULL")
    zero_count = cursor.fetchone()[0]
    print(f"[OK] Found {zero_count} cutoff records with score = 0 or NULL")
    
    if zero_count == 0:
        print("\n[INFO] All cutoff scores are already populated!")
        conn.close()
        return
    
    # Update cutoff_score from closing_rank where score is 0 or NULL
    try:
        cursor.execute("""
            UPDATE cutoff_history 
            SET cutoff_score = CAST(closing_rank AS DOUBLE)
            WHERE (cutoff_score = 0 OR cutoff_score IS NULL) 
            AND closing_rank IS NOT NULL
        """)
        conn.commit()
        
        updated_count = cursor.rowcount
        print(f"[OK] Updated {updated_count} cutoff records")
        
        # Also update the colleges table with average cutoff scores
        cursor.execute("""
            UPDATE colleges c
            SET cutoff_score = (
                SELECT AVG(ch.cutoff_score)
                FROM cutoff_history ch
                WHERE ch.college_id = c.id
                AND ch.cutoff_score > 0
            )
            WHERE c.cutoff_score = 0 OR c.cutoff_score IS NULL
        """)
        conn.commit()
        
        college_updated = cursor.rowcount
        print(f"[OK] Updated {college_updated} college cutoff scores (average)")
        
        # Show sample results
        print("\n[EXAMPLES] Sample updated records:")
        cursor.execute("""
            SELECT 
                ch.id, 
                c.name, 
                ch.branch, 
                ch.closing_rank, 
                ch.cutoff_score,
                ch.cutoff_year
            FROM cutoff_history ch
            JOIN colleges c ON ch.college_id = c.id
            WHERE ch.cutoff_score > 0
            LIMIT 10
        """)
        
        for record_id, college, branch, closing_rank, cutoff_score, year in cursor.fetchall():
            print(f"  [{record_id}] {college[:40]:40s} | {branch[:20]:20s} | Rank: {closing_rank:6} | Score: {cutoff_score:8.0f} | {year}")
        
        # Statistics
        cursor.execute("SELECT COUNT(*) FROM cutoff_history WHERE cutoff_score > 0")
        populated_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM cutoff_history")
        total_count = cursor.fetchone()[0]
        
        print("\n" + "=" * 70)
        print(f"[SUMMARY] Cutoff Score Population:")
        print(f"  Total cutoff records:       {total_count}")
        print(f"  Records with scores:        {populated_count}")
        print(f"  Coverage:                   {(populated_count/total_count*100):.1f}%")
        print("=" * 70)
        
    except Exception as e:
        print(f"\n✗ Error updating cutoff scores: {e}")
        conn.rollback()
    finally:
        conn.close()


if __name__ == '__main__':
    main()
