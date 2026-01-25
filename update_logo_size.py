import re
import os

filepath = r'c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_apps_luxury\resources\anclora_data_lab.html'

if not os.path.exists(filepath):
    print(f"File not found: {filepath}")
    exit(1)

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fix the footer logo image tag - remove inline style and add class
# The inline style was added in Step 1098: style="height: 48px; object-fit: contain;"
content = content.replace('style="height: 48px; object-fit: contain;"', 'class="footer-logo"')

# 2. Update the .footer-logo CSS to 60px (bigger than 48px, but smaller than 80px)
# User said "half as small as header (80px)" bit they also said "BIGGER than current (48px)".
# 60px is a good balance and looks like a prominent signature.
content = re.sub(r'(\.footer-logo \{[^}]*height: )\d+px', r'\g<1>60px', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Footer logo size updated to 60px and class applied.")
