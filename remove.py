#!/usr/bin/env python3
"""
Enhanced script to remove comments from .vue and .ts/.tsx files.
Handles:
- JavaScript/TypeScript comments (// and /* */)
- HTML comments (<!-- -->)
- CSS comments (/* */)
- Preserves strings, regex, and URLs
Use with caution and review changes carefully.
"""
import os
import re
import sys
from pathlib import Path
from typing import Tuple

def remove_js_comments(code: str) -> str:
    """
    Remove JavaScript/TypeScript comments while preserving strings and regex.
    Uses a state machine approach to handle edge cases better.
    """
    result = []
    i = 0
    length = len(code)
    
    while i < length:
        # Check for strings (single and double quotes)
        if code[i] in ('"', "'"):
            quote = code[i]
            result.append(code[i])
            i += 1
            # Copy string content including escape sequences
            while i < length:
                if code[i] == '\\' and i + 1 < length:
                    result.append(code[i:i+2])
                    i += 2
                elif code[i] == quote:
                    result.append(code[i])
                    i += 1
                    break
                else:
                    result.append(code[i])
                    i += 1
            continue
        
        # Check for template literals
        if code[i] == '`':
            result.append(code[i])
            i += 1
            while i < length:
                if code[i] == '\\' and i + 1 < length:
                    result.append(code[i:i+2])
                    i += 2
                elif code[i] == '`':
                    result.append(code[i])
                    i += 1
                    break
                else:
                    result.append(code[i])
                    i += 1
            continue
        
        # Check for single-line comment FIRST (before regex check)
        if i + 1 < length and code[i:i+2] == '//':
            # Skip until end of line
            while i < length and code[i] != '\n':
                i += 1
            if i < length:
                result.append('\n')  # Keep the newline
                i += 1
            continue
        
        # Check for multi-line comment
        if i + 1 < length and code[i:i+2] == '/*':
            # Skip until */
            i += 2
            while i + 1 < length:
                if code[i:i+2] == '*/':
                    i += 2
                    break
                i += 1
            continue
        
        # Check for regex literals (simplified detection)
        if code[i] == '/' and i > 0:
            # Look back to see if this could be a regex
            prev_tokens = ['=', '(', '[', ',', ':', ';', '!', '&', '|', '?', '+', '-', '*', '%', '^', '~', '{', '\n', 'return']
            j = i - 1
            while j >= 0 and code[j] in (' ', '\t'):
                j -= 1
            
            # Check if preceded by valid regex context
            is_regex_context = False
            if j >= 0:
                if code[j] in prev_tokens:
                    is_regex_context = True
                # Check for 'return' keyword
                elif j >= 5 and code[j-5:j+1] == 'return':
                    is_regex_context = True
            
            if is_regex_context:
                # Likely a regex
                result.append(code[i])
                i += 1
                while i < length:
                    if code[i] == '\\' and i + 1 < length:
                        result.append(code[i:i+2])
                        i += 2
                    elif code[i] == '/':
                        result.append(code[i])
                        i += 1
                        # Handle regex flags
                        while i < length and code[i] in 'gimsuvy':
                            result.append(code[i])
                            i += 1
                        break
                    elif code[i] == '\n':
                        break
                    else:
                        result.append(code[i])
                        i += 1
                continue
        
        # Check for single-line comment
        if i + 1 < length and code[i:i+2] == '//':
            # Skip until end of line
            while i < length and code[i] != '\n':
                i += 1
            if i < length:
                result.append('\n')  # Keep the newline
                i += 1
            continue
        
        # Check for multi-line comment
        if i + 1 < length and code[i:i+2] == '/*':
            # Skip until */
            i += 2
            while i + 1 < length:
                if code[i:i+2] == '*/':
                    i += 2
                    break
                i += 1
            continue
        
        # Regular character
        result.append(code[i])
        i += 1
    
    return ''.join(result)

def remove_html_comments(html: str) -> str:
    """Remove HTML comments (<!-- -->)."""
    # Remove HTML comments, but be careful with conditional comments
    return re.sub(r'<!--(?!\[if).*?-->', '', html, flags=re.DOTALL)

