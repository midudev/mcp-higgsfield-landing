# Prompts: landing de Arko Sushi con Higgsfield MCP

## Preparación

Pega este prompt en Claude Code. Instala el CLI, abre el login en el navegador y añade los skills oficiales.

```text
Set up Higgsfield for me so I can generate images and videos from here.

1. Install the CLI: run `npm i -g @higgsfield/cli`.
2. Authenticate: run `higgsfield auth login` and complete the sign-in in the browser it opens.
3. Install the companion skills: run `npx skills add higgsfield-ai/skills`.

Once that's done, let me know when it's ready.
```

## Prompts para Claude Code

Siete prompts en el orden del guion. Los datos de Arko salen de su web; revisa que no hayan cambiado antes de grabar. Los prompts 1 a 6 ya incluyen todo lo que se corrigió en la pasada de prueba, así que la web debería salir bien a la primera. El 7 recoge esas correcciones por si quieres enseñar alguna en cámara.

### Prompt 1. Brief para el skill

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

### Prompt 2. Preparar las paradas

```text
Recorta en local a 9:16, a 1080×1920, estas seis fotos de public/photos/ y guárdalas en src/assets/arko/paradas/ con el mismo nombre. El número es el centro horizontal del recorte (0 es el borde izquierdo y 1 el derecho):
0. 0-entrada.jpg, 0,49: la puerta y el cerezo
1. 1-lateral-entrada.jpg, 0,65: los espejos y la ventana ovalada
2. 2-mesa-especial.jpg, 0,5
3. 3-mesas.jpg, 0,40: el relieve ovalado, los espejos y las mesas hacia el fondo
4. 4-barra.jpg, 0,5
5. 5-barra-lateral.jpg, 0,45: parte del mimbre y el cerezo rosa entero

Enséñame los seis recortes en fila. Después súbelos a Higgsfield con el MCP (media_upload, el PUT con curl y media_confirm) y guarda los media_id para los siguientes pasos.
```

### Prompt 3. Los cinco tramos, en lote

```text
Consulta mi saldo y el coste de un clip con get_cost, y dime el total antes de lanzar nada. Después lanza en lote los cinco tramos del recorrido con Kling 3.0 en modo pro, sonido off, 5 segundos y 9:16. Cada tramo usa la parada N como start_image y la N+1 como end_image.

Escribe los prompts en inglés: un solo plano continuo, a ritmo de paseo, con el interior exactamente como en las fotos. Sin personas, objetos nuevos, textos ni cortes.

0 a 1: la cámara gira despacio a la izquierda, desde la puerta y el cerezo hacia la pared de espejos y la ventana ovalada.
1 a 2: la cámara pasa junto al bonsái de la tinaja blanca y llega al reservado redondo bajo la lámpara colgante.
2 a 3: la cámara se acerca a la pared de yeso junto al reservado hasta que todo el encuadre es crema y sale en el comedor largo de los espejos.
3 a 4: la cámara avanza entre las mesas y gira hacia la barra de las espirales de arena, bajo las ramas de cerezo.
4 a 5: la cámara rodea la barra y descubre el reservado de mimbre, el cerezo rosa y la escultura de piedra negra.

Si el MCP te recomienda un preset en lugar de generar, recházalo y reenvía. Si un clip falla, reenvía solo ese. Cuando terminen, descarga los originales en raw-video/ como 0-1.mp4, 1-2.mp4 y así sucesivamente, y enséñame una tira de fotogramas de cada uno para comprobar que no cambian el local.
```

### Prompt 4. Los dos cinemagraphs, en lote

```text
Ahora dos cinemagraphs en lote con Kling 3.0 en modo pro, sonido off, 5 segundos y 9:16, usando los recortes que ya subiste. Dime antes el coste total.

La misma foto como start_image y end_image, para que el loop no salte. Cámara totalmente fija: solo se mueve lo que indico, el resto queda idéntico y no aparece nada nuevo.
1. Parada 0, la entrada: caen algunos pétalos blancos del cerezo y sus ramas se mecen muy despacio.
2. Parada 5, el reservado de mimbre: caen algunos pétalos rosas del cerezo junto a la escultura de piedra.

Descarga los originales en raw-video/ (p0.mp4 y p5.mp4) y codifícalos a 720 px de ancho, sin audio, en public/video/paradas/0.mp4 y 5.mp4.
```

### Prompt 5. Construir la web

