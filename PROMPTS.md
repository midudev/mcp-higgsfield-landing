# Prompts

Los prompts principales que usamos con Claude Code para montar la landing de Arko, en el orden en que se lanzaron (6 de octubre de 2026). No están los ajustes pequeños (header, CLS, alineaciones…).

## 0. Preparación

Configurar Higgsfield (CLI, login y skills):

```text
Configura Higgsfield por mí para que pueda generar imágenes y videos desde aquí.
1. Instala la CLI: ejecuta `npm i -g @higgsfield/cli`.
2. Autentícate: ejecuta `higgsfield auth login` y completa el inicio de sesión en el navegador que abre.
3. Instala las habilidades complementarias: ejecuta `npx skills add higgsfield-ai/skills`.
Una vez hecho, avísame cuando esté listo.
```

Fotos a WebP:

```text
Optimiza a .webp las imagenes que tengo en public/photos
```

Instalar la skill de diseño de landings:

```text
Instala esta skill como landing-page-design en este proyecto: https://github.com/elayadesign/ai-design-skills/blob/main/skills/landing-page-design/SKILL.md
```

Instalar el plugin de scroll-world:

```text
/plugin marketplace add oso95/scroll-world
/reload-plugins
```

## 1. Primera versión de la web (skill landing-page-design)

```text
Usa el skill landing-page-design. Vamos a crear la landing de Arko, un restaurante real de cocina nikkei en Barcelona. Como es un negocio real, usa solo los datos de este mensaje, de su web (arkorestaurant.com; compruébalos antes) y de las fotos: no inventes reseñas, premios, platos, precios ni cifras. Si falta algo, márcalo como pendiente.

Intake:
- Acción principal: reservar mesa en https://arkorestaurant.myrestoo.net/en/reservar
- Acción secundaria, solo más abajo: regalar una experiencia en https://www.arkorestaurant.com/es/regala/
- Oferta: Arko Short Experience, menú para 2 personas (sushi, starters, principal y postre), 150 €. Arko Full Experience, menú degustación completo para 2 personas, 11 pases, 250 €. Maridaje, selección de vinos armonizados, +100 €.
- Titular de su web: "Cocina japonesa con alma mediterránea".
- Texto de su web: "Un restaurante donde la disciplina japonesa dialoga con el producto mediterráneo y la herencia peruana. Sin concesiones: técnica nipona, ingredientes del mar y del mercado, sabor de Barcelona."
- Platos destacados: carpaccio de ventresca Bluefin trufado, kizami, wasabi y crema de aguacate; ostra con salsa ponzu de fruta de la pasión; nigiri Selección; picanha de Wagyu a la brasa, yuca frita y salsa tarí; gelato de lúcuma, sablé, nueces pecanas y caramelo salado.
- Prueba: arroz Koshihikari con vinagre de arroz rojo de una casa japonesa fundada en 1937; salmón y atún 100 % libres de anisakis, sin antibióticos ni hormonas; toda la soja que se sirve en sala es sin gluten.
- Datos: Carrer Enric Granados 63, 08008 Barcelona. Abierto de lunes a domingo de 13:00 a 00:00. +34 938 29 95 72. Instagram @arko.barcelona.
- Legal: enlaza sus páginas /es/legal/, /es/privacidad/, /es/cookies/ y /es/terminos-compra/ de arkorestaurant.com.
- Logo: https://www.arkorestaurant.com/logo.svg. Es un PNG dentro de un SVG: vectorízalo con potrace para que quede nítido y se pueda pintar con currentColor. Su A en arco será el favicon.
- Público (asumido): gente de Barcelona y visitantes que buscan una cena especial en el Eixample.
- Objeciones (asumidas): el precio, no saber qué es la cocina nikkei y las dudas con el pescado crudo o el gluten.
- Tráfico: Instagram y Google Maps.
- Tono: cálido, sereno y premium.
- Fotos, en public/photos/: 0-entrada.jpg a 5-barra-lateral.jpg son el recorrido; 6-vinos.jpg es el pasillo de vinos; photo-01.jpg a photo-27.jpg son platos, producto y cócteles. Usa solo los nombres de plato de la lista de destacados; las fotos de platos que no estén en ella, márcalas como pendientes de nombre.
- Diseño: tema oscuro minimal editorial sacado de las fotos. Fondo #131209, texto crema #f3eadb y naranja teja #d0703a solo como acento (el botón, teja con el texto oscuro). Óvalos y arcos como máscaras de imagen, espejos de borde orgánico como marcos y las espirales de arena de la barra como motivo.
- Tipografía: Hina Mincho para los titulares y Zen Kaku Gothic New para el texto, de Google Fonts, servidas en local y recortadas a latín. Queremos algo nipón pero elegante; es una excepción a tu lista de fuentes que pido yo expresamente. Sin cursivas ni negritas sintéticas.
- Prioridad móvil: sí.
- Layout: scroll world con las fotos del local. Vídeo vertical 9:16 fijado a la derecha a toda la altura, con la parte de arriba en arco, y el texto a la izquierda, un bloque por cada una de las seis paradas del recorrido. La cabecera es tu píldora flotante: alineada a la izquierda en escritorio, con el logo a la altura del texto, y centrada en móvil.

Stack: proyecto Astro ya creado con pnpm create astro@latest, con Tailwind, GSAP (ScrollTrigger), Lenis y sharp. Imágenes con <Picture> de astro:assets.

Antes de escribir código, mira las fotos de public/photos/ y devuélveme lo que pide tu Output format, más qué foto va en cada sección.
```

