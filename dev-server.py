"""Servidor local con direcciones limpias, igual que en Vercel (cleanUrls).

    python dev-server.py          -> http://localhost:4250
    python dev-server.py 8000     -> http://localhost:8000

/reservar sirve reservar.html, /estudio sirve estudio.html, / sirve index.html.
No guarda caché, así el navegador siempre toma los CSS y JS recién editados.
"""
import http.server
import os
import sys
from urllib.parse import urlsplit

ROOT = os.path.dirname(os.path.abspath(__file__))


class CleanUrls(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def send_head(self):
        parts = urlsplit(self.path)
        path = parts.path
        # /reservar -> /reservar.html si existe y no es una carpeta ni un archivo con extensión
        if path != '/' and not os.path.splitext(path)[1]:
            candidate = os.path.join(ROOT, path.strip('/').replace('/', os.sep) + '.html')
            if os.path.isfile(candidate):
                self.path = path.rstrip('/') + '.html' + ('?' + parts.query if parts.query else '')
        # lo que no existe muestra 404.html, como en Vercel
        if not os.path.exists(self.translate_path(self.path)):
            page = os.path.join(ROOT, '404.html')
            body = open(page, 'rb').read()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            from io import BytesIO
            return BytesIO(body)
        return super().send_head()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4250
    server = http.server.ThreadingHTTPServer(('127.0.0.1', port), CleanUrls)
    print(f'Kame House en http://localhost:{port}  (Ctrl+C para cortar)')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
