#!/usr/bin/env python3
"""
Enhanced parser for Maharashtra CET cutoff data (2019-2023).
Handles both 2019 (concatenated) and 2020+ (multi-line) PDF formats.
"""
import csv
import requests
import pypdf
import re
import os
import sys

def get_cutoff_urls():
    """Get all Maharashtra CET cutoff URLs for 2019-2023"""
    urls = [
        # 2019 Cutoffs
        ('https://fe2023.maha-ara.org/2019/2019ENGG_CAP1_CutOff.pdf', 2019, 1),
        ('https://fe2023.maha-ara.org/2019/2019ENGG_CAP2_CutOff.pdf', 2019, 2),
        ('https://fe2023.maha-ara.org/2019/2019ENGG_CAP3_CutOff.pdf', 2019, 3),
        
        # 2020 Cutoffs
        ('https://fe2023.maha-ara.org/2020/2020ENGG_CAP1_CutOff.pdf', 2020, 1),
        ('https://fe2023.maha-ara.org/2020/2020ENGG_CAP2_CutOff.pdf', 2020, 2),
        ('https://fe2023.maha-ara.org/2020/2020ENGG_CAP3_CutOff.pdf', 2020, 3),
        
        # 2021 Cutoffs
        ('https://fe2023.maha-ara.org/2021/2021ENGG_CAP1_CutOff.pdf', 2021, 1),
        ('https://fe2023.maha-ara.org/2021/2021ENGG_CAP2_CutOff.pdf', 2021, 2),
        ('https://fe2023.maha-ara.org/2021/2021ENGG_CAP3_CutOff.pdf', 2021, 3),
        
        # 2022 Cutoffs
        ('https://fe2023.maha-ara.org/2022/2022ENGG_CAP1_CutOff.pdf', 2022, 1),
        ('https://fe2023.maha-ara.org/2022/2022ENGG_CAP2_CutOff.pdf', 2022, 2),
        ('https://fe2023.maha-ara.org/2022/2022ENGG_CAP3_CutOff.pdf', 2022, 3),
        
        # 2023 Cutoffs
        ('https://ara2023.blob.core.windows.net/fe2023/dtefiles/files/47.pdf?did=12131', 2023, 1),
        ('https://ara2023.blob.core.windows.net/fe2023/dtefiles/files/50.pdf?did=22157', 2023, 2),
        ('https://ara2023.blob.core.windows.net/fe2023/dtefiles/files/55.pdf?did=22165', 2023, 3),
    ]
    return urls

def extract_text_from_pdf(pdf_file_path):
    """Extract text from PDF using pypdf"""
    text = ''
    try:
        with open(pdf_file_path, 'rb') as f:
            reader = pypdf.PdfReader(f)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + '\n'
    except Exception as e:
        print(f'    [ERROR] PDF extraction failed: {e}')
        return ''
    return text