Respuesta a sus preguntas antes de que escribiera el código:

```text
Maridaje +100, enlace de reserva en /es. Usa la cita de El periódico. El vídeo lo generamos después, por ahora ignoralo. No borres los .webp, usalos para que cargue más rápido la web.
```

## 2. Diseño preparado para el scroll-world

```text
Prepara el diseño de la web para cuando tengamos un video (no lo crees ahora) para que haga scroll-world de fondo y vaya mostrando la información correcta. Quita lo del arco, mejor que sea rollo scroll-world y que sea como un paseo por el restaurante conforme vamos haciendo scroll y entonces el vídeo de fondo va avanzando o retrocediendo según la posición del video. Instala ya las dependencias que necesites (GSAP o Lenis, lo que tu veas). Para el diseño usa Tailwind.
```

## 3. Cuánto cuestan los vídeos

```text
Quiero hacer con Higgsfield un video en base a las imagenes que tengo en /photos que sirva de fondo para la landing page para cuando hagamos un scroll-world. Por ahora, dime costes y las mejores opciones de modelos para conseguirlo. Quiero que sea como una navegación entre fotografias, como una persona paseando por dentro del restaurante. No lo hagas, solo dame información.
```

```text
¿Me puedes dar los precios en un aproximado en $?
```

Respuesta resumida: un clip por cada par de fotos seguidas (la foto N como primer frame y la N+1 como último), 6 clips en total. Precio del recorrido completo con un solo intento por clip:

| Modelo | Créditos (6 clips de 5 s) | Aprox. en $ |
|---|---|---|
| Kling 3.0 (pro) | ~53 | 2–3 $ |
| MiniMax H3 (2K) | 60 | 2,3–3,3 $ |
| Wan 3.0 (1080p) | 105 | 4–6 $ |
| Seedance 2.0 (1080p) | 270 | 10–15 $ |
| Cinema Studio 3.0 | 300 | 11,5–16,5 $ |
| Seedance 2.5 (1080p) | 360 | 14–20 $ |

## 4. Prueba de transición con tres modelos

```text
Genera la transición que me has recomendado de prueba para ver cómo quedaría. Importante que el video que generes sea sin audio y con relación de aspecto 16/9 que es el diseño que usaremos para la página. Solo crea los videos, guardalos y no modifiques la web por ahora.
```

