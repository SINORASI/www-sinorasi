import json
import os
from pathlib import Path
from typing import List, Dict, Any

def scan_directory(root_path: str = ".") -> List[Dict[str, Any]]:
    """Scan current directory and extract business partner info."""
    businesses = []
    
    # Get all directories in the current path
    root = Path(root_path)
    
    for item in sorted(root.iterdir()):
        if not item.is_dir():
            continue
            
        dir_name = item.name
        
        # Skip directories that start with "LOGO" (case-insensitive)
        if dir_name.upper().startswith('LOGO'):
            continue
            
        # Skip hidden directories and common system directories
        if dir_name.startswith('.') or dir_name in ['__pycache__', 'node_modules']:
            continue
        
        # Find image files in this directory
        images = []
        image_extensions = {'.jpg', '.jpeg', '.png', '.svg', 
                           '.webp', '.gif', '.avif', '.bmp'}
        
        try:
            for file in item.iterdir():
                if file.is_file():
                    if file.suffix.lower() in image_extensions:
                        file_stat = file.stat()
                        images.append({
                            'filename': file.name,
                            'path': str(file),
                            'size': file_stat.st_size,
                            'extension': file.suffix[1:]  # Remove the dot
                        })
        except PermissionError:
            # Skip directories we can't access
            continue
        
        # Only add businesses that have images
        if images:
            businesses.append({
                'business_name': dir_name,
                'images': images
            })
    
    return businesses

def create_json_output(businesses: List[Dict[str, Any]], 
                       output_file: str = 'business_partners.json') -> None:
    """Create formatted JSON output and save to file."""
    # Sort by business name
    businesses.sort(key=lambda x: x['business_name'])
    
    output = {
        'total_partners': len(businesses),
        'generated_at': Path.cwd().as_posix(),
        'business_partners': businesses
    }
    
    # Write to file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    
    print(f"✓ Generated {output_file} with {len(businesses)} business partners")
    print(f"✓ Total images: {sum(len(b['images']) for b in businesses)}")
    
    # Also print to console
    print("\nPreview:")
    print(json.dumps(output, indent=2, ensure_ascii=False)[:500] + "...")

# Main script
if __name__ == '__main__':
    print("Scanning current directory for business partners...")
    print(f"Working directory: {Path.cwd()}")
    print("-" * 60)
    
    # Scan the current directory
    businesses = scan_directory(".")
    
    # Create JSON output
    create_json_output(businesses)
    
    # Print summary
    print("\nBusiness Partners Found:")
    for business in businesses:
        print(f"  - {business['business_name']}: {len(business['images'])} image(s)")