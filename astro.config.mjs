// @ts-check
import { defineConfig } from 'astro/config';

// Sitio estático: `npm run build` genera dist/ con un .html por página (index, estudio, artistas, reservar, 404).
// Vercel lo sirve con direcciones limpias (/estudio), ver vercel.json.
export default defineConfig({
  site: 'https://kame-house-studio.vercel.app',
  trailingSlash: 'never',
  build: { format: 'file' },
  devToolbar: { enabled: false },
});
