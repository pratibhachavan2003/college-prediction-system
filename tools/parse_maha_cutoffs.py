#!/usr/bin/env python3
"""
Script to fetch Maharashtra cutoff PDFs and extract data to CSV.

Usage:
  python tools/parse_maha_cutoffs.py

Outputs maha_cutoffs.csv with the data.
"""
import csv
import requests   
import pypdf
import io
import re

def get_cutoff_urls():
    # Maharashtra CET Cutoff URLs - 2019-2024
    # Note: MenuIds for 2020-2024 need to be verified from website
    # Visit: https://fe2023.maha-ara.org/StaticPages/frmDownloads.aspx
    # Look for "Seat Matrix and Cut Off Lists of CAP Round for Previous Years" table
    
    urls = [
        # 2019 Cutoffs (✅ Verified & Working)
        ('https://fe2023.maha-ara.org/2019/2019ENGG_CAP1_CutOff.pdf', 2019, 1, 'MH'),
        ('https://fe2023.maha-ara.org/2019/2019ENGG_CAP2_CutOff.pdf', 2019, 2, 'MH'),
        ('https://fe2023.maha-ara.org/2019/2019ENGG_CAP3_CutOff.pdf', 2019, 3, 'MH'),
        
        # 2020-2024 URLs
        ('https://fe2023.maha-ara.org/2020/2020ENGG_CAP1_CutOff.pdf', 2020, 1, 'MH'),
        ('https://fe2023.maha-ara.org/2020/2020ENGG_CAP2_CutOff.pdf', 2020, 2, 'MH'),
        ('https://fe2023.maha-ara.org/2020/2020ENGG_CAP3_CutOff.pdf', 2020, 3, 'MH'),
        
        # 2021 URLs
        ('https://fe2023.maha-ara.org/2021/2021ENGG_CAP1_CutOff.pdf', 2021, 1, 'MH'),
        ('https://fe2023.maha-ara.org/2021/2021ENGG_CAP2_CutOff.pdf', 2021, 2, 'MH'),
        ('https://fe2023.maha-ara.org/2021/2021ENGG_CAP3_CutOff.pdf', 2021, 3, 'MH'),
        
        # 2022 URLs
        ('https://fe2023.maha-ara.org/2022/2022ENGG_CAP1_CutOff.pdf', 2022, 1, 'MH'),
        ('https://fe2023.maha-ara.org/2022/2022ENGG_CAP2_CutOff.pdf', 2022, 2, 'MH'),
        ('https://fe2023.maha-ara.org/2022/2022ENGG_CAP3_CutOff.pdf', 2022, 3, 'MH'),
        
        # 2023 URLs
        ('https://ara2023.blob.core.windows.net/fe2023/dtefiles/files/47.pdf?did=12131', 2023, 1, 'MH'),
        ('https://ara2023.blob.core.windows.net/fe2023/dtefiles/files/50.pdf?did=22157', 2023, 2, 'MH'),
        ('https://ara2023.blob.core.windows.net/fe2023/dtefiles/files/55.pdf?did=22165', 2023, 3, 'MH'),
    ]
    return urls