def remove_css_comments(css: str) -> str:
    """Remove CSS comments (/* */)."""
    result = []
    i = 0
    length = len(css)
    
    while i < length:
        # Check for strings
        if css[i] in ('"', "'"):
            quote = css[i]
            result.append(css[i])
            i += 1
            while i < length:
                if css[i] == '\\' and i + 1 < length:
                    result.append(css[i:i+2])
                    i += 2
                elif css[i] == quote:
                    result.append(css[i])
                    i += 1
                    break
                else:
                    result.append(css[i])
                    i += 1
            continue
        
        # Check for CSS comment
        if i + 1 < length and css[i:i+2] == '/*':
            i += 2
            while i + 1 < length:
                if css[i:i+2] == '*/':
                    i += 2
                    break
                i += 1
            continue
        
        result.append(css[i])
        i += 1
    
    return ''.join(result)

def process_vue_file(file_path: str) -> None:
    """Process a .vue file, removing comments from all sections."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Process <template> blocks - remove HTML comments
        def replace_template(match):
            start, template_content, end = match.groups()
            cleaned = remove_html_comments(template_content)
            return f'{start}{cleaned}{end}'
        
        content = re.sub(
            r'(<template[^>]*>)(.*?)(</template>)',
            replace_template,
            content,
            flags=re.DOTALL | re.IGNORECASE
        )
        
        # Process <script> blocks - remove JS/TS comments
        def replace_script(match):
            start, script_content, end = match.groups()
            cleaned = remove_js_comments(script_content)
            return f'{start}{cleaned}{end}'
        
        content = re.sub(
            r'(<script[^>]*>)(.*?)(</script>)',
            replace_script,
            content,
            flags=re.DOTALL | re.IGNORECASE
        )
        
        # Process <style> blocks - remove CSS comments
        def replace_style(match):
            start, style_content, end = match.groups()
            cleaned = remove_css_comments(style_content)
            return f'{start}{cleaned}{end}'
        
        content = re.sub(
            r'(<style[^>]*>)(.*?)(</style>)',
            replace_style,
            content,
            flags=re.DOTALL | re.IGNORECASE
        )
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Processed: {file_path}")
        else:
            print(f"  Skipped (no comments): {file_path}")
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")

def process_ts_file(file_path: str) -> None:
    """Process a TypeScript/JavaScript file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = remove_js_comments(content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Processed: {file_path}")
        else:
            print(f"  Skipped (no comments): {file_path}")
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")

def should_ignore(path: Path) -> bool:
    """Check if path should be ignored."""
    ignore_dirs = {
        '.git', 'node_modules', '.nuxt', 'dist', 'build', 
        '.next', '.output', 'coverage', '.vscode', '.idea',
        '__pycache__', '.pytest_cache'
    }
    ignore_files = {
        '.gitignore', 'package.json', 'package-lock.json',
        'tsconfig.json', 'biome.json', 'yarn.lock', 'pnpm-lock.yaml'
    }
    
    for part in path.parts:
        if part in ignore_dirs:
            return True
    
    if path.name in ignore_files:
        return True
    
    return False

def main():
    if len(sys.argv) != 2:
        print("Usage: python remove_comments.py <directory>")
        print("\nThis script will remove:")
        print("  • JavaScript/TypeScript comments (// and /* */)")
        print("  • HTML comments (<!-- -->)")
        print("  • CSS comments (/* */)")
        print("\nFrom .vue, .ts, and .tsx files")
        sys.exit(1)
    
    root_dir = Path(sys.argv[1])
    
    if not root_dir.is_dir():
        print(f"Error: {root_dir} is not a directory")
        sys.exit(1)
    
    print(f"Scanning directory: {root_dir}")
    print("=" * 60)
    
    processed_count = 0
    
    for file_path in root_dir.rglob('*'):
        if not file_path.is_file():
            continue
            
        if should_ignore(file_path):
            continue
        
        if file_path.suffix in ['.ts', '.tsx', '.js', '.jsx']:
            process_ts_file(str(file_path))
            processed_count += 1
        elif file_path.suffix == '.vue':
            process_vue_file(str(file_path))
            processed_count += 1
    
    print("=" * 60)
    print(f"✓ Complete! Processed {processed_count} files.")
    print("\n⚠️  IMPORTANT: Please review all changes before committing!")
    print("   Use 'git diff' to inspect modifications.")

if __name__ == '__main__':
    main()
