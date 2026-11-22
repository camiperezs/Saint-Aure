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

**D11 — Franja editorial en Hero**  
Campo `editorial?: string` opcional en `HeroFullScreen`. Texto libre separado con `/` que se renderiza como tira decorativa en mayúsculas debajo del contenido del hero. Valor para Saint Aure: `"VOL. XVI / ATELIER ROSARIO / ROLDÁN / ALTA COIFFURE"` (tomado del DESIGN.md). Si el campo está ausente, no se renderiza nada.

**D12 — Badge flotante en About**  
Campo `badge?: { value: string; label?: string; icon?: IconName }` opcional en `AboutStandard`. Se posiciona en absolute sobre la fotografía (esquina inferior izquierda o según el CSS). Solo aplica cuando hay imagen y `variant: "split"`. Valor para Saint Aure: `{ value: "16+", label: "años de experiencia", icon: "check-circle" }` (ícono thin; verificar con `src/icons/index.ts` que exista el nombre exacto).

**D13 — Campos extendidos en Service**  
Tres campos opcionales nuevos en la interfaz `Service`:

- `specs?: { icon: IconName; label: string; value: string }[]` — grilla de datos estructurados. Se renderiza **solo** en la card `featured: true`. Ejemplo para "Peinados para novias": `[{ icon: "clock", label: "Duración", value: "2–3 hs" }, { icon: "map-pin", label: "Modalidad", value: "Presencial o a domicilio" }]`. Los íconos deben existir en `src/icons/index.ts`; verificar antes de usar.
- `availabilityBadges?: string[]` — chips de disponibilidad en la card destacada. Ejemplo: `["Agenda Novias Abierta", "Atención Privada"]`.
- `footnote?: string` — línea de detalle al pie de las cards **no** destacadas. Ejemplo: "Diagnóstico previo incluido", "Duración: 60–90 min". No se muestra en la featured card.

Los valores de `specs` y `footnote` para cada servicio son contenido a confirmar con la clienta; en la implementación se usan valores plausibles marcados como placeholder en un comentario.

**D14 — Bloques de modalidad en Contact**  
Campo `modalityBlocks?: { icon: IconName; title: string; description: string }[]` opcional en `Contact`. Cuando está presente y `variant: "split"`, se renderiza una grilla de tarjetas (ícono + título + descripción) encima del botón de WhatsApp, en lugar de la lista plana de `channels`. Valor para Saint Aure:

```
[
  { icon: "building-2", title: "Atención Presencial", description: "En mi espacio de Rosario, con cita previa." },
  { icon: "map-pin", title: "Servicio a Domicilio", description: "Me traslado a Rosario y Roldán para que estés cómoda en tu hogar." }
]
```

Los íconos deben existir en `src/icons/index.ts`; verificar antes de usar. Si alguno no existe, elegir el disponible más cercano.

**D15 — Efectos visuales del DESIGN.md**  
Cambios de CSS puro (sin cambios de tipos ni contratos). Todos los valores deben usar custom properties del token del cliente (nunca hardcodear hex):

- **`Button.css` (primary):** gradiente lineal `var(--color-primary-100) → var(--color-primary-500)` en background; hover añade `box-shadow: 0 0 20px rgba(var(--color-primary-500-rgb), 0.4)` si el token RGB existe, o un valor aproximado equivalente.
- **`Card.css` (featured):** borde especular en la card con `featured` via un gradiente radial en el borde: `linear-gradient(135deg, rgba(229,209,173,0.45) 0%, rgba(197,164,119,0.1) 40%, rgba(197,164,119,0.3) 100%)` como `border-image` o como pseudo-elemento `::before` con `border-radius` heredado.
- **`Hero.css` (fullscreen):** glow radial sutil sobre la zona de texto: pseudo-elemento `::before` con `radial-gradient` y `filter: blur(48px)` en `rgba(197,164,119,0.08)`, posicionado detrás del contenido.
- **`ContactForm.css` / inputs:** `background: var(--color-neutral-900)` en light y `var(--color-neutral-900)` en dark; `border: 1px solid rgba(197,164,119,0.3)`; en `:focus-within` transición a `border-color: var(--color-primary-200)` con `box-shadow: 0 0 0 1px var(--color-primary-200)`.