Resultado: `3-mesas → 4-barra` con Kling 3.0, MiniMax H3 y Seedance 2.0, unos 64 créditos en total. Los vídeos están en `media/scroll-world/pruebas/`.

## 5. Escribir el prompt de los 6 clips

```text
Ayudame a generar un prompt en ingles para hacer 6 clips que sirvan de transición entre las fotos jpg que hay en /photos. Que el video que se genere es como un paseo POV en primera persona, que va desde la foto de inicio hasta la de final como paseando, sin cortes ni fade-in/fade-out, para ir encajando las dos fotos. Se que hay fotos que son en vertical, pero haz que quede perfecto. Tienen que ser movimientos suaves. Si tienes dudas, dime si lo entiendes.
```

Ajustes sobre la marcha:

```text
Para el clip 6 lo unico que hay que hacer es mirar a la derecha, ya que es justo a la derecha dónde está la vista de los vinos. Adapta eso.
```

```text
Damelo todo. Ten en cuenta que debe ser relación de aspecto 16/9. Sin audio.
```

```text
No indiques que esta en scroll-world/frames/3... para que use las de /photos.
```

## 6. Generar los 6 clips con MiniMax H3

Al pegarlo se cortaron trozos de los clips 2, 3 y 5. Esta es la versión completa que salió del paso 5. Los prompts que se enviaron de verdad a H3 están en `media/scroll-world/h3/prompts.md`.