def parse_2019_format(text, year, round_num):
    """Parse 2019 format (concatenated data without spaces)"""
    records = []
    
    # Remove newlines to work with concatenated text
    text_clean = text.replace('\n', ' ').replace('\r', ' ')
    
    # Find all colleges: "1002 - College Name"
    # College pattern: digit(4) + " - " + college name + following branch code
    college_pattern = r'(\d{4})\s+-\s+([^0-9]+?)(?=\d{8,10}\s+-|$)'
    
    for college_match in re.finditer(college_pattern, text_clean):
        college_code = college_match.group(1)
        college_name = college_match.group(2).strip()
        
        # Remove extra spaces, university names, etc.
        college_name = re.sub(r'Status:.*?(?=\d{8})', '', college_name)
        college_name = re.sub(r'Home University.*?(?=\d{8}|\d{4})', '', college_name)
        college_name = re.sub(r'University Department.*?(?=\d{8})', '', college_name)
        college_name = college_name.strip()
        
        if not college_name or len(college_name) < 5:
            continue
        
        college_end = college_match.end()
        
        # Find all branches for this college
        # Branch pattern: digit(8-10) + " - " + branch name + status/merit data
        branch_start_in_college = college_end
        
        # Find where the next college starts
        next_college = re.search(r'\d{4}\s+-\s+[A-Za-z]', text_clean[college_end:])
        if next_college:
            college_section_end = college_end + next_college.start()
        else:
            college_section_end = len(text_clean)
        
        college_section = text_clean[college_end:college_section_end]
        
        branch_pattern = r'(\d{8,10})\s+-\s+([^0-9]+?)(?=\d{8,10}\s+-|I\d|Status:|$)'
        
        for branch_match in re.finditer(branch_pattern, college_section):
            branch_code = branch_match.group(1)
            branch_name = branch_match.group(2).strip()
            
            # Clean up branch name
            branch_name = re.sub(r'Status:.*', '', branch_name).strip()
            branch_name = re.sub(r'\s+', ' ', branch_name)  # Remove extra spaces
            
            if not branch_name or len(branch_name) < 3:
                continue
            
            # Find merit data for this branch
            branch_end = branch_match.end()
            merit_search_section = college_section[branch_match.start():min(branch_match.start() + 1000, len(college_section))]
            
            # Look for patterns like "GOPENSGSCSGSTSIGVJSI12517(91.34)I..."
            # We need to find categories and corresponding merit numbers
            
            # Extract all merit numbers with their ranks
            # Pattern: "I" + optional space + rank number + optional "(percentile)"
            merit_pattern = r'I\s*(\d{3,6})\s*\(?\d*\.?\d*\)?'
            merit_numbers = [int(m.group(1)) for m in re.finditer(merit_pattern, merit_search_section)]
            
            # For 2019, we'll extract one record per branch with the first (general) rank
            # In a full implementation, we'd parse all category ranks
            if merit_numbers:
                # Take the first rank as General category
                record = {
                    'collegeName': college_name,
                    'branch': branch_name,
                    'category': 'General',
                    'quota': 'GOPENS',
                    'round': round_num,
                    'closingRank': merit_numbers[0],
                    'cutoffYear': year
                }
                records.append(record)
    
    return records

def parse_2020_format(text, year, round_num):
    """Parse 2020+ format (multi-line data with spaces)"""
    records = []
    lines = text.split('\n')
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        # Look for college: "1002 - Government College of Engineering, Amravati"
        college_match = re.match(r'^(\d{4})\s+-\s+(.+)$', line)
        if college_match:
            college_name = college_match.group(2).strip()
            i += 1
            
            # Look for branches
            while i < len(lines):
                line = lines[i].strip()
                
                # Stop at next college
                if re.match(r'^(\d{4})\s+-', line):
                    break
                
                # Look for branch: "100219110 - Civil Engineering"
                branch_match = re.match(r'^(\d{8,10})\s+-\s+(.+?)(?:Status:|$)', line)
                if branch_match:
                    branch_name = branch_match.group(2).strip()
                    
                    # Look for categories line (contains category codes separated by spaces)
                    # Pattern: "GOPENS GSCS GSTS GVJS GNT1S..."
                    j = i + 1
                    categories_line = None
                    
                    while j < min(i + 15, len(lines)):
                        check_line = lines[j].strip()
                        if 'GOPENS' in check_line or 'GSCS' in check_line:
                            categories_line = check_line
                            break
                        j += 1
                    
                    if categories_line:
                        # Parse categories from this line
                        categories = re.findall(r'([A-Z]+S?)', categories_line)
                        
                        # Look for merit data after categories
                        # Pattern: "  I 12517" or "I 12517(91.34)"
                        j = i + 1
                        merit_data = []
                        
                        while j < min(i + 100, len(lines)):
                            check_line = lines[j].strip()
                            
                            # Look for lines starting with "I" followed by number
                            if re.match(r'^I\s*\d{3,6}', check_line):
                                # Extract rank: "I 12517" or "I 12517(91.3415875)"
                                rank_match = re.search(r'I\s*(\d{3,6})', check_line)
                                if rank_match:
                                    rank = int(rank_match.group(1))
                                    merit_data.append(rank)
                            
                            # Stop at next branch or college
                            if re.match(r'^(\d{4,10})\s+-', check_line) or 'Stage' in check_line:
                                break
                            
                            j += 1
                        
                        # Match merit data with categories
                        for idx, category_code in enumerate(categories):
                            if idx < len(merit_data):
                                rank = merit_data[idx]
                                category = parse_category(category_code)
                                
                                record = {
                                    'collegeName': college_name,
                                    'branch': branch_name,
                                    'category': category,
                                    'quota': 'GOPENS' if 'GOPENS' in category_code else 'LS',
                                    'round': round_num,
                                    'closingRank': rank,
                                    'cutoffYear': year
                                }
                                records.append(record)
                
                i += 1
            continue
        
        i += 1
    
    return records

