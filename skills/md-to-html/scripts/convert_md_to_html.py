import os
import sys
import markdown
import argparse

# Premium CSS for the HTML output
STYLE = """
<style>
    :root {
        --primary-color: #003366;
        --secondary-color: #f4f4f4;
        --text-color: #333;
        --accent-color: #c5a059;
    }
    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        line-height: 1.6;
        color: var(--text-color);
        max-width: 800px;
        margin: 40px auto;
        padding: 20px;
        background-color: #fff;
    }
    h1, h2, h3 {
        color: var(--primary-color);
        margin-top: 1.5em;
    }
    h1 {
        border-bottom: 2px solid var(--accent-color);
        padding-bottom: 10px;
        font-size: 2.5em;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
    }
    th {
        background-color: var(--primary-color);
        color: white;
    }
    tr:nth-child(even) {
        background-color: var(--secondary-color);
    }
    blockquote {
        border-left: 5px solid var(--accent-color);
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #fafafa;
        font-style: italic;
    }
    code {
        background-color: #f4f4f4;
        padding: 2px 4px;
        border-radius: 4px;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    }
    pre {
        background-color: #1e1e1e;
        color: #d4d4d4;
        padding: 15px;
        border-radius: 8px;
        overflow-x: auto;
    }
    pre code {
        background-color: transparent;
        color: inherit;
        padding: 0;
    }
    img {
        max-width: 100%;
        height: auto;
    }
    hr {
        border: 0;
        border-top: 1px solid #ddd;
        margin: 30px 0;
    }
</style>
"""

def convert_md_to_html(input_path, output_path=None):
    if not output_path:
        output_path = os.path.splitext(input_path)[0] + ".html"
    
    with open(input_path, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert markdown to html with common extensions
    html_content = markdown.markdown(md_content, extensions=['extra', 'tables', 'toc'])
    
    full_html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{os.path.basename(input_path)}</title>
    {STYLE}
</head>
<body>
    {html_content}
</body>
</html>
"""
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(full_html)
    
    print(f"Conversion complete: {input_path} -> {output_path}")
    return output_path

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert Markdown to Professional HTML")
    parser.add_argument("input", help="Input Markdown file")
    parser.add_argument("output", nargs="?", help="Output HTML file (optional)")
    
    args = parser.parse_args()
    
    if os.path.isfile(args.input):
        convert_md_to_html(args.input, args.output)
    else:
        print(f"Error: File {args.input} not found.")
        sys.exit(1)
