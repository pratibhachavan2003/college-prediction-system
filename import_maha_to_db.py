#!/usr/bin/env python3
"""
Import Maharashtra cutoff CSV data to MySQL database.
Reads from maha_cutoffs.csv and populates cutoff_history table.
"""
import csv
import mysql.connector
import sys
from datetime import datetime

def import_maha_cutoffs():
    """Import extracted Maharashtra cutoff data to database"""
    
    # Database connection
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='pratibhachavan@18',
            database='college_prediction_db'
        )
        cursor = conn.cursor()
        print("[OK] Connected to MySQL database")
    except mysql.connector.Error as err:
        print(f"[ERROR] Database connection failed: {err}")
        return False
    
    # Read CSV file
    try:
        csv_file = 'maha_cutoffs.csv'
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            rows = list(reader)
        print(f"[OK] Loaded {len(rows)} records from {csv_file}")
    except Exception as e:
        print(f"[ERROR] Failed to read CSV: {e}")
        return False
    
    # Process and insert records
    inserted = 0
    skipped = 0
    errors = 0
    
    # Create mapping of college names to IDs
    # First, ensure all colleges exist
    college_map = {}
    
    print("\n[INFO] Processing colleges...")
    unique_colleges = set(row['collegeName'] for row in rows)
    
    for college_name in unique_colleges:
        # Check if college exists
        query = "SELECT id FROM colleges WHERE name = %s LIMIT 1"
        cursor.execute(query, (college_name,))
        result = cursor.fetchone()
        
        if result:
            college_map[college_name] = result[0]
        else:
            # Insert new college
            try:
                insert_query = """
                    INSERT INTO colleges (name, college_type, cutoff_score, ranking_score, cutoff_year) 
                    VALUES (%s, 'Engineering', %s, %s, 2019)
                """
                cursor.execute(insert_query, (college_name, 0.0, 0.0))
                college_map[college_name] = cursor.lastrowid
            except Exception as e:
                print(f"[WARNING] Failed to insert college {college_name}: {e}")
                skipped += 1
                continue
    
    conn.commit()
    print(f"[OK] Processed {len(college_map)} unique colleges")
    
    # Insert cutoff records
    print("\n[INFO] Importing cutoff records...")
    
    for i, row in enumerate(rows):
        try:
            college_name = row['collegeName']
            
            if college_name not in college_map:
                skipped += 1
                continue
            
            college_id = college_map[college_name]
            
            # Prepare data
            branch = row['branch'].strip()
            category = row['category'].strip() if row['category'] else 'General'
            round_num = int(row['round'])
            closing_rank = int(row['closingRank']) if row['closingRank'] else None
            year = int(row['cutoffYear'])
            quota = row['quota'].strip() if row['quota'] else 'MH'
            
            # Insert into cutoff_history
            insert_query = """
                INSERT INTO cutoff_history 
                (college_id, cutoff_year, branch, category, round_number, closing_rank, seat_type, cutoff_score, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
            """
            
            # Use closing_rank as cutoff_score (the rank at which seats are filled)
            cutoff_score = closing_rank if closing_rank else 0.0
            
            cursor.execute(insert_query, (
                college_id,
                year,
                branch,
                category,
                round_num,
                closing_rank,
                quota,
                cutoff_score
            ))
            
            inserted += 1
            
            # Progress indicator
            if (i + 1) % 500 == 0:
                print(f"  Processed {i + 1}/{len(rows)} records...")
                conn.commit()
        
        except Exception as e:
            errors += 1
            if errors <= 5:  # Show first 5 errors
                print(f"[ERROR] Row {i+1}: {e}")
    
    # Final commit
    conn.commit()
    
    # Print summary
    print(f"\n{'='*60}")
    print(f"IMPORT SUMMARY")
    print(f"{'='*60}")
    print(f"Total records processed:  {len(rows)}")
    print(f"Successfully imported:    {inserted}")
    print(f"Skipped records:          {skipped}")
    print(f"Import errors:            {errors}")
    print(f"{'='*60}")
    
    if inserted > 0:
        print(f"[SUCCESS] Imported {inserted} cutoff records to database")
    else:
        print(f"[ERROR] No records were imported")
    
    cursor.close()
    conn.close()
    
    return inserted > 0

if __name__ == '__main__':
    success = import_maha_cutoffs()
    sys.exit(0 if success else 1)
