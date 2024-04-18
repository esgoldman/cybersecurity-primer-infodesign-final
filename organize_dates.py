import json
from datetime import datetime

with open('phishing.json', 'r') as f:
    data = json.load(f)

def month_to_number(month):
    return datetime.strptime(month, '%B %Y').strftime('%Y%m')

sorted_data = sorted(data, key=lambda x: month_to_number(x['date']))

with open('phishing-sorted.json', 'w') as f:
    json.dump(sorted_data, f, indent=4)
