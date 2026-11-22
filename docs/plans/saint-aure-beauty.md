# Saint Aure Beauty House — Landing

Alcance: **cliente** — solo `src/config/site.ts`, `src/content/page.ts`, `src/assets/images/`, `public/` (fuentes, favicon). Los componentes, tokens y estilos de la plantilla no se modifican.

Referencia de diseño: `design/stitch-export/stitch_saint_aure_landing/stitch_saint_aure_beauty_house_landing/haute_couture_aesthetic/DESIGN.md`

---

## Decisiones

**D1 — Preset base y overrides de apariencia**  
Preset `elegant` como base (radios `md`, tarjetas con borde, íconos thin, densidad airy). Overrides:

- `shape.buttons: "pill"` → botones en píldora (el DESIGN.md dice "Primary action buttons default to pill silhouettes")
- `shape.cards: "md"` → 12 px, ya incluido en elegant pero se declara explícito
- `shape.media: "md"` → imágenes con el mismo radio que las tarjetas
- `surfaces.cards: "border"` → borde hairline dorado, sin sombra
- `icons.stroke: "thin"` → ya en elegant, se confirma
- `density: "airy"` → ya en elegant, se confirma

**D2 — Tipografía**

- `heading`: Playfair Display, weight 400, tracking `tighter` (−0.035 em, coincide con el DESIGN.md `display-lg`)
- `body`: DM Sans (cubre body e interfaz)
- `eyebrow`: uppercase (ya en editorial/elegant)
- Fuentes: WOFF2 variables de Google Fonts (subset latin) en `public/fonts/`: `playfair-display-variable.woff2` y `dm-sans-variable.woff2`. Un mismo archivo se declara para los pesos 400 y 500, así que se descarga una sola vez por familia.
- _Implementación_: DM Sans 300 se descartó porque `FontWeight` solo acepta 400–700 y el peso del cuerpo no es configurable.

