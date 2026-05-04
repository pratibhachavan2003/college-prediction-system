#!/usr/bin/env python
"""
Import 2020-2023 Maharashtra CET cutoff data to the database.
Adds to existing 2019 government colleges data.
"""
import csv
import mysql.connector
from mysql.connector import Error


def determine_college_type(college_name):
    """
    Determine college type from college name.
    Returns: 'Government', 'Private', 'Deemed', or 'Other'
    """
    name_lower = college_name.lower()
    
    # Government colleges
    government_keywords = [
        'government college',
        'government engineering',
        'vjti',  # Veermata Jijabai Technological Institute
        'sgugs',  # Shri Guru Gobind Singhji
        'dr. babasaheb ambedkar',
        'coep',  # College of Engineering Pune
        'gcoea',  # Government College of Engineering Aurangabad
        'gcet',  # Government College of Engineering Talegaon
    ]
    
    for keyword in government_keywords:
        if keyword in name_lower:
            return 'Government'
    
    # Private colleges
    private_keywords = [
        'sardar patel',
        'thakur college',
        'manipal',
        'bits',
        'jbims',
        'iipm',
        'nmims',
        'bharati vidyapeeth',
        'symbiosis',
        'cummins college',
        'institute of chemical technology',
    ]
    
    for keyword in private_keywords:
        if keyword in name_lower:
            return 'Private'
    
    # Deemed universities (mostly private, but different category)
    deemed_keywords = [
        'university',
        'deemed',
    ]
    
    has_deemed = any(keyword in name_lower for keyword in deemed_keywords)
    
    # If it's a university but not government or private, it's likely deemed
    if has_deemed and 'dr. babasaheb ambedkar technological university' not in name_lower:
        return 'Deemed'
    
    # Default to Private if "College" or "Institute" without Government prefix
    if 'college' in name_lower or 'institute' in name_lower or 'engineering' in name_lower:
        return 'Private'
    
    return 'Other'


def main():
    print("=" * 60)
    print("IMPORTING 2020-2023 CUTOFF DATA TO DATABASE")
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
        print(f"\n✗ Connection error: {e}")
        return
    
    # Read CSV file with 2019-2023 data
    csv_file = 'maha_cutoffs_2019_2023.csv'
    records = []
    
    try:
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            records = list(reader)
        print(f"[OK] Loaded {len(records)} records from {csv_file}")
    except Exception as e:
        print(f"✗ Error reading CSV: {e}")
        conn.close()
        return
    
    # Filter to keep only 2020-2023 data (skip 2019 to avoid duplicates)
    records_2020_2023 = [r for r in records if int(r['cutoffYear']) >= 2020]
    print(f"[OK] Filtered to {len(records_2020_2023)} records for 2020-2023")
    
    # Import new colleges and cutoffs
    imported_count = 0
    college_cache = {}
    
    # Get existing colleges
    cursor.execute('SELECT id, name FROM colleges')
    for college_id, college_name in cursor.fetchall():
        college_cache[college_name] = college_id
    
    print(f"[OK] Found {len(college_cache)} existing colleges in database")
    
    # Process each record
    for idx, record in enumerate(records_2020_2023):
        if (idx + 1) % 500 == 0:
            print(f"  Processing {idx + 1}/{len(records_2020_2023)}...")
        
        college_name = record['collegeName'].strip()
        branch_name = record['branch'].strip()
        category = record['category'].strip()
        quota = record['quota'].strip()
        round_num = int(record['round'])
        closing_rank = int(record['closingRank'])
        cutoff_year = int(record['cutoffYear'])
        
        # Get or create college
        if college_name not in college_cache:
            # Extract city from college name (e.g., "Government College of Engineering, Amravati" -> "Amravati")
            city = None
            city_match = None
            if ',' in college_name:
                city = college_name.split(',')[-1].strip()
            
            # Determine college type from name
            college_type = determine_college_type(college_name)
            
            try:
                cursor.execute('''
                    INSERT INTO colleges (name, city, college_type, cutoff_year, cutoff_score, ranking_score)
                    VALUES (%s, %s, %s, %s, %s, %s)
                ''', (college_name, city, college_type, cutoff_year, 0.0, 0.0))
                conn.commit()
                college_id = cursor.lastrowid
                college_cache[college_name] = college_id
            except Exception as e:
                print(f"    [ERROR] Creating college {college_name}: {e}")
                continue
        else:
            college_id = college_cache[college_name]
        
        # Check if cutoff record already exists
        cursor.execute('''
            SELECT id FROM cutoff_history 
            WHERE college_id = %s AND cutoff_year = %s AND round_number = %s 
            AND branch = %s AND category = %s
        ''', (college_id, cutoff_year, round_num, branch_name, category))
        
        if cursor.fetchone():
            # Record already exists, skip
            continue
        
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
            print(f"    [ERROR] Inserting cutoff: {e}")
    
    conn.commit()
    
    # Summary
    print("\n" + "=" * 60)
    print(f"[OK] Successfully imported {imported_count} new cutoff records")
    
    # Get final statistics
    cursor.execute('SELECT COUNT(*) FROM colleges')
    college_count = cursor.fetchone()[0]
    
    cursor.execute('SELECT COUNT(*) FROM cutoff_history')
    cutoff_count = cursor.fetchone()[0]
    
    # Show distribution
    cursor.execute('''
        SELECT cutoff_year, COUNT(*) as cnt
        FROM cutoff_history
        GROUP BY cutoff_year
        ORDER BY cutoff_year
    ''')
    
    print(f"\n[DB] Database Statistics:")
    print(f"   Total Colleges:        {college_count}")
    print(f"   Total Cutoff Records:  {cutoff_count}")
    print(f"\n   Distribution by Year:")
    for year, count in cursor.fetchall():
        print(f"   - {year}: {count:5d} records")
    
    print("=" * 60)
    
    conn.close()

if __name__ == '__main__':
    main()