```text
Genera 6 clips con MiniMax H3 siguiendo toda la información que te paso.

1. Keyframes 16:9 (antes de generar)

Todas las fotos de partida están en public/photos:

- Recorte a 16:9: 0-entrada.jpg, 1-lateral-entrada.jpg, 3-mesas.jpg y 5-barra-lateral.jpg.
- Outpaint a 16:9 (son verticales): 2-mesa-especial.jpg, 4-barra.jpg y 6-vinos.jpg, con este prompt:
Extend this photo to a 16:9 widescreen frame by continuing the same room to the left and right: same walls, materials, floor and warm lighting. Do not change anything inside the original image.
- Usa el mismo archivo como último frame del clip N y primer frame del N+1.

2. Ajustes (iguales en los 6 clips)

- Relación de aspecto 16:9, 1080p.
- Sonido off.
- Misma duración y mismo modelo en todos.
- Montaje con concatenación directa, sin transiciones.

3. Prompts

Clip 1 · 0-entrada → 1-lateral-entrada
16:9 widescreen, smooth first-person POV walk through an upscale Japanese restaurant, one continuous take on a steady gimbal at eye level. The camera walks slowly forward down the vaulted white dining room toward the glass street door and the blossoming cherry tree, then gradually pans left until it faces the wall of organic wood-framed mirrors above the cognac leather banquette, with the oval window on the right. Gentle ease-in and ease-out, settling exactly on the final frame. Constant focal length, no zoom, no cuts, no fades, no people, no camera shake. Preserve the real architecture, materials and warm amber lighting exactly. Photorealistic. Silent video, no audio.

Clip 2 · 1-lateral-entrada → 2-mesa-especial
16:9 widescreen, smooth first-person POV walk through an upscale Japanese restaurant, one continuous take on a steady gimbal at eye level. The camera keeps panning slowly left along the mirror wall, glides past the bonsai in the white clay amphora and steps from the patterned carpet onto the wooden floor, arriving in a quiet vaulted alcove facing the round wooden table with its curved cognac leather booth under a glowing cone pendant lamp. Gentle ease-in and ease-out, settling exactly on the final frame. Constant focal length, no zoom, no cuts, no fades, no people, no camera shake. Preserve the real architecture, materials and warm amber lighting exactly. Photorealistic. Silent video, no audio.

Clip 3 · 2-mesa-especial → 3-mesas
16:9 widescreen, smooth first-person POV walk through an upscale Japanese restaurant, one continuous take on a steady gimbal at eye level. The camera turns gently right away from the round booth, passes through the white plaster arch with the round wall sconce and walks out into the long, dimly lit main dining room: rows of wooden tables and upholstered chairs, black-framed oval mirrors on the right wall, a carved stone statue and sculpted plaster reliefs in oval niches. Gentle ease-in and ease-out, settling exactly on the final frame. Constant focal length, no zoom, no cuts, no fades, no people, no camera shake. Preserve the real architecture, materials and warm amber lighting exactly. Photorealistic. Silent video, no audio.

Clip 4 · 3-mesas → 4-barra
16:9 widescreen, smooth first-person POV walk through an upscale Japanese restaurant, one continuous take on a steady gimbal at eye level. The camera glides slowly forward between the wooden dining tables, then gently turns right toward the softly lit sushi bar and comes to rest facing it head-on: carved sand-spiral counter front, wavy sculpted plaster arch with hidden warm light, dark wood back shelves and cherry blossom branches hanging overhead. Gentle ease-in and ease-out, settling exactly on the final frame. Constant focal length, no zoom, no cuts, no fades, no people, no camera shake. Preserve the real architecture, materials and warm amber lighting exactly. Photorealistic. Silent video, no audio.

Clip 5 · 4-barra → 5-barra-lateral
16:9 widescreen, smooth first-person POV through an upscale Japanese restaurant, one continuous take on a steady gimbal at eye level. The camera slowly glides backward and slightly to the right, keeping the sushi bar with its wavy plaster arch in view in the distance, as the carved sand-spiral side counter with a black stone head sculpture enters from the right, the blossoming cherry tree appears in the middle, the woven rattan dome booth on the left and the painted stone-pattern ceiling panels overhead. Gentle ease-in and ease-out, settling exactly on the final frame. Constant focal length, no zoom, no cuts, no fades, no people, no camera shake. Preserve the real architecture, materials and warm amber lighting exactly. Photorealistic. Silent video, no audio.

Clip 6 · 5-barra-lateral → 6-vinos
16:9 widescreen, smooth first-person POV inside an upscale Japanese restaurant, one continuous take on a steady gimbal at eye level. The camera stays in place and slowly pans right, away from the carved sand-spiral counter and the backlit bottle niches, until it looks straight down a narrow vaulted corridor lined on both sides with glass-fronted, backlit wine cabinets, with the striped carpet leading to the glass door at the end. Gentle ease-in and ease-out, settling exactly on the final frame. Constant focal length, no zoom, no cuts, no fades, no people, no camera shake. Preserve the real architecture, materials and warm amber lighting exactly. Photorealistic. Silent video, no audio.

4. Negative prompt

Clips 1 a 5:
cut, scene change, fade, dissolve, crossfade, morphing, warping geometry, flicker, zoom, fisheye distortion, shaky handheld, fast motion, people, hands, text, extra objects, lighting change, vertical framing, black bars, letterbox, audio, music, sound
Clip 6 (lo mismo, más walking, forward movement para que la cámara no avance):
cut, scene change, fade, dissolve, crossfade, morphing, warping geometry, flicker, zoom, fisheye distortion, shaky handheld, fast motion, people, hands, text, extra objects, lighting change, vertical framing, black bars, letterbox, audio, music, sound, walking, forward movement
```

Resultado: clips de 8 s en 2K, bajados a 1080p. Los verticales se ampliaron con FLUX.2 Pro Outpaint y hubo que repetir dos tomas (el clip 1 tenía cortes y en el 4 la cámara atravesaba el espejo). Coste: unos 137 créditos, unos 5 $.

## 7. Vídeos optimizados para la web

```text
Pasa los videos de mp4 a una version optimizada para web y en formato tanto mp4 por compatibilidad como webm, sin audio.
```

