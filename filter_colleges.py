#!/usr/bin/env python3
"""
Extract only important colleges from maha_cutoffs.csv
Keeps: Top tier government colleges and premier engineering colleges
"""
import csv

# Top colleges to keep
TOP_COLLEGES = [
    "Government College of Engineering, Pune",
    "Government College of Engineering, Aurangabad",
    "Government College of Engineering, Amravati",
    "Government College of Engineering, Yavatmal",
    "Government Engineering College, Karad",
    "Government Engineering College, Warud",
    "Government College of Engineering and Research, Amal",
    "Government College of Engineering, Chandrapur",
]

def filter_colleges():
    """Filter CSV to keep only top colleges"""
    
    matched_colleges = set()
    filtered_records = []
    
    print("[INFO] Reading maha_cutoffs.csv...")
    with open('maha_cutoffs.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            college_name = row['collegeName'].strip()
            
            # Check if this college is in our TOP_COLLEGES list
            for top_college in TOP_COLLEGES:
                if college_name == top_college:
                    filtered_records.append(row)
                    matched_colleges.add(college_name)
                    break
    
    print(f"[OK] Found {len(matched_colleges)} important colleges")
    print(f"[OK] Extracted {len(filtered_records)} records from these colleges")
    
    if not matched_colleges:
        print("[WARNING] No colleges matched! Checking available colleges...")
        with open('maha_cutoffs.csv', 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            colleges = set()
            for row in reader:
                colleges.add(row['collegeName'].strip())
        
        print(f"\nTotal unique colleges in CSV: {len(colleges)}")
        print("\nFirst 30 colleges:")
        for college in sorted(list(colleges))[:30]:
            print(f"  - {college}")
        return False
    
    # Write filtered CSV
    out_file = 'maha_cutoffs_filtered.csv'
    fieldnames = ['collegeName', 'branch', 'category', 'quota', 'round', 'closingRank', 'cutoffYear']
    
    with open(out_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for record in filtered_records:
            writer.writerow(record)
    
    print(f"\n[SUCCESS] Saved {len(filtered_records)} records to {out_file}")
    
    # Show statistics
    years = {}
    rounds = {}
    for record in filtered_records:
        year = record['cutoffYear']
        round_num = record['round']
        years[year] = years.get(year, 0) + 1
        key = f"{year}-Round {round_num}"
        rounds[key] = rounds.get(key, 0) + 1
    
    print("\nData distribution by year:")
    for year in sorted(years.keys()):
        print(f"  {year}: {years[year]} records")
    
    print("\nData distribution by round (Year-Round):")
    for key in sorted(rounds.keys()):
        print(f"  {key}: {rounds[key]} records")
    
    print("\nColleges included:")
    for college in sorted(matched_colleges):
        print(f"  - {college}")
    
    return True

if __name__ == '__main__':
    filter_colleges()