def download_pdf(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    import os
    r = requests.get(url, headers=headers)
    r.raise_for_status()
    # Save to a temp file
    pdf_path = 'temp_cutoff.pdf'
    with open(pdf_path, 'wb') as f:
        f.write(r.content)
    return pdf_path

def extract_text_from_pdf(pdf_file_path):
    text = ''
    with open(pdf_file_path, 'rb') as f:
        reader = pypdf.PdfReader(f)
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + '\n'
    return text

def parse_cutoff_text(text, year, round_num, quota):
    """
    Parse Maharashtra cutoff PDF text.
    
    Supports two PDF formats:
    
    FORMAT 1 (2019): Concatenated on same lines
    1002 - College100219110 - BranchStatus:...GOPENS...I9698(95.48)...
    
    FORMAT 2 (2020+): Normal line breaks
    1002 - College
    100219110 - Branch  
    ...
    I 12517
    (91.3415875)
    """
    records = []
    
    # First, try FORMAT 1 (2019 style with concatenated merit data)
    # This uses the regex pattern that worked well for 2019
    college_pattern = r'(\d{4})\s+-\s+([^\d]+?)(\d{8,9}\s+-)'
    college_matches = list(re.finditer(college_pattern, text))
    
    if college_matches:
        # This looks like 2019 format
        for col_idx, college_match in enumerate(college_matches):
            college_name = college_match.group(2).strip()
            
            college_start = college_match.start()
            if col_idx + 1 < len(college_matches):
                college_end = college_matches[col_idx + 1].start()
            else:
                college_end = len(text)
            
            college_section = text[college_start:college_end]
            
            # Find branches
            branch_pattern = r'(\d{8,9})\s+-\s+([^\d\(]+?)(?:Status:|I\d{4,6}\()'
            branch_matches = list(re.finditer(branch_pattern, college_section))
            
            for br_idx, branch_match in enumerate(branch_matches):
                branch_name = branch_match.group(2).strip()
                
                if br_idx + 1 < len(branch_matches):
                    br_end = branch_matches[br_idx + 1].start()
                else:
                    br_end = len(college_section)
                
                branch_section = college_section[branch_match.start():br_end]
                
                # Find category and merit: "GOPENS...I9698(95.48)"
                data_pattern = r'([A-Z]+)\s*I(\d{4,6})\((\d+\.\d+)\)'
                data_match = re.search(data_pattern, branch_section)
                
                if data_match:
                    category_str = data_match.group(1)
                    closing_rank = int(data_match.group(2))
                    category = parse_category(category_str)
                    
                    record = {
                        'collegeName': college_name,
                        'branch': branch_name,
                        'category': category,
                        'quota': quota,
                        'round': round_num,
                        'closingRank': closing_rank,
                        'cutoffYear': year
                    }
                    records.append(record)
        
        return records  # Return if we found records with format 1
    
    # If no records found, try FORMAT 2 (2020+ style with line breaks)
    lines = text.split('\n')
    i = 0
    
    while i < len(lines):
        line = lines[i].strip()
        
        # Look for college: 4 digit + " - "
        if re.match(r'^(\d{4})\s+-', line):
            college_match = re.match(r'^(\d{4})\s+-\s+(.+)$', line)
            if college_match:
                college_name = college_match.group(2).strip()
                
                # Look for branches in next lines
                i += 1
                while i < len(lines):
                    line = lines[i].strip()
                    
                    # Stop at next college
                    if re.match(r'^(\d{4})\s+-', line):
                        break
                    
                    # Look for branch: 8-9 digit + " - "
                    if re.match(r'^(\d{8,9})\s+-', line):
                        branch_match = re.match(r'^(\d{8,9})\s+-\s+(.+)$', line)
                        if branch_match:
                            branch_name = branch_match.group(2).strip()
                            
                            # Look for merit data in next 40 lines
                            Merit_found = False
                            for j in range(i + 1, min(i + 40, len(lines))):
                                check_line = lines[j].strip()
                                
                                # Skip empty lines and headers
                                if not check_line or 'Status:' in check_line or 'Level' in check_line:
                                    continue
                                
                                # Format: "I" on its own line, merit number on next line
                                if check_line == 'I' or check_line.startswith('I '):
                                    # Extract merit from this or next lines
                                    k = j if check_line == 'I' else j + 1
                                    while k < min(j + 5, len(lines)):
                                        merit_line = lines[k].strip()
                                        merit_n_match = re.match(r'^(\d{4,6})', merit_line)
                                        if merit_n_match:
                                            closing_rank = int(merit_n_match.group(1))
                                            # Find category from earlier lines
                                            category_str = 'General'
                                            for back_idx in range(max(0, j - 10), j):
                                                back_line = lines[back_idx].strip()
                                                # Look for category codes
                                                if 'GOPENS' in back_line or 'GSCS' in back_line or 'GSTS' in back_line:
                                                    # Extract first category found
                                                    cat_codes = re.findall(r'(GOPENS|GSCS|GSTS|GOBC|GSEBCS|TFWS|EWS)', back_line)
                                                    if cat_codes:
                                                        category_str = cat_codes[0]
                                                        break
                                            
                                            category = parse_category(category_str)
                                            record = {
                                                'collegeName': college_name,
                                                'branch': branch_name,
                                                'category': category,
                                                'quota': quota,
                                                'round': round_num,
                                                'closingRank': closing_rank,
                                                'cutoffYear': year
                                            }
                                            records.append(record)
                                            Merit_found = True
                                            break
                                        k += 1
                                    
                                    if Merit_found:
                                        break
                    
                    i += 1
                
                continue
        
        i += 1
    
    return records


def parse_category(cat):
    """Parse category code from PDF (GOPENS -> General, GSC -> SC, etc)"""
    cat = cat.upper()
    category = 'General'
    
    if 'SC' in cat:
        category = 'SC'
    elif 'ST' in cat:
        category = 'ST'
    elif 'OBC' in cat:
        category = 'OBC'
    elif 'NT' in cat:
        category = 'NT'
    elif 'TFWS' in cat:
        category = 'TFWS'
    elif 'EWS' in cat:
        category = 'EWS'
    elif 'VJ' in cat:
        category = 'VJ'
    elif 'PWD' in cat:
        category = 'PWD'
    elif 'DEF' in cat:
        category = 'Divyang'
    
    return category

def extract_college_name(college_line):
    # 1002 - Government College of Engineering, Amravati
    return college_line.split(' - ', 1)[1] if ' - ' in college_line else college_line

def extract_branch_name(branch_line):
    # 100219110 - Civil Engineering
    return branch_line.split(' - ', 1)[1] if ' - ' in branch_line else branch_line

def main():
    print("Starting parser main function")
    urls = get_cutoff_urls()  # Process all URLs
    print(f'Found {len(urls)} cutoff URLs')
    
    all_records = []
    for url, year, round_num, quota in urls:
        print(f'\nProcessing {year} Round {round_num} {quota}...')
        try:
            print(f'Downloading {url}')
            pdf_path = download_pdf(url)
            print(f'Downloaded to {pdf_path}')
            text = extract_text_from_pdf(pdf_path)
            with open(f'cutoff_{year}_{round_num}_{quota}.txt', 'w', encoding='utf-8') as f:
                f.write(text)
            print(f'  [OK] Downloaded and extracted ({len(text)} chars)')
            
            records = parse_cutoff_text(text, year, round_num, quota)
            print(f'  [OK] Parsed {len(records)} records')
            all_records.extend(records)
        except Exception as e:
            print(f'  [ERROR] {e}')
    
    # Output to CSV
    out_path = 'maha_cutoffs.csv'
    fieldnames = ['collegeName','branch','category','quota','round','closingRank','cutoffYear']
    with open(out_path, 'w', newline='', encoding='utf-8') as csvfh:
        writer = csv.DictWriter(csvfh, fieldnames=fieldnames)
        writer.writeheader()
        for r in all_records:
            writer.writerow({k: r.get(k, '') for k in fieldnames})
    print(f'\n[SUCCESS] Wrote {len(all_records)} total records to {out_path}')

if __name__ == '__main__':
    main()