```text
Pues nada, mejor usamos solo el mp4. Y usamos los clips para cada seccion. De forma que para cargar el primero, cuando se cargue haga un fade-in y se vayan cargando todos los que se necesita con prioridad segun como de cerca está del scroll.
```

## 8. Escribir el prompt de la web con scroll-world

```text
Dame un prompt completo para generar la web con la skill de scroll-world pero teniendo en cuenta que ya tengo los videos generados para que no los vuelva a generar.
```

El prompt que devolvió está en `media/scroll-world/prompt-web.md`.

## 9. Montar la web con la skill scroll-world

Es el prompt del paso 8, con la dirección de arte y el intake añadidos en lugar de las respuestas de la entrevista. Al pegarlo también se perdieron trozos (vídeos, cableado e integración); aquí van completos, sacados de `media/scroll-world/prompt-web.md`.

```text
Monta la landing de Arko con la skill scroll-world en este proyecto Astro, PERO los vídeos ya están generados. No generes nada: ni stills, ni clips, ni conectores, ni cadena 9:16. No llames a Higgsfield, Codex ni a ningún modelo de imagen o vídeo, y no gastes créditos. Del Step 0 solo comprueba ffmpeg/ffprobe. Sáltate los Steps 2–5. Del Step 6 haz solo encodes con ffmpeg. Haz completos los Steps 7 y 8.

## Dirección de arte

- **Paleta:** yeso crema, nogal, cuero terracota, el índigo y el naranja de la alfombra y luz ámbar. Fondo `#131209`, el casi negro cálido que está en la lista del skill. Texto en crema `#f3eadb` y naranja teja `#d0703a` solo como acento. El botón es teja con el texto oscuro, que es la combinación que pasa el contraste.
- **Marca:** el logo sale de su web (`https://www.arkorestaurant.com/logo.svg`). Ojo: es un PNG metido dentro de un SVG, así que hay que vectorizarlo con potrace para tenerlo nítido y poder pintarlo en crema con `currentColor`. Queda en 4 KB. Su A tiene forma de arco, como el escenario del vídeo, y sirve de favicon. Su azul marino `#06142f` no está en la lista de fondos del skill; si Arko lo quiere, hay que pedirlo de forma explícita.
- **Formas:** óvalos y arcos como máscaras de imagen, espejos de borde orgánico como marcos y las espirales concéntricas de la barra como separador, como ondas por detrás del botón de reservar y como pin del mapa.
- **Movimiento:** lento y pesado, como entrar en un sitio tranquilo. Nada rebota; la curva del skill (`cubic-bezier(0.32, 0.72, 0, 1)`) encaja.
- **Tipografía:** Hina Mincho para los titulares y Zen Kaku Gothic New para el texto, las dos de Google Fonts, servidas en local y recortadas a latín. Buscábamos algo nipón pero elegante: Geist quedaba demasiado genérica y una display occidental como Melodrama, demasiado de revista de moda. Es una excepción a la lista de fuentes del skill y hay que pedirla expresamente. Hina Mincho solo tiene un peso, así que nada de negritas sintéticas.
- **Ambilight:** detrás del arco va el mismo fotograma que se ve dentro, en un lienzo de 36×64 píxeles, ampliado, difuminado y con opacidad baja. Los colores del borde siempre coinciden con los del vídeo y el fondo deja de ser plano.
- **Móvil:** casi todas las fotos de platos son verticales, así que en móvil lucen todavía más. Del recorrido, `2-mesa-especial.jpg` y `4-barra.jpg` ya son verticales; las otras cuatro se recortan a 9:16.
- **Falta:** el nombre de los platos de repuesto. Si hace falta alguna foto más, pídesela a Arko y no la generes con IA: serían platos que no sirven.

