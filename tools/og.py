"""Genera assets/brand/og.jpg (1200 x 630) a partir de tools/og.html con Chrome sin ventana.

    python tools/og.py
"""
import os
import subprocess
import tempfile
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
CHROME = [
    r'C:\Program Files\Google\Chrome\Application\chrome.exe',
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'google-chrome',
]
chrome = next((c for c in CHROME if os.path.exists(c)), CHROME[-1])
png = Path(tempfile.gettempdir()) / 'kh-og.png'
subprocess.run([chrome, '--headless=new', '--hide-scrollbars', '--force-device-scale-factor=1',
                '--window-size=1200,630', '--virtual-time-budget=6000', f'--screenshot={png}',
                (ROOT / 'tools' / 'og.html').as_uri()], check=True, capture_output=True)
out = ROOT / 'assets' / 'brand' / 'og.jpg'
Image.open(png).convert('RGB').crop((0, 0, 1200, 630)).save(out, 'JPEG', quality=90, optimize=True, progressive=True)
print(out, out.stat().st_size // 1024, 'KB')
