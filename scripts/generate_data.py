import json
import os

def generate_data():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(base_dir, 'data', 'articles.json')
    js_path = os.path.join(base_dir, 'scripts', 'data.js')

    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    js_content = "/**\n * THACHVULAND DATA STORE\n * Generated automatically from data/articles.json\n */\n\n"
    
    js_content += f"const projectData = {json.dumps(data.get('projectData', []), indent=4, ensure_ascii=False)};\n\n"
    js_content += f"const newsData = {json.dumps(data.get('newsData', []), indent=4, ensure_ascii=False)};\n"

    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Successfully generated {js_path}")

if __name__ == "__main__":
    generate_data()