Intake:
- Acción principal: reservar mesa en https://arkorestaurant.myrestoo.net/en/reservar
- Acción secundaria, solo más abajo: regalar una experiencia en https://www.arkorestaurant.com/es/regala/
- Oferta: Arko Short Experience, menú para 2 personas (sushi, starters, principal y postre), 150 €. Arko Full Experience, menú degustación completo para 2 personas, 11 pases, 250 €. Maridaje, selección de vinos armonizados, +100 €.
- Titular de su web: "Cocina japonesa con alma mediterránea".
- Texto de su web: "Un restaurante donde la disciplina japonesa dialoga con el producto mediterráneo y la herencia peruana. Sin concesiones: técnica nipona, ingredientes del mar y del mercado, sabor de Barcelona."
- Platos destacados: carpaccio de ventresca Bluefin trufado, kizami, wasabi y crema de aguacate; ostra con salsa ponzu de fruta de la pasión; nigiri Selección; picanha de Wagyu a la brasa, yuca frita y salsa tarí; gelato de lúcuma, sablé, nueces pecanas y caramelo salado.
- Prueba: arroz Koshihikari con vinagre de arroz rojo de una casa japonesa fundada en 1937; salmón y atún 100 % libres de anisakis, sin antibióticos ni hormonas; toda la soja que se sirve en sala es sin gluten.
- Datos: Carrer Enric Granados 63, 08008 Barcelona. Abierto de lunes a domingo de 13:00 a 00:00. +34 938 29 95 72. Instagram @arko.barcelona.
- Legal: enlaza sus páginas /es/legal/, /es/privacidad/, /es/cookies/ y /es/terminos-compra/ de arkorestaurant.com.
- Logo: https://www.arkorestaurant.com/logo.svg. Es un PNG dentro de un SVG: vectorízalo con potrace para que quede nítido y se pueda pintar con currentColor. Su A en arco será el favicon.
- Público (asumido): gente de Barcelona y visitantes que buscan una cena especial en el Eixample.
- Objeciones (asumidas): el precio, no saber qué es la cocina nikkei y las dudas con el pescado crudo o el gluten.
- Tráfico: Instagram y Google Maps.
- Tono: cálido, sereno y premium.
- Fotos, en public/photos/: 0-entrada.jpg a 5-barra-lateral.jpg son el recorrido; 6-vinos.jpg es el pasillo de vinos; photo-01.jpg a photo-27.jpg son platos, producto y cócteles. Usa solo los nombres de plato de la lista de destacados; las fotos de platos que no estén en ella, márcalas como pendientes de nombre.
- Diseño: tema oscuro minimal editorial sacado de las fotos. Fondo #131209, texto crema #f3eadb y naranja teja #d0703a solo como acento (el botón, teja con el texto oscuro). Óvalos y arcos como máscaras de imagen, espejos de borde orgánico como marcos y las espirales de arena de la barra como motivo.
- Tipografía: Hina Mincho para los titulares y Zen Kaku Gothic New para el texto, de Google Fonts, servidas en local y recortadas a latín. Queremos algo nipón pero elegante; es una excepción a tu lista de fuentes que pido yo expresamente. Sin cursivas ni negritas sintéticas.
- Prioridad móvil: sí.
- Layout: scroll world con las fotos del local. Vídeo vertical 9:16 fijado a la derecha a toda la altura, con la parte de arriba en arco, y el texto a la izquierda, un bloque por cada una de las seis paradas del recorrido. La cabecera es tu píldora flotante: alineada a la izquierda en escritorio, con el logo a la altura del texto, y centrada en móvil.

## Vídeos que ya existen (media/scroll-world/h3/)