```text
Construye la landing en Astro siguiendo el skill y con los textos que aprobamos, todos en src/data/arko.ts.

Vídeo: une los cinco tramos de raw-video/ en un solo recorrido con ffmpeg, con un xfade de 4 fotogramas en cada unión. Codifícalo con todos los fotogramas como keyframe (-g 1), sin audio y con faststart: 720×1280 a CRF 29 para escritorio (public/video/recorrido.mp4) y 480×854 a CRF 30 para móvil (public/video/recorrido-m.mp4). Anota en qué segundo cae cada parada.

Layout: en escritorio, columna de texto a la izquierda y, a la derecha, un escenario fijo a toda la altura con el vídeo 9:16 y la parte de arriba en arco. Detrás del arco, un ambilight: el mismo fotograma copiado a un canvas de 36×64, ampliado y difuminado, centrado detrás del arco, con opacidad baja y bordes que se apagan en elipse. En móvil, el vídeo ocupa toda la pantalla de fondo y el texto pasa por encima en tarjetas oscuras semitransparentes.

Recorrido: seis bloques de texto de al menos una pantalla de alto, uno por parada. El scroll siempre mueve la cámara: un único ScrollTrigger en modo scrub, con Lenis, lleva el vídeo del centro del bloque N al centro del N+1, de modo que cada parada cae en su segundo exacto. Toma como referencia el método de oso95/scroll-world, pero no uses Monid ni generes vídeos fuera del MCP de Higgsfield. Arriba del todo y al final se ve la foto de la parada con su cinemagraph en bucle; en medio, siempre vídeo. Carga el vídeo como Blob después del evento load (o al primer gesto), con la foto de la entrada como póster. Una leyenda al pie del arco (en móvil, bajo la cabecera) dice la parada actual y, en marcha, "→ destino" con una barra de progreso; al cambiar, el texto sale y entra con un fundido. Con prefers-reduced-motion, sin vídeo: fotos que cambian con un fundido.

Contenido:
- Hero alineado abajo: etiqueta "Cocina nikkei en el Eixample", titular, subtítulo, botón de reservar, "Desliza para entrar" y tres datos: dónde, cuándo y experiencias desde 150 € para 2.
- La carta, con la foto de cada plato destacado en arco.
- El arroz, con photo-27.jpg en arco a la misma altura que sus tres datos, sin cajas y con cada cifra pegada a su descripción.
- La reserva final, con dirección, horario, teléfono y un mapa en SVG hecho con las calles de OpenStreetMap (Overpass) en los colores de la web: Enric Granados rotulada, un pin de ondas concéntricas, botón "Cómo llegar" a Google Maps y solo una línea mínima de atribución. Nada de iframes ni fotos al lado. Remate: "Te guardamos mesa."

Fotos con <Picture> de astro:assets en AVIF y WebP, con alt descriptivo: copia a src/assets/arko/ las de public/photos/ que use la web. Todo el texto en HTML. Las espirales de la barra, en SVG de círculos concéntricos, como separador y como ondas por detrás del botón de reservar al pasar el ratón. Añade la 404 con 6-vinos.jpg y usa 0-entrada.jpg como og:image.

Arranca el servidor en segundo plano cuando tengas las dos primeras paradas y enséñamelo antes de seguir.
```

### Prompt 6. Pulido

```text
Revisa la web a 390 px de ancho. Comprueba que ningún titular se desborde, que las tarjetas de texto no tapen lo importante del vídeo y que el botón de reservar se alcance con el pulgar; si hace falta, añade uno flotante abajo que aparezca al pasar el hero.
Haz scroll lento, normal y rápido por todo el recorrido y mide fotograma a fotograma: el escenario nunca puede quedarse en negro y el vídeo no puede dar saltos.
Haz el build y pasa Lighthouse en móvil. Si el LCP pasa de 2,5 s: que el vídeo espere al load, recorta las fuentes a latín, mete el CSS en línea, no descargues las fotos de paradas lejanas hasta que la cámara se acerque y baja a calidad 40 el AVIF de las fotos del escenario.
```

### Prompt 7. Retoques de diseño, uno por mensaje

Son las correcciones reales de la pasada de prueba, con las palabras que usé. Ya están dentro de los prompts 1 y 5. Si quieres enseñar en cámara cómo se corrige algo, quita esa parte del prompt 5 y mándala aquí, un mensaje por corrección:

```text
El menú del header debe quedar alineado siempre a la izquierda en desktop.
```

```text
El efecto ripple debe quedar por detrás del botón y no por encima.
```

```text
En el arroz, que la altura de la imagen y los datos encaje. No uses cajas y haz que el título y la descripción de cada dato estén más pegados verticalmente.
```

```text
Quita el copyright del mapa, cárgalo en SVG para que se vea mejor y quita la imagen de comida de al lado, que queda rarísimo.
```

```text
Quítale opacidad al ambilight y que el degradado que hace en los bordes sea más suave.
```

La del mapa es la mejor para cámara: Claude explica que la licencia de OpenStreetMap obliga a atribuir los datos y deja una línea mínima en vez del bloque de copyright.
