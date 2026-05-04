import pdfplumber

with pdfplumber.open('test_2020.pdf') as pdf:
    first_page = pdf.pages[0]
    text = first_page.extract_text()
    print(f'First page text length: {len(text)}')
    print(text[:500])