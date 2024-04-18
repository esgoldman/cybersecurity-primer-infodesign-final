import re
import json

text_file_path = 'cyberattacks.txt'

try:
    with open(text_file_path, 'r', encoding='utf-8') as file:
        content = file.read()
except FileNotFoundError:
    print(f"File not found: {text_file_path}")
    exit(1)

pattern = r"(?P<date>[A-Z][a-z]+ \d{4}): (?P<description>.+?)(?=\n[A-Z][a-z]+ \d{4}:|$)"
matches = re.finditer(pattern, content, re.DOTALL)
data = []

for match in matches:
    entry = match.groupdict()
    entry['date'] = entry['date'].strip()

    target_type_match = re.search(r"against the ([A-Z][a-z]+(?: [A-Z][a-z]+)*)", entry['description'])
    if target_type_match:
        entry['target-type'] = target_type_match.group(1)
        entry['description'] = entry['description'].replace(target_type_match.group(0), "")  # Remove target type from description
    else:
        entry['target-type'] = ""

    targets = re.findall(r"\b(?:[A-Z][a-z]+\b(?! (?:hacker|attackers?)))+", entry['description'])

    nation_mapping = {
    'Afghan': 'Afghanistan',
    'Albanian': 'Albania',
    'Algerian': 'Algeria',
    'American': 'America',
    'Andorran': 'Andorra',
    'Angolan': 'Angola',
    'Antiguan': 'Antigua and Barbuda',
    'Argentinian': 'Argentina',
    'Armenian': 'Armenia',
    'Australian': 'Australia',
    'Austrian': 'Austria',
    'Azerbaijani': 'Azerbaijan',
    'Bahamian': 'Bahamas',
    'Bahraini': 'Bahrain',
    'Bangladeshi': 'Bangladesh',
    'Barbadian': 'Barbados',
    'Belarusian': 'Belarus',
    'Belgian': 'Belgium',
    'Belizean': 'Belize',
    'Beninese': 'Benin',
    'Bhutanese': 'Bhutan',
    'Bolivian': 'Bolivia',
    'Bosnian': 'Bosnia and Herzegovina',
    'Botswanan': 'Botswana',
    'Brazilian': 'Brazil',
    'British': 'United Kingdom',
    'Bruneian': 'Brunei',
    'Bulgarian': 'Bulgaria',
    'Burkinabe': 'Burkina Faso',
    'Burmese': 'Myanmar',
    'Burundian': 'Burundi',
    'Cambodian': 'Cambodia',
    'Cameroonian': 'Cameroon',
    'Canadian': 'Canada',
    'Cape Verdean': 'Cape Verde',
    'Central African': 'Central African Republic',
    'Chadian': 'Chad',
    'Chilean': 'Chile',
    'Chinese': 'China',
    'Colombian': 'Colombia',
    'Comoran': 'Comoros',
    'Congolese': 'Democratic Republic of the Congo',
    'Costa Rican': 'Costa Rica',
    'Croatian': 'Croatia',
    'Cuban': 'Cuba',
    'Cypriot': 'Cyprus',
    'Czech': 'Czech Republic',
    'Danish': 'Denmark',
    'Djiboutian': 'Djibouti',
    'Dominican': 'Dominican Republic',
    'Dutch': 'Netherlands',
    'East Timorese': 'Timor-Leste',
    'Ecuadorean': 'Ecuador',
    'Egyptian': 'Egypt',
    'European': 'Europe',
    'Salvadoran': 'El Salvador',
    'Equatorial Guinean': 'Equatorial Guinea',
    'Eritrean': 'Eritrea',
    'Estonian': 'Estonia',
    'Ethiopian': 'Ethiopia',
    'Fijian': 'Fiji',
    'Finnish': 'Finland',
    'French': 'France',
    'Gabonese': 'Gabon',
    'Gambian': 'Gambia',
    'Georgian': 'Georgia',
    'German': 'Germany',
    'Ghanaian': 'Ghana',
    'Greek': 'Greece',
    'Grenadian': 'Grenada',
    'Guatemalan': 'Guatemala',
    'Guinean': 'Guinea',
    'Guinea-Bissauan': 'Guinea-Bissau',
    'Guyanese': 'Guyana',
    'Haitian': 'Haiti',
    'Honduran': 'Honduras',
    'Hungarian': 'Hungary',
    'Icelander': 'Iceland',
    'Indian': 'India',
    'Indonesian': 'Indonesia',
    'Iranian': 'Iran',
    'Iraqi': 'Iraq',
    'Irish': 'Ireland',
    'Israeli': 'Israel',
    'Italian': 'Italy',
    'Ivorian': 'Ivory Coast',
    'Jamaican': 'Jamaica',
    'Japanese': 'Japan',
    'Jordanian': 'Jordan',
    'Kazakhstani': 'Kazakhstan',
    'Kenyan': 'Kenya',
    'Kuwaiti': 'Kuwait',
    'Kyrgyz': 'Kyrgyzstan',
    'Laotian': 'Laos',
    'Latvian': 'Latvia',
    'Lebanese': 'Lebanon',
    'Liberian': 'Liberia',
    'Libyan': 'Libya',
    'Liechtensteiner': 'Liechtenstein',
    'Lithuanian': 'Lithuania',
    'Luxembourger': 'Luxembourg',
    'Macedonian': 'North Macedonia',
    'Malagasy': 'Madagascar',
    'Malawian': 'Malawi',
    'Malaysian': 'Malaysia',
    'Maldivian': 'Maldives',
    'Malian': 'Mali',
    'Maltese': 'Malta',
    'Marshallese': 'Marshall Islands',
    'Mauritanian': 'Mauritania',
    'Mauritian': 'Mauritius',
    'Mexican': 'Mexico',
    'Micronesian': 'Micronesia',
    'Moldovan': 'Moldova',
    'Monacan': 'Monaco',
    'Mongolian': 'Mongolia',
    'Montenegrin': 'Montenegro',
    'Moroccan': 'Morocco',
    'Mosotho': 'Lesotho',
    'Motswana': 'Botswana',
    'Mozambican': 'Mozambique',
    'Namibian': 'Namibia',
    'Nauruan': 'Nauru',
    'Nepalese': 'Nepal',
    'Dutch': 'Netherlands',
    'New Zealander': 'New Zealand',
    'Nicaraguan': 'Nicaragua',
    'Nigerien': 'Niger',
    'Nigerian': 'Nigeria',
    'North Korean': 'North Korea',
    'Norwegian': 'Norway',
    'Omani': 'Oman',
    'Pakistani': 'Pakistan',
    'Palauan': 'Palau',
    'Panamanian': 'Panama',
    'Papua New Guinean': 'Papua New Guinea',
    'Paraguayan': 'Paraguay',
    'Peruvian': 'Peru',
    'Filipino': 'Philippines',
    'Polish': 'Poland',
    'Portuguese': 'Portugal',
    'Qatari': 'Qatar',
    'Romanian': 'Romania',
    'Russian': 'Russia',
    'Rwandan': 'Rwanda',
    'Saint Lucian': 'Saint Lucia',
    'Salvadoran': 'El Salvador',
    'Samoan': 'Samoa',
    'San Marinese': 'San Marino',
    'Sao Tomean': 'Sao Tome and Principe',
    'Saudi': 'Saudi Arabia',
    'Scottish': 'Scotland',
    'Senegalese': 'Senegal',
    'Serbian': 'Serbia',
    'Seychellois': 'Seychelles',
    'Sierra Leonean': 'Sierra Leone',
    'Singaporean': 'Singapore',
    'Slovak': 'Slovakia',
    'Slovenian': 'Slovenia',
    'Solomon Islander': 'Solomon Islands',
    'Somali': 'Somalia',
    'South African': 'South Africa',
    'Korean': 'Korea',
    'South Sudanese': 'South Sudan',
    'Spanish': 'Spain',
    'Sri Lankan': 'Sri Lanka',
    'Sudanese': 'Sudan',
    'Surinamer': 'Suriname',
    'Swazi': 'Eswatini',
    'Swedish': 'Sweden',
    'Swiss': 'Switzerland',
    'Syrian': 'Syria',
    'Taiwanese': 'Taiwan',
    'Tajik': 'Tajikistan',
    'Tanzanian': 'Tanzania',
    'Thai': 'Thailand',
    'Togolese': 'Togo',
    'Tongan': 'Tonga',
    'Trinidadian or Tobagonian': 'Trinidad and Tobago',
    'Tunisian': 'Tunisia',
    'Turkish': 'Turkey',
    'Turkmen': 'Turkmenistan',
    'Tuvaluan': 'Tuvalu',
    'Ugandan': 'Uganda',
    'Ukrainian': 'Ukraine',
    'Emirati': 'United Arab Emirates',
    'British': 'United Kingdom',
    'American': 'United States',
    'Uruguayan': 'Uruguay',
    'Uzbekistani': 'Uzbekistan',
    'Vanuatuan': 'Vanuatu',
    'Venezuelan': 'Venezuela',
    'Vietnamese': 'Vietnam',
    'Welsh': 'Wales',
    'Yemenite': 'Yemen',
    'Zambian': 'Zambia',
    'Zimbabwean': 'Zimbabwe',
}
    targets = [nation_mapping.get(target, target) for target in targets]

    targets = [nation_mapping.get(target, target) for target in targets if target.lower() not in ['hackers', 'attacker', 'attackers']]

    entry['target'] = targets

    target_type = re.search(r"(embassies?|governments?|companies?|networks?|ship)\b", entry['description'])
    entry['target-type'] = target_type.group(0) if target_type else ""
    
    attack_types = re.findall(r"exploit|malware|phish|cyberattack|espionage|breach|malware", entry['description'])
    attack_types = ['phish' if attack_type in ['phish'] else attack_type for attack_type in attack_types]
    entry['attack-type'] = list(set(attack_types))
    
    damage_types = re.findall(r"data|information|infrastructure|denial-of-service|DOS|DDOS|denial of service", entry['description'])
    damage_types = ['denial-of-service' if damage_type.lower() in ['dos', 'ddos', 'denial of service'] else damage_type for damage_type in damage_types]
    entry['damage-type'] = list(set(damage_types))

    data.append(entry)

json_data = json.dumps(data, indent=4)
with open('output.json', 'w') as file:
    file.write(json_data)

print("Data saved to output.json")