Verificar `npm run check:contrast` después de esta etapa. Si algún efecto rompe la accesibilidad, ajustar la opacidad del gradiente.

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

### Etapa 4: Gaps de contenido

- **Objetivo**: los campos opcionales ya disponibles en los tipos se usan en `page.ts`: subcategorías en servicios, títulos y descripciones en galería, descripciones en stats, imagen en CTA y segundo select en el formulario de contacto. La página se ve más cercana al mockup sin tocar componentes.
- **Leer antes**:
  - Este plan (D6, D9, D13 parcial)
  - `src/content/page.ts` (estado actual)
  - `src/types/services.ts`, `src/types/gallery.ts`, `src/types/stats.ts`, `src/types/cta.ts`, `src/types/contact.ts`
- **Acciones** (solo `page.ts`):
  1. Agregar `label` a cada servicio (subcategoría/overline). Usar los valores del DESIGN.md como referencia y adaptar: "Novia & Celebración", "Iluminación a Mano", "Gala & Celebraciones", "Color & Diagnóstico", "Tratamiento Capilar". Ajustar al criterio editorial del cliente si se prefiere otro texto.
  2. Agregar `title` y `description` a cada `GalleryItem`. El `title` es una versión corta del alt text (máx. 4 palabras); la `description` es una breve frase editorial (máx. 12 palabras). Usar el alt text existente como base.
  3. Agregar `description` a cada `StatItem`:
     - "16+" → "Perfeccionamiento continuo desde 2008"
     - "5" → "Peinado, color, tratamientos y más"
     - "Rosario & Roldán" → "En tu espacio o en el nuestro"
  4. Agregar `image` a la sección CTA: `{ src: "/placeholders/portrait.svg", alt: "Saint Aure Beauty House", width: 120, height: 120 }`. Reemplazar por el logo real cuando esté disponible.
  5. Agregar segundo `FormField` al formulario de contacto (insertar después de "Servicio de interés"): `{ name: "modality", label: "Preferencia de atención", type: "select", placeholder: "Elegí una opción", options: ["Presencial en atelier", "A domicilio"] }`.
- **Archivos**:
  - `src/content/page.ts` — ediciones puntuales en las secciones listadas
- **Verificación**:
  - `npm run check && npm run lint`
  - `npm run dev` → revisar a 375 y 1280 px:
    - Galería: al hacer hover sobre una imagen aparece el overlay con título
    - Stats: cada cifra tiene su texto de apoyo debajo
    - CTA: se muestra la imagen/logo centrado sobre el título
    - Formulario: tres campos en total, el select de preferencia funciona
- **Modelo sugerido**: Sonnet (solo contenido, sin diseño nuevo)
- **Estado**: Implementada

---

### Etapa 5: Hero editorial + badge en About

- **Objetivo**: el hero muestra la franja editorial "VOL. XVI / ATELIER ROSARIO / ROLDÁN / ALTA COIFFURE" y la sección About muestra el badge "16+" flotante sobre la fotografía.
- **Leer antes**:
  - Este plan (D11, D12)
  - `src/types/hero.ts`
  - `src/types/about.ts`
  - `src/components/sections/Hero/Hero.astro` y `Hero.css`
  - `src/components/sections/About/About.astro` y `About.css`
  - `src/icons/index.ts` (verificar nombre del ícono para D12 antes de escribir el tipo)
  - Skill `landing-design` si aplica para posicionamiento del badge
