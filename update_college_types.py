#!/usr/bin/env python
"""
Update college types in the database based on college names.
Intelligently identifies Government, Private, and other college types.
"""
import mysql.connector
from mysql.connector import Error
import re

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
    print("=" * 70)
    print("UPDATING COLLEGE TYPES IN DATABASE")
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
    
    # Get all colleges with 'Unknown' type
    cursor.execute("SELECT id, name FROM colleges WHERE college_type = 'Unknown' OR college_type IS NULL")
    colleges = cursor.fetchall()
    print(f"[OK] Found {len(colleges)} colleges with Unknown/NULL college_type")
    
    if len(colleges) == 0:
        print("\n[INFO] No colleges to update!")
        conn.close()
        return
    
    # Update each college
    updated_count = 0
    college_types_summary = {}
    
    for college_id, college_name in colleges:
        college_type = determine_college_type(college_name)
        
        try:
            cursor.execute(
                "UPDATE colleges SET college_type = %s WHERE id = %s",
                (college_type, college_id)
            )
            updated_count += 1
            
            # Track summary
            if college_type not in college_types_summary:
                college_types_summary[college_type] = 0
            college_types_summary[college_type] += 1
            
            if updated_count % 50 == 0:
                print(f"  Updated {updated_count}/{len(colleges)} colleges...")
        except Exception as e:
            print(f"  [ERROR] Updating college {college_name}: {e}")
    
    conn.commit()
    
    # Show summary
    print("\n" + "=" * 70)
    print(f"[OK] Successfully updated {updated_count} colleges")
    print("\nCollege Type Distribution:")
    for college_type, count in sorted(college_types_summary.items()):
        print(f"  {college_type:20s}: {count:5d} colleges")
    
    # Show some examples
    print("\n[EXAMPLES] Updated colleges:")
    cursor.execute("""
        SELECT id, name, college_type 
        FROM colleges 
        WHERE college_type != 'Unknown' AND college_type IS NOT NULL
        LIMIT 10
    """)
    
    for college_id, name, college_type in cursor.fetchall():
        print(f"  [{college_id:3d}] {name:60s} -> {college_type}")
    
    print("=" * 70)
    
    conn.close()


if __name__ == '__main__':
    main()
