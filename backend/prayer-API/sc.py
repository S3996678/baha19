import sqlite3
import requests
from bs4 import BeautifulSoup

# Connect to SQLite Database
conn = sqlite3.connect('prayers.db')
cursor = conn.cursor()

# Create the table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        length TEXT,
        text TEXT,
        author TEXT,
        ref TEXT
    )
''')

# Function to fetch all categories dynamically
def fetch_categories():
    base_url = "https://www.bahaiquotes.com/"
    response = requests.get(base_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all category links (adjust selector based on actual HTML structure)
    category_links = soup.find_all('a', href=True)
    categories = []
    
    for link in category_links:
        if '/subject/' in link['href']:  # Look for URLs containing '/subject/'
            category_name = link.text.strip()
            category_url = base_url + link['href']
            categories.append((category_name, category_url))
    
    return categories

# Function to scrape quotes from a category
def scrape_category(category_name, category_url):
    response = requests.get(category_url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all quotes in this category
    quote_rows = soup.find_all('div', class_='quote-row views-row')

    for row in quote_rows:
        # Extract the quote text
        text_div = row.find('div', class_='views-field views-field-field-body')
        text_content = text_div.find('div', class_='field-content').text.strip() if text_div else None

        # Extract the reference
        ref_div = row.find('div', class_='views-field views-field-field-reference')
        ref_content = ref_div.find('div', class_='field-content').text.strip() if ref_div else None

        # Extract author and reference
        author = None
        ref = None
        if ref_content:
            parts = ref_content.split(',', 1)  # Split into two parts at the first comma
            author = parts[0].strip() if len(parts) > 0 else None
            ref = parts[1].strip() if len(parts) > 1 else None

        # Determine the length of the quote
        length = "short" if text_content and len(text_content) < 350 else "medium" if text_content and len(text_content) < 1300 else "long"

        # Insert into the database
        if text_content:
            cursor.execute('''
                INSERT INTO quotes (category, length, text, author, ref)
                VALUES (?, ?, ?, ?, ?)
            ''', (category_name, length, text_content, author, ref))

    conn.commit()

# Main script execution
categories = fetch_categories()

if categories:
    print(f"Found {len(categories)} categories.")
    for category_name, category_url in categories:
        print(f"Scraping category: {category_name}")
        scrape_category(category_name, category_url)
else:
    print("No categories found.")

# Close the connection
conn.close()

print("Scraping complete. Check the database for results.")