- web/clip-1.mp4 … web/clip-6.mp4: son los que hay que usar. H.264, 1920×1080, 24 fps, 8 s, sin audio, keyframe cada 0,25 s (GOP 6), entre 4 y 10 MB. Ya cumplen el encode del Step 6: NO los recodifiques, cópialos a public/video/.
- clips/2k/ (2560×1440) y clips/1080p/: masters. Úsalos solo si tienes que recodificar algo.
- No uses web/*.webm, web/paseo.mp4, paseo-h3-1080p.mp4, clips/descartes/ ni pruebas/.
- prompts.md y jobs.json explican cómo se generaron (MiniMax H3 con primer y último frame).
- clip-k va de la parada k-1 a la parada k, con ease-in y ease-out, y se asienta en la foto. Las costuras ya encajan: el PSNR entre el último frame de clip-k y el primero de clip-(k+1) está entre 29 y 37 dB.

## Cómo cablearlo en el engine

Los clips son tramos ENTRE paradas, no "dives" dentro de una escena. El texto de cada parada tiene que verse con la cámara quieta en esa parada, no a mitad de tramo. Por eso:

- sections: las 7 paradas, SIN `clip`. Su `still` es un frame real del vídeo, nunca la foto original (regla de costura del Step 5): parada 0 = primer frame de clip-1; paradas 1–5 = primer frame de clip-(k+1); parada 6 = último frame de clip-6. Extráelos con ffmpeg a webp en public/world/.
- connectors: los 6 clips en orden (clip-1 entre las paradas 0 y 1 … clip-6 entre la 5 y la 6). connectorsMobile: sus encodes 720p del §6.
- crossfade corto (~0.06–0.08). connScroll ~1.4 (los clips duran 8 s), paradas ~0.9, y más scroll en la primera y la última.
- Mantén los ids de las paradas que ya existen (inicio, nikkei, precio, producto, shari, como-reservar) y añade `maridaje` para la séptima.

## Integración en Astro

- Copia references/scrub-engine.js a src/scripts/scroll-world.js como módulo ES (con export) y móntalo desde src/components/ScrollWorld.astro, sustituyendo la implementación actual (GSAP, fotos y vídeo vacío). Borra lo que deje de usarse (`paseo` en arko.ts, world.ts, Stop.astro) si nada más lo importa.
- nav: false y sin brand ni topcta del engine, porque ya está Header.astro. atmosphere: false (es fotorrealista, sin partículas).
- Tema: mapea --sw-bg, --sw-ink, --sw-ink-soft, --sw-accent, --sw-font-display y --sw-font-body a los tokens existentes.
- Copy: reutiliza el que ya hay en ScrollWorld.astro, un bloque por parada y en este orden: 0 hero (h1 "Cocina japonesa con alma mediterránea", botón Reservar mesa y pills), 1 qué es la cocina nikkei, 2 precio cerrado (150 € / 250 € / +100 €), 3 producto (anisakis, soja sin gluten), 4 shari (Koshihikari, 1937), 5 cómo funciona (3 pasos), 6 maridaje (`maridaje` de arko.ts) con CTA final: Reservar mesa (links.reservar) y Regalar una cena (links.regalar). Un solo h1 en toda la página.
- Móvil: el 16:9 se recorta en vertical. Mira cada frame y define un object-position horizontal por parada para que el sujeto (el cerezo, los espejos, la mesa, la barra, el pasillo) quede a la vista. Si el engine no lo admite, añade un campo por sección.
- Deja debajo el resto de la página tal cual: Tagline, Dishes, Press, Experiences, Faq, Gift y FinalCta. Comprueba que Lenis no pelea con el suavizado del engine y que los anchors del Header siguen funcionando.
- prefers-reduced-motion: solo los stills.

## QA (Step 8)

- Arranca con `pnpm astro dev --background` y páralo con `pnpm astro dev stop`.
- Prueba con agent-browser o Playwright, nunca con mi Chrome. Mejor snapshots que screenshots.
- Captura justo antes y justo después de cada una de las 12 costuras (parada→clip y clip→parada) y compara la composición.
- Consola sin errores, video.seekable.end(0) > 0, currentTime siguiendo al scroll en cada tramo, un viewport de móvil (390×844) y reduced-motion.
- `pnpm build` sin errores.
```
