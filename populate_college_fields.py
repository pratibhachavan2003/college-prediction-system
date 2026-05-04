#!/usr/bin/env python3
"""
Populate missing college fields: branch, city, cutoff_score, ranking_score
Script to update colleges table with data from cutoff_history
"""
import mysql.connector
import csv

def populate_college_fields():
    """Populate missing college fields"""
    
    # Database connection
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='pratibhachavan@18',
            database='college_prediction_db'
        )
        cursor = conn.cursor()
        print("\n[OK] Connected to MySQL database")
    except mysql.connector.Error as err:
        print(f"[ERROR] Database connection failed: {err}")
        return False
    
    # Extract city names from college names and create mapping
    city_map = extract_cities_from_csv()
    print(f"[OK] Extracted city names for {len(city_map)} colleges")
    
    # Get list of colleges
    cursor.execute("SELECT id, name FROM colleges")
    colleges = cursor.fetchall()
    print(f"[OK] Found {len(colleges)} colleges to update")
    
    updated = 0
    
    # For each college, update with:
    # 1. All branches concatenated from cutoff_history
    # 2. Average ranking score from closing ranks
    # 3. City from mapping
    
    for college_id, college_name in colleges:
        try:
            # Get all unique branches for this college (count them)
            cursor.execute("""
                SELECT branch, COUNT(*) as cnt
                FROM cutoff_history 
                WHERE college_id = %s 
                GROUP BY branch
                ORDER BY cnt DESC
                LIMIT 1
            """, (college_id,))
            result = cursor.fetchone()
            branch_str = result[0] if result else None  # Get the most common branch
            
            # Get average closing rank and convert to ranking score
            cursor.execute("""
                SELECT AVG(closing_rank), COUNT(*)
                FROM cutoff_history 
                WHERE college_id = %s
            """, (college_id,))
            result = cursor.fetchone()
            
            if result and result[0]:
                avg_closing_rank = float(result[0])
                # Ranking score: lower rank (better) = higher score
                # Scale: 0-100 where better rank = higher score
                ranking_score = max(0, 100 - (avg_closing_rank / 200))
                ranking_score = min(100, ranking_score)
                
                # Cutoff score based on average closing rank
                # Lower closing rank = higher cutoff score (100 = very competitive)
                cutoff_score = max(0, 100 - (avg_closing_rank / 500))
                cutoff_score = min(100, cutoff_score)
            else:
                ranking_score = 0.0
                cutoff_score = 0.0
            
            # Get city from mapping
            city = city_map.get(college_name, None)
            
            # Update colleges table
            cursor.execute("""
                UPDATE colleges 
                SET branch = %s, cutoff_score = %s, ranking_score = %s, city = %s 
                WHERE id = %s
            """, (branch_str, cutoff_score, ranking_score, city, college_id))
            
            updated += 1
            if updated % 10 == 0:
                print(f"  Updated {updated}/{len(colleges)}...")
                
        except Exception as e:
            print(f"[WARNING] Error updating college {college_id}: {e}")
            continue
    
    conn.commit()
    print(f"\n[SUCCESS] Updated {updated} college records")
    
    # Display sample
    cursor.execute("""
        SELECT id, name, city, branch, cutoff_score, ranking_score 
        FROM colleges 
        WHERE branch IS NOT NULL
        ORDER BY ranking_score DESC
        LIMIT 5
    """)
    results = cursor.fetchall()
    print("\nSample of updated colleges:")
    for row in results:
        col_id, name, city, branch, cutoff, ranking = row
        print(f"\n  [{col_id}] {name}")
        print(f"      City: {city if city else 'N/A'}")
        print(f"      Branches: {branch[:60] if branch else 'N/A'}...")
        print(f"      Cutoff Score: {cutoff:.2f}, Ranking Score: {ranking:.2f}")
    
    # Statistics
    cursor.execute("""
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN branch IS NOT NULL THEN 1 ELSE 0 END) as with_branch,
            SUM(CASE WHEN city IS NOT NULL THEN 1 ELSE 0 END) as with_city,
            SUM(CASE WHEN cutoff_score > 0 THEN 1 ELSE 0 END) as with_cutoff,
            SUM(CASE WHEN ranking_score > 0 THEN 1 ELSE 0 END) as with_ranking
        FROM colleges
    """)
    
    total, with_branch, with_city, with_cutoff, with_ranking = cursor.fetchone()
    
    print(f"\n[STATISTICS]")
    print(f"  Total Colleges:      {total}")
    print(f"  With Branch:         {with_branch} ({100*with_branch/total:.0f}%)")
    print(f"  With City:           {with_city} ({100*with_city/total:.0f}%)")
    print(f"  With Cutoff Score:   {with_cutoff} ({100*with_cutoff/total:.0f}%)")
    print(f"  With Ranking Score:  {with_ranking} ({100*with_ranking/total:.0f}%)")
    
    cursor.close()
    conn.close()
    return True

def extract_cities_from_csv():
    """Extract city names from college names in CSV"""
    city_map = {}
    
    # Try both CSV files
    csv_files = ['maha_cutoffs_2019_2023.csv', 'maha_cutoffs.csv']
    
    for csv_file in csv_files:
        try:
            with open(csv_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    college_name = row['collegeName'].strip()
                    # Try to extract city from college name (usually after last comma)
                    if ',' in college_name:
                        parts = college_name.split(',')
                        city = parts[-1].strip()  # Last part is usually the city
                        city_map[college_name] = city
            print(f"[OK] Read {csv_file}")
            break
        except Exception as e:
            continue
    
    return city_map

if __name__ == '__main__':
    print("=" * 70)
    print("POPULATING COLLEGE FIELDS FROM CUTOFF HISTORY")
    print("=" * 70)
    populate_college_fields()
    print("=" * 70)
