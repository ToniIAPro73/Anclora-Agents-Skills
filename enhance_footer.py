import re
import os

filepath = r'c:\Users\Usuario\Workspace\01_Proyectos\Anclora-Agents-Skills\creador_apps_luxury\resources\anclora_data_lab.html'

if not os.path.exists(filepath):
    print(f"File not found: {filepath}")
    exit(1)

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Footer Logo CSS for higher visibility and header-like polish
footer_css = """
        .footer-logo {
            height: 52px;
            object-fit: contain;
            opacity: 0.85;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            filter: brightness(1.1);
            cursor: pointer;
        }
        .footer-logo:hover {
            opacity: 1;
            filter: brightness(1.2) drop-shadow(0 0 15px rgba(197, 160, 89, 0.5));
            transform: translateY(-2px) scale(1.02);
        }
        .footer-legal-links a {
            opacity: 0.8 !important;
            font-weight: 600 !important;
            letter-spacing: 1px !important;
            color: var(--anclora-white) !important;
            font-size: 11px !important;
            text-transform: uppercase !important;
            transition: var(--transition);
        }
        .footer-legal-links a:hover {
            opacity: 1 !important;
            color: var(--anclora-gold) !important;
        }
        .legal-disclaimer {
            opacity: 0.65 !important;
            font-size: 12px !important;
            line-height: 1.8 !important;
            color: rgba(255,255,255,0.9) !important;
            text-shadow: 0 1px 2px rgba(0,0,0,0.5);
            max-width: 800px;
            margin: 30px auto !important;
        }
        .copyright {
            opacity: 0.8 !important;
            letter-spacing: 2px !important;
            font-weight: 500 !important;
            font-size: 10px !important;
            color: var(--anclora-gold) !important;
            text-transform: uppercase;
        }
"""

# Replace old CSS if exists or append
if ".footer-logo {" in content:
    # Use regex to replace the old block
    content = re.sub(r'\.footer-logo \{.*?\.(copyright \{.*?\})' , footer_css, content, flags=re.DOTALL)
else:
    content = content.replace('</style>', footer_css + '\n    </style>')

# 2. Add some missing hover effect for consistency in header links if not there
# (The user might have perceived a "header effect" that was actually just high contrast)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Footer logo and text sharpness enhancements applied.")