- **Acciones**:
  1. Agregar `editorial?: string` a `HeroFullScreen` en `hero.ts`.
  2. En `Hero.astro` (variante `fullscreen`): renderizar `{hero.editorial && <p class="hero__editorial">{hero.editorial}</p>}` debajo de `.hero__content`.
  3. En `Hero.css`: estilizar `.hero__editorial` como tira en mayúsculas, `overline` scale, opacidad reducida, con separadores `/` ya incluidos en el string.
  4. Agregar `badge?: { value: string; label?: string; icon?: IconName }` a `AboutStandard` en `about.ts`. Importar `IconName` desde `@/icons`.
  5. En `About.astro` (variante `split`): cuando hay `badge` e imagen, renderizar un elemento `.about__badge` dentro del contenedor de la imagen (position relative), con el valor, ícono y label.
  6. En `About.css`: posicionar `.about__badge` en absolute sobre la foto (esquina inferior izquierda, margen `1rem`), con fondo de superficie, borde hairline dorado, `border-radius` pill o `md`.
  7. En `page.ts`: agregar `editorial: "VOL. XVI / ATELIER ROSARIO / ROLDÁN / ALTA COIFFURE"` al hero y `badge: { value: "16+", label: "años de experiencia", icon: "<nombre-verificado>" }` al about.
- **Archivos**:
  - `src/types/hero.ts`
  - `src/types/about.ts`
  - `src/components/sections/Hero/Hero.astro`
  - `src/components/sections/Hero/Hero.css`
  - `src/components/sections/About/About.astro`
  - `src/components/sections/About/About.css`
  - `src/content/page.ts`
- **Verificación**:
  - `npm run check && npm run lint && npm run format:check`
  - `npm run dev` → catálogo `/dev/components` a 375 y 1280 px, dark y light:
    - Hero: la franja editorial aparece debajo del texto del hero, legible y no invasiva
    - About: el badge "16+" es visible sobre la foto, no tapa el rostro, contraste correcto en ambos temas
- **Modelo sugerido**: Opus (diseño visual, posicionamiento en absolute, dos componentes nuevos)
- **Estado**: Implementada
- **Notas de implementación**:
  - `check-circle` no existe en `src/icons/index.ts`; se usó `check` como sustituto (D12).
  - La franja editorial se renderiza dentro de `.hero__inner` (fuera de `.hero__content`) para que ocupe el ancho completo del contenedor sin quedar limitada por el `max-inline-size: 48rem` del content.
  - El badge usa `position: absolute` dentro de `.about__image-wrap` (`position: relative`); el wrapper reemplaza la imagen directa como ítem de la grilla, así que el `block-size: 100%` en la imagen mantiene el alto.

---

### Etapa 6: Services — specs, badges y footnote

- **Objetivo**: la card destacada de "Peinados para novias" muestra la grilla duración/modalidad y los badges de disponibilidad; las cards secundarias muestran una línea de detalle al pie.
- **Leer antes**:
  - Este plan (D13)
  - `src/types/services.ts`
  - `src/components/sections/Services/ServiceCard.astro`
  - `src/components/sections/Services/Services.css`
  - `src/icons/index.ts` (verificar íconos para specs antes de escribir el tipo)
- **Acciones**:
  1. Agregar los tres campos opcionales a `Service` en `services.ts` (ver D13): `specs?`, `availabilityBadges?`, `footnote?`.
  2. En `ServiceCard.astro`:
     - Dentro del bloque `featured`, renderizar `availabilityBadges` como chips (usar componente `Badge` existente) y `specs` como una grilla de 2 columnas con ícono, label y valor.
     - Al pie de la card (fuera del bloque featured), renderizar `footnote` si existe, como texto pequeño separado por una línea hairline.
  3. En `Services.css`: estilizar `.service-card__specs` (grilla de 2 columnas, separador vertical entre columnas), `.service-card__availability` (fila de chips) y `.service-card__footnote` (texto `body-sm`, color muted, borde superior hairline).
  4. En `page.ts`: actualizar el servicio "Peinados para novias" con `specs` y `availabilityBadges` (valores de D13 marcados como placeholder); agregar `footnote` plausible a las cuatro cards secundarias. Los valores son placeholders — confirmar con la clienta antes del deploy.
- **Archivos**:
  - `src/types/services.ts`
  - `src/components/sections/Services/ServiceCard.astro`
  - `src/components/sections/Services/Services.css`
  - `src/content/page.ts`
