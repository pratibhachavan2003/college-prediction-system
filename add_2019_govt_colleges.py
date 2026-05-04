#!/usr/bin/env python
"""
Import 2019 Maharashtra CET cutoff data from original CSV.
Focuses on government colleges to maintain database cleanliness.
"""
import csv
import mysql.connector
from mysql.connector import Error

# List of government colleges to import from 2019
GOVT_COLLEGES_2019 = [
    "Government College of Engineering, Amravati",
    "Government College of Engineering, Aurangabad",
    "Government College of Engineering, Amravati",
    "Government College of Engineering, Chandrapur",
    "Government College of Engineering, Jalgaon",
    "Government College of Engineering, Karad",
    "Government College of Engineering, Nagpur",
    "Government Engineering College, Yavatmal",
    "Government College of Engineering & Research, Avasari Khurd",
]

def main():
    print("=" * 60)
    print("IMPORTING 2019 GOVERNMENT COLLEGES DATA")
    print("=" * 60)
    
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
        print(f"\n[ERROR] Connection error: {e}")
        return
    
    # Try to read from the original CSV or create with basic 2019 data
    csv_file = 'maha_cutoffs.csv'  # Original 2019-only file
    
    if not os.path.exists(csv_file):
        print(f"\n[WARNING] {csv_file} not found, skipping 2019 data")
        print("(2020-2023 data is sufficient for demo purposes)")
        conn.close()
        return
    
    records = []
    try:
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Keep only government colleges and 2019 data
                if row.get('cutoffYear') == '2019':
                    # Check if college is in government list (flexible matching)
                    college = row.get('collegeName', '').strip()
                    if any(g.lower() in college.lower() for g in GOVT_COLLEGES_2019):
                        records.append(row)
        
        print(f"[OK] Loaded {len(records)} records for 2019 government colleges")
    except Exception as e:
        print(f"[WARNING] Could not read {csv_file}: {e}")
        print("Proceeding with existing 2020-2023 data only")
        conn.close()
        return
    
    # Import government colleges for 2019
    imported_count = 0
    college_cache = {}
    
    # Get existing colleges
    cursor.execute('SELECT id, name FROM colleges')
    for college_id, college_name in cursor.fetchall():
        college_cache[college_name] = college_id
    
    print(f"[OK] Found {len(college_cache)} existing colleges in database")
    
    for idx, record in enumerate(records):
        if (idx + 1) % 500 == 0:
            print(f"  Processing {idx + 1}/{len(records)}...")
        
        college_name = record['collegeName'].strip()
        branch_name = record['branch'].strip()
        category = record['category'].strip()
        quota = record['quota'].strip()
        round_num = int(record['round'])
        closing_rank = int(record['closingRank'])
        cutoff_year = int(record['cutoffYear'])
        
        # Get or create college
        if college_name not in college_cache:
            # Extract city
            city = None
            if ',' in college_name:
                city = college_name.split(',')[-1].strip()
            
            try:
                cursor.execute('''
                    INSERT INTO colleges (name, city, college_type, cutoff_year, cutoff_score, ranking_score)
                    VALUES (%s, %s, %s, %s, %s, %s)
                ''', (college_name, city, 'Government', cutoff_year, 0.0, 0.0))
                conn.commit()
                college_id = cursor.lastrowid
                college_cache[college_name] = college_id
            except Exception as e:
                continue
        else:
            college_id = college_cache[college_name]
        
        # Insert cutoff record
        try:
            # Use closing_rank as cutoff_score (the rank at which seats are filled)
            cursor.execute('''
                INSERT INTO cutoff_history 
                (college_id, cutoff_year, branch, category, round_number, closing_rank, seat_type, cutoff_score, created_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW())
            ''', (college_id, cutoff_year, branch_name, category, round_num, closing_rank, quota, closing_rank))
            imported_count += 1
        except Exception as e:
            continue
    
    conn.commit()
    
    # Summary
    print("\n" + "=" * 60)
    print(f"[OK] Successfully imported {imported_count} 2019 government college records")
    
    # Get final statistics
    cursor.execute('SELECT COUNT(*) FROM colleges')
    college_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM cutoff_history')
    cutoff_count = cursor.fetchone()[0]
    
    cursor.execute('''
        SELECT cutoff_year,COUNT(*) as cnt
        FROM cutoff_history
        GROUP BY cutoff_year
        ORDER BY cutoff_year
    ''')
    
    print(f"\n[DB] Final Database Statistics:")
    print(f"   Total Colleges:         {college_count}")
    print(f"   Total Cutoff Records:   {cutoff_count}")
    print(f"\n   Distribution by Year:")
    for year, count in cursor.fetchall():
        print(f"   - {year}: {count:5d} records")
    
    print("=" * 60)
    
    conn.close()

if __name__ == '__main__':
    import os
    main()
