#!/usr/bin/env python3
import csv
from collections import Counter

with open('maha_cutoffs.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

print('Sample records (first 10):')
print()
for i, row in enumerate(rows[:10]):
    print(f'{i+1}. {row["collegeName"][:40]}')
    print(f'   Branch: {row["branch"][:40]}')
    print(f'   Category: {row["category"]}, Round: {row["round"]}, Rank: {row["closingRank"]}, Year: {row["cutoffYear"]}')
    print()

print(f'Total records: {len(rows)}')
print()

# Statistics
print('Records by year:')
year_counts = Counter(row['cutoffYear'] for row in rows)
for year in sorted(year_counts.keys()):
    print(f'  {year}: {year_counts[year]}')
print()

print('Records by round:')
round_counts = Counter(row['round'] for row in rows)
for round_num in sorted(round_counts.keys(), key=int):
    print(f'  Round {round_num}: {round_counts[round_num]}')