- **Verificación**:
  - `npm run check && npm run lint`
  - `npm run dev` → catálogo a 375 y 1280 px, dark y light:
    - Card destacada: grilla specs visible, chips de disponibilidad, sin desbordes
    - Cards secundarias: footnote visible al pie con separador, sin romper la grilla
- **Modelo sugerido**: Opus (layout dentro de card, dos variantes de renderizado condicional)
- **Estado**: Implementada
- **Notas de implementación**:
  - `Badge tone="secondary"` no existe en el contrato; se usó `"neutral"` para los chips de disponibilidad.
  - Los specs se renderizan como `<dl>` con grid de 2 columnas; el ícono ocupa dos filas (label + valor).
  - `footnote` aparece fuera de `.service-card__body` para poder aplicar `border-top` que abarca el ancho completo de la card.

---

### Etapa 7: Contact — bloques de modalidad

- **Objetivo**: la sección Contact muestra dos tarjetas de modalidad (Presencial / Domicilio) como bloque visual rico, en lugar de los links planos del estado actual.
- **Leer antes**:
  - Este plan (D14)
  - `src/types/contact.ts`
  - `src/components/sections/Contact/Contact.astro`
  - `src/components/sections/Contact/Contact.css`
  - `src/icons/index.ts` (verificar íconos de D14)
- **Acciones**:
  1. Agregar `modalityBlocks?: { icon: IconName; title: string; description: string }[]` a `Contact` en `contact.ts`. Importar `IconName`.
  2. En `Contact.astro`: cuando `modalityBlocks` está presente (y `variant: "split"`), renderizar una grilla `.contact__modality` antes del botón de WhatsApp. Cada bloque: `<div class="contact__modality-item"><Icon /><h3>{title}</h3><p>{description}</p></div>`.
  3. En `Contact.css`: `.contact__modality` como grilla de 2 columnas en desktop, 1 columna en mobile. Cada item con fondo de superficie, borde hairline, radio `md`.
  4. En `page.ts`: agregar `modalityBlocks` al contact con los valores de D14 (íconos verificados).
- **Archivos**:
  - `src/types/contact.ts`
  - `src/components/sections/Contact/Contact.astro`
  - `src/components/sections/Contact/Contact.css`
  - `src/content/page.ts`
- **Verificación**:
  - `npm run check && npm run lint`
  - `npm run dev` → a 375 y 1280 px, dark y light:
    - Contact: los dos bloques de modalidad visibles, en 2 col en desktop y 1 col en mobile
    - El botón de WhatsApp sigue visible debajo
    - El formulario no se desplaza ni rompe el layout split
- **Modelo sugerido**: Sonnet (sigue el patrón de los channels existentes)
- **Estado**: Implementada
- **Notas de implementación**:
  - `building-2` no existe en `src/icons/index.ts`; se usó `shield` para "Atención Presencial" y `map-pin` para "Servicio a Domicilio" (D14).
  - `modalityBlocks` se renderiza solo cuando `variant === "split"`, igual que el plan pedía.
  - Grid 1 col en mobile, 2 col en desktop (`min-width: 64rem`), con tarjetas de superficie + borde hairline.

---

### Etapa 8: Pulido visual (efectos del DESIGN.md)

- **Objetivo**: los botones primary tienen gradiente metálico y glow en hover; la card destacada muestra borde especular; el hero tiene el glow radial atmosférico; los inputs del formulario tienen el estilo oscuro con borde dorado y focus glow. La página pasa `check:contrast` sin regresiones.
- **Leer antes**:
  - Este plan (D15)
  - `src/components/ui/Button/Button.astro` y `Button.css` (entender las custom properties y clases actuales)
  - `src/components/ui/Card/Card.astro` y `Card.css`
  - `src/components/sections/Hero/Hero.css`
  - `src/components/forms/ContactForm/ContactForm.astro` y el CSS del formulario
  - `src/config/site.ts` (para verificar qué custom properties de color existen)
  - Skill `landing-design` para los tokens disponibles