**D3 — Escala de colores primaria (dorado, basada en #C5A477)**  
Escala construida para que `brand-300` sea el dorado claro usado como acción en dark mode y `brand-700` sea el dorado oscuro con contraste en light mode.

```
primary:
  50:  "#fdf8ef"
  100: "#f9edda"
  200: "#f2d9b2"
  300: "#e9c48a"   ← acción principal en dark
  400: "#d4aa6a"
  500: "#c5a477"   ← acento de marca
  600: "#b08540"
  700: "#8c6830"   ← acción principal en light
  800: "#6b4e23"
  900: "#4f3a18"
  950: "#2c200e"
```

**D4 — Escala secundaria (champagne, derivada de #E5D1AD)**  
Se usa para acciones secundarias; complementa al dorado con un champagne más desaturado.

```
secondary:
  50:  "#faf6f0"
  100: "#f5ecdf"
  200: "#ead9bf"
  300: "#dfc9a0"   ← secondary action en dark
  400: "#d4b880"
  500: "#c8a267"
  600: "#a98050"
  700: "#856039"   ← secondary action en light
  800: "#624427"
  900: "#482f18"
  950: "#281a0c"
```

**D5 — Escala neutral (cálida oscura, basada en #0B0908 → #F2EDE5)**  
Los fondos y superficies del tema oscuro salen de esta escala.

```
neutral:
  0:   "#ffffff"
  50:  "#f2ede5"   ← texto principal en dark / fondo alt en light
  100: "#e8e0d6"
  200: "#d4c9ba"
  300: "#bfb09a"
  400: "#a89582"   ← texto secundario en dark
  500: "#8c7a69"
  600: "#6e5e50"
  700: "#4f3e33"
  800: "#2c2927"   ← near #292725 (surface/tarjetas en dark)
  900: "#1a1715"   ← fondo alt dark
  950: "#0b0908"   ← fondo principal dark
```

Nota: después de configurar los colores, correr `npm run check:contrast` y ajustar los pasos que fallen. La corrección va siempre en la escala del cliente (site.ts), nunca en los componentes.

_Ajustes de contraste en la etapa 1_ (los colores de estado fijos de la plantilla y el link fallaban sobre las superficies de light):

- `neutral.50`: `#f2ede5` → `#faf7f2` (el canvas alabastro del DESIGN.md; también es el texto principal en dark)
- `neutral.100`: `#e8e0d6` → `#f6f3ed`
- `primary.600`: `#b08540` → `#a67c3a` (foco en light)
- `primary.700`: `#8c6830` → `#85622c` (acción y link en light)
- _Etapa 3_: `primary.700` → `#7a5a28`. axe marcaba el badge "Destacado" en light (`--color-link` sobre el 15 % del mismo color encima de `surface`, ~4,2:1); con este valor queda en ~4,8:1. `check:contrast` no cubre esa combinación.

**D6 — Secciones de la página (orden exacto)**

1. Hero — `variant: "fullscreen"`, texto a la izquierda, overlay oscuro
2. About — `variant: "split"`, foto trabajando, stat "16+ años" en la descripción
3. Services — `variant: "featured"`, 5 servicios sin precio, con `visual.type: "image"` y placeholders externos (picsum.photos + dimensiones declaradas)
4. Gallery — `variant: "masonry"`, 8–10 items con descripciones editoriales como alt text, lightbox activo
5. Stats — `variant: "row"`, 3 métricas: "16+", "5", "Rosario & Roldán"
6. Testimonials — `variant: "carousel"`, 3 testimonios con 5 estrellas y rol descriptivo
7. CTA — `variant: "highlight"`, un solo botón primary WhatsApp
8. Contact — `variant: "split"`, WhatsApp como canal principal, formulario con campos: nombre, servicio de interés (dropdown), mensaje. Sin dirección exacta ni horarios.

**D7 — Datos del negocio**

- `business.type: "ProfessionalService"` (atiende a domicilio y sin dirección exacta confirmada)
- `address.street: "Rosario, Santa Fe"` (ciudad y provincia, sin número; el cliente confirmará la dirección completa)
- `openingHours`: eliminar (sin horarios confirmados)
- `whatsapp`: placeholder `+54 9 341 000-0000` — el cliente debe proveer el número real
- `telephone`: mismo que whatsapp hasta confirmación
- `email`: placeholder `hola@saintaure.com.ar` — confirmar con cliente

**D8 — Analytics**  
Eliminar el bloque `analytics` de `site.ts` para esta etapa. No hay aviso de cookies ni scripts de terceros hasta que el cliente defina su estrategia.

**D9 — Imágenes**  
Para esta etapa se usan placeholders. Las imágenes locales de alta resolución van en `src/assets/images/` y se importan; los placeholders externos usan `src: string` con `width` y `height` explícitos. El placeholder central del hero y about reutiliza `src/assets/images/sample.jpg`.

Cuando el cliente entregue las fotos reales, se reemplazan imagen por imagen sin tocar la estructura de page.ts.

**D10 — Favicon y logo**  
Reemplazar `public/favicon.svg` con el logo de Saint Aure en SVG cuadrado. Mientras no se disponga del logo real, dejar el favicon de la plantilla (check:launch lo marcará como pendiente, lo cual es correcto para esta etapa).

---

## Plan por etapas

Cada etapa se implementa en una sesión nueva con `/etapas docs/plans/saint-aure-beauty.md <número>`.

---

### Etapa 1: Identidad visual

- **Objetivo**: el sitio muestra el nombre, colores y tipografía de Saint Aure en ambos temas (dark por defecto, light disponible). `npm run check:contrast` pasa sin errores AA.
- **Leer antes**:
  - Este plan completo (decisiones D1–D10)
  - `src/config/site.ts` (archivo actual que se reemplaza)
  - `src/utils/appearance.ts` (cómo se compilan los tokens)
  - `docs/guides/new-landing.md` §2 y §3 (pasos de identidad visual)
  - `design/stitch-export/.../haute_couture_aesthetic/DESIGN.md` (referencia visual)
- **Acciones**:
  1. Descargar los WOFF2 listados en D2 y colocarlos en `public/fonts/`.
  2. Reescribir `src/config/site.ts` completo con los datos de D1–D9:
     - `name: "Saint Aure Beauty House"`
     - `url: "https://saintaure.com.ar"` (placeholder; actualizar cuando se defina dominio)
     - `locale: "es-AR"`
     - SEO: título y descripción reales, `robots: "noindex, nofollow"`
     - `business` con los datos de D7
     - `appearance`: preset `elegant`, colores D3–D5, tipografía D2, overrides D1
     - `defaultTheme: "dark"`
     - `navigation`, `header` (overlay + CTA "Consultar por WhatsApp"), `footer` (expanded)
     - Sin `analytics` (D8)
     - `floatingWhatsApp` con mensaje en español
  3. Correr `npm run check:contrast`. Si algún paso falla, ajustar la escala en site.ts (siempre más oscuro en light, más claro en dark).
- **Archivos**:
  - `src/config/site.ts` — reescritura completa
  - `public/fonts/playfair-400.woff2`, `playfair-500.woff2`
  - `public/fonts/dm-sans-300.woff2`, `dm-sans-400.woff2`, `dm-sans-500.woff2`
- **Verificación**:
  - `npm run check && npm run lint && npm run format:check`
  - `npm run check:contrast`
  - `npm run dev` → abrir catálogo `/dev/components` a 375 y 1280 px; revisar heading en Playfair Display, cuerpo en DM Sans, botones en píldora, tarjetas con borde sutil, fondos oscuros correctos en dark y champagne/hueso en light
- **Modelo sugerido**: Opus (diseño visual, construcción de escalas de color y contraste)
- **Estado**: Implementada
- **Notas de implementación**:
  - `header.variant` es `"standard"`: el contrato solo acepta `minimal | standard`, no existe `overlay`.
  - `address.postalCode: "S2000"` (Rosario centro) porque el contrato lo pide; confirmar con la clienta junto con la dirección.
  - Navegación: Servicios, Sobre mí, Trabajos (`#gallery`), Contacto.
  - Verificado con build + preview de la home (el catálogo `/dev/components` no se pudo levantar porque había otro `astro dev` corriendo, el de la plantilla).

---

### Etapa 2: Contenido de la página

- **Objetivo**: la home muestra las 8 secciones de Saint Aure con contenido real (textos y placeholders de imagen) en ambos temas y viewports.
- **Leer antes**:
  - Este plan completo (decisiones D6–D9)
  - `src/content/page.ts` (archivo actual)
  - `src/types/` → `hero.ts`, `about.ts`, `services.ts`, `gallery.ts`, `stats.ts`, `testimonials.ts`, `cta.ts`, `contact.ts`
  - `docs/guides/new-landing.md` §4 (contenido)
  - `git log --oneline -3` para ver el estado después de Etapa 1
- **Acciones**:
  Reescribir `src/content/page.ts` con estas secciones en orden (D6):

  1. **Hero** `variant: "fullscreen"`:
     - eyebrow: "Saint Aure Beauty House"
     - title: "El cabello que imaginaste, en las manos que lo hacen realidad"
     - description: "16 años de experiencia. Atención presencial y a domicilio en Rosario y Roldán."
     - actions: `[{ label: "Consultar por WhatsApp", whatsapp: { message: "Hola, quiero consultar un turno." } }, { label: "Ver trabajos", href: "#gallery" }]`
     - image: `sample.jpg` (placeholder editorial hasta tener foto real)
     - overlay: `"heavy"` (oscuro 80%)
     - alignment: `"left"`

  2. **About** `variant: "split"` (D6):
     - eyebrow: "La profesional"
     - title: "Experiencia, dedicación y atención personalizada"
     - description con "16+ años de experiencia" integrado en el párrafo
     - action primary ghost → WhatsApp; action secondary outline → `href: "#contact"`
     - image: `sample.jpg` como placeholder

  3. **Services** `variant: "featured"`:
     - 5 servicios, sin `price`, con `visual: { type: "image", image: { src: "https://picsum.photos/seed/<slug>/800/600", alt: "<descripción editorial>", width: 800, height: 600 } }`
     - Servicio destacado: "Peinados para novias" (`featured: true`)
     - Resto: Balayage, Peinados para eventos, Colorimetría, Alisados
     - Cada uno: `action: { label: "Consultar", href: "#contact", variant: "outline" }`

  4. **Gallery** `variant: "masonry"` con 9 items (mezcla portrait/landscape):
     - Usar `src: "/placeholders/portrait.svg"` y `/placeholders/landscape.svg` con `alt` descriptivos editoriales:  
       "Peinado de novia con iluminación cálida editorial", "Close-up balayage rubio miel", "Peinado fiesta semirrecogido", "Mechas californianas castaño oscuro", "Novia de perfil con ondas naturales", "Colorimetría raíz a puntas", "Peinado recogido bajo elegante", "Balayage rubio plateado natural", "Trenza lateral novia"
     - lightbox activo

  5. **Stats** `variant: "row"`:
     - `{ value: "16+", label: "años de experiencia" }`
     - `{ value: "5", label: "especialidades" }`
     - `{ value: "Rosario & Roldán", label: "Presencial y a domicilio" }`

  6. **Testimonials** `variant: "carousel"`:
     - 3 testimonios, `identity: { type: "initials", value: "XX" }`, `rating: 5`
     - Roles: "Novia — casamiento diciembre 2024", "Cliente de balayage", "Servicio a domicilio"
     - Quotes descriptivos pero marcados como placeholder (siguiendo la nota del template: solo testimonios reales)

  7. **CTA** `variant: "highlight"`:
     - title: "¿Tenés algo en mente para tu cabello?"
     - description: "Contame qué estás buscando y te asesoro sin compromiso."
     - `primaryAction`: WhatsApp "Consultar por WhatsApp"
     - Sin `secondaryAction`

  8. **Contact** `variant: "split"`:
     - eyebrow: "Contacto"
     - title: "Escribime por WhatsApp"
     - description: "Atención presencial en Rosario y a domicilio en Rosario y Roldán."
     - `channels`: solo WhatsApp (número de D7, como texto seleccionable en la descripción; NO como link)
     - `whatsapp: { message: "Hola, quiero consultar un turno." }`
     - `form` con provider `netlify`, campos: nombre (required), servicio de interés (select con las 5 opciones), mensaje (textarea, required). Sin email ni teléfono.

- **Archivos**:
  - `src/content/page.ts` — reescritura completa
- **Verificación**:
  - `npm run check && npm run lint`
  - `npm run dev` → revisar página completa a 375 y 1280 px en ambos temas:
    - Hero: texto en tercio izquierdo, overlay oscuro, dos botones
    - About: split foto + texto con stat
    - Services: card destacada más grande, resto en grilla
    - Gallery: masonry con lightbox funcional (clic en imagen → lightbox, Escape cierra)
    - Stats: 3 cifras tipografía serif dorada
    - Testimonials: carrusel con controles manuales
    - CTA: banda oscura, un solo botón
    - Contact: canal WhatsApp visible + formulario simplificado
- **Modelo sugerido**: Sonnet (sigue la estructura de los tipos existentes)
- **Estado**: Implementada
- _Desvíos de la implementación_ (los contratos no admiten lo que pedía el plan):
  - Hero: `overlay: "strong"`, porque `OverlayLevel` no tiene `"heavy"`.
  - About: `action` es una sola, así que quedó solo el botón ghost de WhatsApp, sin el secundario a `#contact`.
  - Contact: sin `channels`, porque `ContactChannel` exige `href`. El número está como texto en `description` y el botón sale de `whatsapp`.
  - Testimonios: nombre "Clienta de ejemplo", iniciales "CE" y quotes que empiezan con "Testimonio de ejemplo:".
  - Las opciones del select de servicios salen de los títulos de `services`.

---

### Etapa 3: Cierre y auditoría

- **Objetivo**: el sitio pasa `check:launch` (menos el favicon y los datos de contacto que el cliente aún no confirmó), tiene los textos legales actualizados y está listo para recibir las fotos reales.
- **Leer antes**:
  - Este plan completo
  - `src/content/legal/privacy.md` y `terms.md` (estado actual)
  - `docs/guides/new-landing.md` §9 (checklist de publicación)
  - `git log --oneline -3`
- **Acciones**:
  1. Actualizar `src/content/legal/privacy.md` y `terms.md` con los datos de Saint Aure (nombre, email de contacto, ciudad). Reemplazar todos los `[campos]` de ejemplo con los valores reales o con texto apropiado. Si el cliente no tiene política propia, dejar una nota en el plan indicando que se necesita revisión legal.
  2. Ajustar `site.ts` si check:launch señala algo más (dominio, teléfono, etc.).
  3. Verificar navegación del header y footer: que los `href` de los items apunten a los IDs reales de las secciones (`#services`, `#about`, `#gallery`, `#contact`).
  4. Revisar la página a 375, 768 y 1280 px: sin overflow horizontal, sin texto partido, galería en 2 columnas en mobile.
  5. Revisar navegación completa con teclado (Tab, Enter, Escape en lightbox y menú móvil).
  6. Verificar `floatingWhatsApp` visible y funcional en mobile.
  7. Correr el checklist completo.
  8. Anotar en el README del proyecto qué datos el cliente debe confirmar antes del deploy: número de WhatsApp real, email real, dirección exacta, fotos de servicios y galería.
- **Archivos**:
  - `src/content/legal/privacy.md`
  - `src/content/legal/terms.md`
  - `src/config/site.ts` (ajustes menores si los hubiera)
- **Verificación**:
  - `npm run format:check && npm run lint && npm run check`
  - `npm run check:contrast`
  - `npm run build`
  - `npm run test:e2e` (spec completo)
  - `npm run check:launch` — se espera que falle en favicon y datos de contacto placeholder; cualquier otro fallo se corrige en esta sesión
- **Modelo sugerido**: Sonnet (contenido y ajustes; sin diseño nuevo)
- **Estado**: Implementada
- **Notas de implementación**:
  - Textos legales con los datos de Saint Aure. Reflejan que no hay analítica ni cookies (D8), que el formulario pide nombre, servicio y mensaje, que Netlify aloja el sitio y recibe el formulario, la Ley 25.326 y una conservación de hasta un año. Se quitó el aviso de "Texto de ejemplo", así que **falta la revisión de un profesional** antes de publicar (figura en el README).
  - `primary.700` ajustado (ver D5) para que pase el e2e de accesibilidad en light.
  - Navegación: los `href` (`/#services`, `/#about`, `/#gallery`, `/#contact`) coinciden con los `id` del HTML generado.
  - e2e completo: 50 pasan y 12 se omiten (cookies, conversiones, FAQ y embeds, que el sitio no usa). Cubren desborde de 320 a 1440 px, menú móvil y lightbox con Escape, skip link, carrusel y formulario. El WhatsApp flotante está en el HTML con el link correcto. La revisión visual a 375, 768 y 1280 px no se hizo en navegador en esta sesión.
  - `check:launch` falla solo en lo esperado: favicon, `noindex`, fotos de ejemplo (`sample.jpg` y `/placeholders/`) y testimonios de ejemplo. El teléfono y el email placeholder no los detecta, así que se listan en el README.
  - README: sección "Saint Aure Beauty House: pendientes antes del deploy".

---

## Retoques

_Ajustes que aparezcan durante las etapas se anotan aquí y se aplican juntos al final._

- Imágenes como espacios vacíos (pedido de Camila en la etapa 3): no mostrar fotos de relleno. Reemplazar `sample.jpg` (hero y about) y las de picsum.photos (servicios) por marcos vacíos, por ejemplo los SVG de `public/placeholders/` que ya usa la galería, con las mismas proporciones. Así se completan foto por foto cuando la clienta las entregue (D9). Revisar que el hero con `overlay: "strong"` siga legible sin foto, y que las picsum dejen de hacer falta en la CSP si estaban habilitadas.

- `npm run format:check` falla en archivos ajenos al sitio: `.claude/skills/design-prompt/SKILL.md`, `.claude/skills/README.md` y el export de Stitch en `design/`. Formatearlos o agregar `design/stitch-export/` a `.prettierignore` (que no está en la lista de archivos del alcance cliente, así que hay que decidirlo).
