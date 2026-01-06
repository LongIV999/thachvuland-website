import os
import subprocess
import glob

def convert_to_webp():
    # Directories to search for images
    search_dirs = [
        'mat bang mau',
        'images',
        'tests'
    ]
    
    extensions = ['*.jpg', '*.jpeg', '*.png']
    
    for search_dir in search_dirs:
        if not os.path.exists(search_dir):
            continue
            
        print(f"Scanning directory: {search_dir}")
        for ext in extensions:
            # Use recursive glob for subdirectories
            files = glob.glob(os.path.join(search_dir, '**', ext), recursive=True)
            
            for file_path in files:
                if '.webp' in file_path:
                    continue
                    
                output_path = os.path.splitext(file_path)[0] + '.webp'
                
                print(f"Converting {file_path} to {output_path}...")
                try:
                    # cwebp -q 80 input -o output
                    subprocess.run(['cwebp', '-q', '80', file_path, '-o', output_path], check=True, capture_output=True)
                except subprocess.CalledProcessError as e:
                    print(f"Failed to convert {file_path}: {e}")
                except FileNotFoundError:
                    print("cwebp not found. Please install it with 'brew install webp'")
                    return

if __name__ == "__main__":
    convert_to_webp()