- **Acciones**:
  1. **Button.css (primary)**: reemplazar `background` sólido por `linear-gradient(180deg, var(--color-primary-100) 0%, var(--color-primary-500) 100%)`. Agregar `:hover` con `box-shadow: 0 0 20px rgba(197,164,119,0.4)` y `filter: brightness(1.08)`. Verificar que el contraste texto-fondo siga pasando (el gradiente puede cambiar el valor medio).
  2. **Card.css (featured)**: agregar pseudo-elemento `::before` en `.card--featured` con `border: 1px solid transparent` y `background-image: linear-gradient(135deg, rgba(229,209,173,0.45), rgba(197,164,119,0.1) 40%, rgba(197,164,119,0.3))` como `border-image` o mediante `background-clip`. Alternativa más simple: `outline: 1px solid rgba(229,209,173,0.35)` con `box-shadow: inset 0 0 0 1px rgba(197,164,119,0.15)`.
  3. **Hero.css (fullscreen)**: en `.hero__content`, agregar pseudo-elemento `::before` absoluto con `radial-gradient(ellipse 60% 60% at 20% 50%, rgba(197,164,119,0.08) 0%, transparent 70%)` y `filter: blur(48px)`, z-index por debajo del texto.
  4. **ContactForm**: localizar el CSS de los inputs (`input`, `select`, `textarea`). Aplicar `background: var(--color-neutral-900)` (o la variable equivalente del tema oscuro), `border: 1px solid rgba(197,164,119,0.3)`. En `:focus`: `border-color: var(--color-primary-200)`, `box-shadow: 0 0 0 1px var(--color-primary-200)`. Verificar que en light mode el fondo sea adecuado (usar `var(--color-neutral-100)` en light).
  5. Correr `npm run check:contrast`. Si algún step falla, ajustar la opacidad de los gradientes (nunca el texto).
- **Archivos**:
  - `src/components/ui/Button/Button.css`
  - `src/components/ui/Card/Card.css`
  - `src/components/sections/Hero/Hero.css`
  - Archivo CSS de los inputs del formulario (verificar cuál aplica: `ContactForm.css` o un CSS compartido de inputs)
- **Verificación**:
  - `npm run check && npm run lint`
  - `npm run check:contrast`
  - `npm run build`
  - `npm run dev` → revisar a 375 y 1280 px, dark y light:
    - Botón primary: gradiente visible, glow al hacer hover
    - Card destacada: borde especular sutil
    - Hero: glow radial detrás del texto, no distorsiona la legibilidad
    - Formulario: inputs con estilo oscuro/dorado, focus visible y accesible
- **Modelo sugerido**: Opus (efectos visuales finos, dos temas, riesgo de contraste)
- **Estado**: Implementada
- **Notas de implementación**:
  - Gradiente metálico del botón primary (`primary-100 → primary-500`) scoped a `[data-theme="dark"]` para evitar falla de contraste en light mode (donde el botón es dark gold con texto blanco).
  - Glow hover `rgba(197,164,119,0.4)` + `filter: brightness(1.08)` aplica en ambos temas.
  - Card featured: borde `rgba(229,209,173,0.45)` + `box-shadow: inset 0 1px 0 rgba(229,209,173,0.3)` para especular sutil en lugar de pseudo-elemento complejo.
  - Hero fullscreen: `::before` absoluto con `inset: -40%`, glow radial `rgba(197,164,119,0.08)` y `filter: blur(48px)`. No requiere z-index por painting order de pseudoelementos.
  - ContactForm: `background-color: var(--color-neutral-100)` en light, `var(--color-neutral-900)` en dark vía `[data-theme="dark"]`; borde `rgba(197,164,119,0.3)`; focus-visible con `border-color: var(--color-primary-200)` y `box-shadow: 0 0 0 1px var(--color-primary-200)`.
  - `check:contrast` pasa 162 combinaciones. Build limpio.

---

## Retoques

_Lista vacía._
