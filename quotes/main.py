import csv
import re
from pathlib import Path
from difflib import SequenceMatcher

def clean_name(name):
    """Clean name but keep more info for contains matching"""
    # Remove only punctuation and extra spaces, keep case for display
    return re.sub(r'\s+', ' ', name.strip())

def normalize_for_matching(name):
    """Normalize for case-insensitive matching"""
    # Remove degrees and punctuation for matching
    name = re.sub(
        r',?\s*(S\.|M\.|Dr\.|Drs\.|Dra\.|ST|S\.Pd|S\.Kom|S\.Sn|S\.Si|S\.Psi|S\.PdI|S\.AP|S\.S|S\.Ag|S\.Pd\.H|A\.Md|A\.Md\.T|M\.Pd|Gr|SE|H\.|Hj\.)\.?',
        '',
        name,
        flags=re.IGNORECASE
    )
    # Remove punctuation and convert to lowercase
    return re.sub(r'[,.\s]+', '', name.lower()).strip()

def read_csv_file(filepath):
    """Read and parse CSV file"""
    records = []
    
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            for row in reader:
                name = row.get('Nama Lengkap Bapak/Ibu Guru Karyawan Beserta Gelar', '').strip()
                quote = row.get('Kata-kata motivasi', '').strip()
                
                if name and quote:
                    records.append({
                        'original_name': name,
                        'normalized_name': normalize_for_matching(name),
                        'quote': quote
                    })
        
        return records
        
    except FileNotFoundError:
        print(f"Error: File '{filepath}' not found")
        return []
    except Exception as e:
        print(f"Error reading file: {e}")
        return []

def escape_quote_for_js(quote):
    """Escape quote string for JavaScript/JSON"""
    quote = quote.replace('\\', '\\\\')
    quote = quote.replace('"', '\\"')
    quote = quote.replace('\n', '\\n')
    quote = quote.replace('\r', '\\r')
    return quote

def find_best_match(teacher_name, csv_records):
    """Find best matching quote using contains matching"""
    teacher_normalized = normalize_for_matching(teacher_name)
    
    # First: Try exact match
    for record in csv_records:
        if teacher_normalized == record['normalized_name']:
            return record, 'exact'
    
    # Second: Try contains match (teacher name contains CSV name)
    for record in csv_records:
        csv_normalized = record['normalized_name']
        if csv_normalized in teacher_normalized or teacher_normalized in csv_normalized:
            return record, 'contains'
    
    # Third: Try word-by-word matching
    teacher_words = set(teacher_normalized.split())
    for record in csv_records:
        csv_words = set(record['normalized_name'].split())
        # If all CSV words are in teacher name (or vice versa with at least 2 words match)
        if csv_words and teacher_words:
            common = teacher_words & csv_words
            if len(common) >= min(len(csv_words), len(teacher_words)):
                return record, 'words'
    
    # Fourth: Try similarity matching
    best_match = None
    best_ratio = 0.7  # Threshold
    
    for record in csv_records:
        ratio = SequenceMatcher(None, teacher_normalized, record['normalized_name']).ratio()
        if ratio > best_ratio:
            best_ratio = ratio
            best_match = record
    
    if best_match:
        return best_match, f'similar({best_ratio:.2f})'
    
    return None, None

def update_vue_file(vue_file_path, csv_records):
    """Update Vue file with quotes using contains matching"""
    try:
        with open(vue_file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        original_content = content
        updated_count = 0
        not_found = []
        match_types = {'exact': 0, 'contains': 0, 'words': 0, 'similar': 0}
        
        # Pattern to match teacher objects
        teacher_pattern = r'(\{[^{}]*?"id":\s*"[^"]*?"[^{}]*?"name":\s*"([^"]+)"[^{}]*?"degree":[^{}]*?"image":[^{}]*?"university":[^{}]*?"quote":\s*")([^"]*?)("[\s\S]*?\})'
        
        def replace_quote(match):
            nonlocal updated_count, not_found
            
            prefix = match.group(1)
            teacher_name = match.group(2)
            old_quote = match.group(3)
            suffix = match.group(4)
            
            if not teacher_name.strip():
                return match.group(0)
            
            # Find best matching quote
            matched_record, match_type = find_best_match(teacher_name, csv_records)
            
            if matched_record:
                new_quote = escape_quote_for_js(matched_record['quote'])
                updated_count += 1
                
                # Track match type
                if match_type.startswith('similar'):
                    match_types['similar'] += 1
                elif match_type in match_types:
                    match_types[match_type] += 1
                
                print(f"✓ Updated [{match_type:8}]: {teacher_name}")
                if match_type != 'exact':
                    print(f"              <- CSV: {matched_record['original_name']}")
                
                return f"{prefix}{new_quote}{suffix}"
            else:
                not_found.append(teacher_name)
                print(f"✗ Not found: {teacher_name}")
                return match.group(0)
        
        # Replace all teacher quotes
        updated_content = re.sub(teacher_pattern, replace_quote, content)
        
        if updated_content == original_content:
            print("Warning: No changes were made to the file")
            return False
        
        # Create backup
        backup_path = vue_file_path + '.backup'
        with open(backup_path, 'w', encoding='utf-8') as file:
            file.write(original_content)
        print(f"\n✓ Backup created: {backup_path}")
        
        # Write updated content
        with open(vue_file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
        
        print(f"\n{'='*60}")
        print(f"Summary:")
        print(f"  Total updated: {updated_count}")
        print(f"  Match types:")
        print(f"    - Exact matches: {match_types['exact']}")
        print(f"    - Contains matches: {match_types['contains']}")
        print(f"    - Word matches: {match_types['words']}")
        print(f"    - Similarity matches: {match_types['similar']}")
        print(f"  Not found: {len(not_found)}")
        
        if not_found:
            print(f"\nTeachers not found in CSV:")
            for name in not_found:
                print(f"  - {name}")
        
        # Show unmatched CSV records
        matched_normalized = set()
        teacher_names = re.findall(r'"name":\s*"([^"]+)"', content)
        for teacher_name in teacher_names:
            matched_record, _ = find_best_match(teacher_name, csv_records)
            if matched_record:
                matched_normalized.add(matched_record['normalized_name'])
        
        unmatched_csv = [r for r in csv_records if r['normalized_name'] not in matched_normalized]
        if unmatched_csv:
            print(f"\nQuotes in CSV not matched to any teacher:")
            for record in unmatched_csv:
                print(f"  - {record['original_name']}")
        
        return True
        
    except Exception as e:
        print(f"Error updating Vue file: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    csv_file = "teachers_quotes.csv"
    vue_file = "/home/mochraiyan/dev/www-sinorasi/app/pages/informasi/guru.vue"
    
    print(f"Reading CSV file: {csv_file}")
    csv_records = read_csv_file(csv_file)
    
    if not csv_records:
        print("No valid records found in CSV file")
        return
    
    print(f"Found {len(csv_records)} records in CSV\n")
    
    print(f"Updating Vue file: {vue_file}")
    print(f"{'='*60}\n")
    
    success = update_vue_file(vue_file, csv_records)
    
    if success:
        print(f"\n✓ Vue file updated successfully!")
        print(f"  Original backed up to: {vue_file}.backup")
    else:
        print(f"\n✗ Failed to update Vue file")

if __name__ == "__main__":
    main()