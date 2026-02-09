from docx import Document
import sys

def test_heading_style(path):
    doc = Document(path)
    try:
        s = doc.styles['Heading 1']
        print(f"Success: Found {s.name}")
    except KeyError as e:
        print(f"KeyError: {e}")
        print("Available styles (internal names):")
        for s in doc.styles:
            print(f" - {s.name}")

if __name__ == "__main__":
    test_heading_style(sys.argv[1])
