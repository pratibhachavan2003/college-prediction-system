#!/usr/bin/env python3
"""
Import only government colleges from maha_cutoffs.csv to MySQL
Keeps database clean with only important colleges
"""
import csv
import mysql.connector

def import_government_colleges():
    """Import only government colleges"""
    
    # Government colleges to keep
    GOVT_COLLEGES = [
        "Government College of Engineering & Research, Avasari Khurd",
        "Government College of Engineering,  Aurangabad",
        "Government College of Engineering, Amravati",
        "Government College of Engineering, Chandrapur",
        "Government College of Engineering, Jalgaon",
        "Government College of Engineering, Karad",
        "Government College of Engineering, Nagpur",
        "Government Engineering College, Yavatmal",
    ]
    
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
    
    # Read CSV and filter
    print("\n[INFO] Reading maha_cutoffs.csv...")
    filtered_records = []
    college_map = {}
    
    with open('maha_cutoffs.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        total_records = 0
        for row in reader:
            total_records += 1
            college_name = row['collegeName'].strip()
            
            # Check if this is a government college
            for govt_college in GOVT_COLLEGES:
                if college_name == govt_college:
                    filtered_records.append(row)
                    if college_name not in college_map:
                        college_map[college_name] = True
                    break
    
    print(f"[OK] Total records in CSV: {total_records}")
    print(f"[OK] Government colleges found: {len(college_map)}")
    print(f"[OK] Records to import: {len(filtered_records)}")
    
    # Process and insert records
    inserted = 0
    skipped = 0
    
    # Create college mapping - ensure colleges exist
    college_ids = {}
    
    print("\n[INFO] Processing colleges...")
    for college_name in sorted(college_map.keys()):
        # Check if college exists
        cursor.execute("SELECT id FROM colleges WHERE name = %s LIMIT 1", (college_name,))
        result = cursor.fetchone()
        
        if result:
            college_ids[college_name] = result[0]
        else:
            # Insert new college - extract city from college name
            city = college_name.split(',')[-1].strip() if ',' in college_name else ""
            try:
                cursor.execute("""
                    INSERT INTO colleges (name, city, college_type, cutoff_score, ranking_score, cutoff_year)
                    VALUES (%s, %s, 'Engineering', 0.0, 0.0, 2019)
                """, (college_name, city))
                college_ids[college_name] = cursor.lastrowid
                print(f"  [OK] Added: {college_name}")
            except Exception as e:
                print(f"  [ERROR] Failed to add {college_name}: {e}")
                skipped += 1
                continue
    
    conn.commit()
    print(f"\nf[OK] Processed {len(college_ids)} colleges")
    
    # Insert cutoff records
    print("\n[INFO] Importing cutoff records...")
    
    for i, row in enumerate(filtered_records):
        try:
            college_name = row['collegeName'].strip()
            
            if college_name not in college_ids:
                skipped += 1
                continue
            
            college_id = college_ids[college_name]
            
            # Prepare data
            branch = row['branch'].strip()
            category = row['category'].strip() if row['category'] else 'General'
            round_num = int(row['round'])
            closing_rank = int(row['closingRank']) if row['closingRank'] else None
            year = int(row['cutoffYear'])
            quota = row['quota'].strip() if row['quota'] else 'MH'
            
            # Insert into cutoff_history
            cursor.execute("""
                INSERT INTO cutoff_history 
                (college_id, cutoff_year, branch, category, round_number, closing_rank, seat_type, cutoff_score, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
            """, (college_id, year, branch, category, round_num, closing_rank, quota, closing_rank if closing_rank else 0.0))
            
            inserted += 1
            
            if (i + 1) % 100 == 0:
                print(f"  Processed {i + 1}/{len(filtered_records)} records...")
        except Exception as e:
            print(f"[WARNING] Error inserting record: {e}")
            skipped += 1
            continue
    
    conn.commit()
    
    print(f"\n============================================================")
    print(f"IMPORT SUMMARY")
    print(f"============================================================")
    print(f"Total records processed:  {len(filtered_records)}")
    print(f"Successfully imported:    {inserted}")
    print(f"Skipped records:          {skipped}")
    print(f"============================================================")
    print(f"[SUCCESS] Imported {inserted} cutoff records to database")
    
    # Show summary by year
    cursor.execute("""
        SELECT cutoff_year, COUNT(*) as count FROM cutoff_history GROUP BY cutoff_year ORDER BY cutoff_year
    """)
    
    print(f"\nRecords by year:")
    for year, count in cursor.fetchall():
        print(f"  {year}: {count} records")
    
    cursor.close()
    conn.close()
    return True

if __name__ == '__main__':
    import_government_colleges()
