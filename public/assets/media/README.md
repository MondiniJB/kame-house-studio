# Imágenes

Imágenes que usa el sitio. Son portadas de artistas y capturas de reels del Instagram del estudio (`@estudiokamehouse`): material de terceros usado con fines académicos en un proyecto de tesis, sin fines comerciales. Los derechos pertenecen a sus autores.

Los originales en JPG están en `originales/`, en la raíz del repo, y no se publican. El sitio usa versiones WebP generadas con `python tools/imagenes.py`, en varios anchos para que cada pantalla baje solo el tamaño que necesita (`nombre-800.webp`, `nombre-1280.webp`...). Si se cambia o se suma una foto, se pone el JPG en `originales/` y se vuelve a correr el script.

Originales (portadas cuadradas de 720 px, reels de unos 454×723 px):

| Archivo | Qué es |
|---|---|
| `teca-rmx.jpg` | Portada de TECA RMX (Asan) |
| `cinema.jpg` | Portada de Cinema (Bhavi) |
| `debo-cambiar.jpg` | Portada de Debo cambiar (Asan x Khea) |
| `serotonina.jpg` | Portada de Serotonina (Khea) |
| `trapicheo.jpg` | Portada de Trapicheo "El Don" (Khea) |
| `pochoclos.jpg` | Portada de Pochoclos (Bhavi) |
| `neo.jpg` | Portada de Neo (Neo Pistea) |
| `reel-teca.jpg` | Reel "TECA remix" |
| `reel-consejo.jpg` | Reel "Consejo N4" |
| `mariano.jpg` | Recorte de `reel-consejo.jpg` sin el título ni las vistas, para `/estudio` |
| `reel-sesion.jpg` | Reel "En sesión" |
| `reel-sala.jpg` | Reel "La sala" |
| `reel-ysy.jpg` | Reel "Cuando entra YSY A" (en la tarjeta: "Entra YSY A") |
| `hero-estudio.jpg` | Foto de la sala del Instagram del estudio (1440 × 1440) |
| `merch-chomba.jpg` | Mockup de la chomba (anexo de la tesis), recortado |
| `merch-chomba-tecnico.jpg` | Dibujo técnico de la chomba: frente, espalda y costados |
| `merch-stickers.jpg` | Mockup del paquete de stickers |
| `merch-mouse-pad.jpg` | Mockup del mouse pad (anexo de la tesis), entero y con margen |
| `merch-cd.jpg` | Tapa del CD "Archive" (anexo de la tesis), entera y con margen |
| `merch-cd-trasera.jpg` | Contratapa del CD "Archive", recortada del mismo mockup |
| `onda-sonido.jpg` | Onda de sonido, textura de las portadas de `/reservar` y `/artistas` (la misma que usa el tríptico) |
| `svc-grabacion.jpg` | Artista grabando, foto de referencia que se usó en las piezas de la tesis |

## Fotos de artistas

Fotos de perfil para `/artistas`, con el nombre `art-<nombre>.jpg` (por ejemplo `art-khea.jpg`): verticales 4:5 y de 720 px de ancho o más, porque el script genera las versiones de 360 y 720. Después de correr el script, se anota cada una en `KH.FOTOS` (`public/js/data.js`). Si la foto tiene licencia que pide atribución, el crédito va en esta tabla.

| Archivo | Fuente y crédito |
|---|---|
| `art-asan.jpg` | Foto de prensa (llegó en 600 px, se amplió a 720) |
| `art-bhavi.jpg` | Foto de prensa |
| `art-feid.jpg` | Foto de recital |
| `art-j-rei.jpg` | Foto de prensa (recorte de 640 px, se amplió a 720) |
| `art-khea.jpg` | Foto de prensa |
| `art-midel.jpg` | Foto de prensa |
| `art-neo-pistea.jpg` | Foto de prensa |
| `art-skrillex.jpg` | Foto de prensa |
| `art-taichu.jpg` | Foto de prensa |
| `art-ysy-a.jpg` | Foto de prensa (llegó en 561 px de ancho al recortarla, se amplió a 720) |
| `art-zecca.jpg` | Foto de prensa (Latin Grammy 2023) |

## Fotos de stock (Pexels)

Fotos de [Pexels](https://www.pexels.com) bajo la licencia de Pexels (uso libre, sin atribución obligatoria). Ilustran el estudio y el merch hasta tener fotos propias: no muestran la sala ni los productos reales.

| Archivo | Foto en Pexels |
|---|---|
| `cierre-estudio.jpg` | https://www.pexels.com/photo/13978776/ |
| `svc-mezcla.jpg` | https://www.pexels.com/photo/7586137/ |
| `svc-mastering.jpg` | https://www.pexels.com/photo/2651794/ |
| `svc-produccion.jpg` | https://www.pexels.com/photo/4988139/ |
| `svc-sala.jpg` | https://www.pexels.com/photo/8198136/ |
| `estudio-sala.jpg` | https://www.pexels.com/photo/8198136/ (la misma foto que `svc-sala.jpg`) |