def parse_category(code):
    """Map category codes to standard names"""
    code = code.upper()
    
    if 'SC' in code:
        return 'SC'
    elif 'ST' in code:
        return 'ST'
    elif 'OBC' in code or 'SEBC' in code:
        return 'OBC'
    elif 'NT' in code or 'NTB' in code:
        return 'NT'
    elif 'TFWS' in code:
        return 'TFWS'
    elif 'EWS' in code:
        return 'EWS'
    elif 'VJ' in code or 'VJNT' in code:
        return 'VJ'
    elif 'PWD' in code or 'DEF' in code:
        return 'Divyang'
    
    return 'General'

def load_existing_text_files():
    """Load already extracted PDF text from files"""
    pdf_data = {}
    
    for year in [2019, 2020, 2021, 2022, 2023]:
        for round_num in [1, 2, 3]:
            filename = f'cutoff_{year}_{round_num}_MH.txt'
            if os.path.exists(filename):
                try:
                    with open(filename, 'r', encoding='utf-8') as f:
                        pdf_data[(year, round_num)] = f.read()
                except:
                    pass
    
    return pdf_data

def main():
    print("=" * 60)
    print("MAHARASHTRA CET CUTOFF DATA PARSER (2019-2023)")
    print("=" * 60)
    
    # Load existing PDF text files (already extracted)
    pdf_data = load_existing_text_files()
    print(f"\nLoaded {len(pdf_data)} cached PDF text files")
    
    all_records = []
    
    for year in [2019, 2020, 2021, 2022, 2023]:
        print(f"\n📅 Processing Year {year}...")
        year_records = []
        
        for round_num in [1, 2, 3]:
            print(f'  ├─ CAP Round {round_num}', end='', flush=True)
            
            key = (year, round_num)
            if key in pdf_data:
                text = pdf_data[key]
                
                # Try 2019 format first, then 2020 format
                if year == 2019:
                    records = parse_2019_format(text, year, round_num)
                else:
                    records = parse_2020_format(text, year, round_num)
                
                if not records and year != 2019:
                    # Fallback to 2019 parser if 2020 parser got nothing
                    records = parse_2019_format(text, year, round_num)
                
                print(f' ✓ {len(records):5d} records extracted')
                year_records.extend(records)
            else:
                print(f' ✗ Text file not found')
        
        print(f'  └─ Year {year} Total: {len(year_records)} records')
        all_records.extend(year_records)
    
    # Output to CSV
    out_path = 'maha_cutoffs_2019_2023.csv'
    fieldnames = ['collegeName', 'branch', 'category', 'quota', 'round', 'closingRank', 'cutoffYear']
    
    with open(out_path, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for record in all_records:
            writer.writerow({k: record.get(k, '') for k in fieldnames})
    
    # Summary
    print("\n" + "=" * 60)
    print(f"✅ SUCCESS: Extracted {len(all_records)} total cutoff records")
    print(f"📊 Distribution by Year:")
    for year in [2019, 2020, 2021, 2022, 2023]:
        year_count = len([r for r in all_records if r['cutoffYear'] == year])
        print(f"   - {year}: {year_count:5d} records")
    print(f"💾 Output saved to: {out_path}")
    print("=" * 60)

if __name__ == '__main__':
    main()
