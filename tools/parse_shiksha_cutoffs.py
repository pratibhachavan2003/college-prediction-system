#!/usr/bin/env python3
"""
Simple scraper to fetch Shiksha cutoff pages and extract cutoff tables to CSV.

Usage:
  python tools/parse_shiksha_cutoffs.py urls.txt

`urls.txt` should contain one URL per line. Output file: `shiksha_cutoffs.csv` in workspace root.

Notes:
 - Requires `requests` and `beautifulsoup4`.
 - The script attempts to find tables with headers containing 'College' or 'Branch'.
 - Extracted columns: sourceUrl, collegeName, branch, category, quota, round, openingRank, closingRank, cutoffValue
"""
import csv
import sys
import re
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup


def find_candidate_tables(soup):
    tables = soup.find_all('table')
    candidates = []
    for t in tables:
        headers = [th.get_text(strip=True).lower() for th in t.find_all('th')]
        header_text = ' '.join(headers)
        if 'college' in header_text or 'branch' in header_text or 'cutoff' in header_text:
            candidates.append((t, headers))
    return candidates


def extract_rows(table, headers):
    rows = []
    trs = table.find_all('tr')
    for tr in trs:
        cols = [td.get_text(' ', strip=True) for td in tr.find_all(['td','th'])]
        if not cols or len(cols) < 2:
            continue
        rows.append(cols)
    return rows


def map_row_to_record(cols, headers):
    # best-effort mapping based on header keywords
    text = ' | '.join(cols)
    rec = {
        'collegeName': '',
        'branch': '',
        'category': '',
        'quota': '',
        'round': '',
        'openingRank': '',
        'closingRank': '',
        'cutoffValue': '',
    }
    # try header-based mapping
    if headers:
        for i,h in enumerate(headers):
            key = h.lower()
            val = cols[i] if i < len(cols) else ''
            if 'college' in key:
                rec['collegeName'] = val
            elif 'branch' in key or 'course' in key:
                rec['branch'] = val
            elif 'category' in key:
                rec['category'] = val
            elif 'quota' in key:
                rec['quota'] = val
            elif 'round' in key:
                rec['round'] = val
            elif 'opening' in key and 'rank' in key:
                rec['openingRank'] = val
            elif 'closing' in key and 'rank' in key:
                rec['closingRank'] = val
            elif 'cutoff' in key or 'rank' in key:
                # ambiguous: place into cutoffValue unless better match
                if not rec['cutoffValue']:
                    rec['cutoffValue'] = val
    # fallback heuristics
    if not rec['collegeName']:
        # assume first column
        rec['collegeName'] = cols[0]
    if not rec['branch'] and len(cols) >= 2:
        rec['branch'] = cols[1]
    # try to find ranks in any column
    rank_re = re.compile(r'\b(\d{1,6})\b')
    for c in cols[::-1]:
        m = rank_re.search(c)
        if m:
            # assign to closingRank if empty
            if not rec['closingRank']:
                rec['closingRank'] = m.group(1)
            elif not rec['openingRank']:
                rec['openingRank'] = m.group(1)
    return rec


def process_url(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
        r = requests.get(url, timeout=20, headers=headers)
        r.raise_for_status()
    except Exception as e:
        print(f'ERROR fetching {url}: {e}')
        return []
    soup = BeautifulSoup(r.text, 'html.parser')
    candidates = find_candidate_tables(soup)
    records = []
    for table, headers in candidates:
        rows = extract_rows(table, headers)
        # skip header row
        if rows and rows[0] and any('college' in c.lower() or 'branch' in c.lower() for c in rows[0]):
            rows = rows[1:]
        for cols in rows:
            rec = map_row_to_record(cols, headers)
            rec['sourceUrl'] = url
            records.append(rec)
    return records


def main():
    if len(sys.argv) < 2:
        print('Usage: python tools/parse_shiksha_cutoffs.py urls.txt')
        sys.exit(2)
    urls_file = sys.argv[1]
    try:
        with open(urls_file, 'r', encoding='utf-8') as fh:
            urls = [line.strip() for line in fh if line.strip() and not line.strip().startswith('#')]
    except FileNotFoundError:
        print(f'Could not read {urls_file}')
        sys.exit(2)

    out_path = 'shiksha_cutoffs.csv'
    fieldnames = ['sourceUrl','collegeName','branch','category','quota','round','openingRank','closingRank','cutoffValue']
    total = 0
    with open(out_path, 'w', newline='', encoding='utf-8') as csvfh:
        writer = csv.DictWriter(csvfh, fieldnames=fieldnames)
        writer.writeheader()
        for url in urls:
            print('Processing', url)
            recs = process_url(url)
            for r in recs:
                writer.writerow({k: r.get(k, '') for k in fieldnames})
            total += len(recs)
    print(f'Done. Wrote {total} records to {out_path}')


if __name__ == '__main__':
    main()
