# About editorial

Alcance: **plantilla y cliente**. La sección About sale del layout genérico y pasa a una composición editorial. Se tocan tipos, componentes y estilos (plantilla) y contenido e imagen (cliente). Solo About: las demás secciones se revisan después, una por una.

Reemplaza el D12 de `saint-aure-beauty.md` (badge con ícono). Ese plan queda como historia.

Referencia visual: captura de la sección con foto vertical a la izquierda, eyebrow con líneas, título liviano, cita en cursiva dorada, párrafo, link "Escribir por WhatsApp →" y card "16+ años de experiencia" solapada.

---

## Decisiones

**D1 — Sin React.**
`docs/architecture/overview.md` §2 y §12 fijan Astro sin framework de UI, y About no tiene interactividad. "Componente tonto" se resuelve con componentes `.astro` presentacionales: props tipadas, sin lógica de negocio, sin estilos en línea, CSS en un archivo hermano dentro de `@layer components`, clases BEM. Cero JavaScript de cliente. Si más adelante una sección necesita una isla, se justifica en su plan.

**D2 — Composición, de lo genérico a lo específico.**

| Nivel               | Pieza                                                     | Responsabilidad                                                |
| ------------------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| Primitivo `ui/`     | `SectionTitle` (prop `accent`)                            | Eyebrow con líneas y línea fina bajo el título. Solo CSS       |
| Primitivo `ui/`     | `Quote` (nuevo)                                           | Cita tipográfica, reutilizable en otras secciones              |
| Primitivo `ui/`     | `Button` / `ActionButton`                                 | Variante `link` e ícono al final                               |
| Sección             | `About`                                                   | Ordena las piezas y el layout. No define estilos de las piezas |
| Elemento de sección | `about__badge`, `about__description`, `about__image-wrap` | Estilos que solo existen dentro de About                       |

Si un estilo sirve a otra sección, sube a `ui/`. Si no, queda en `About.css`.

**D3 — Imagen.**
`src/assets/images/about.webp` (importada, optimizada por Astro) y copia espejo en `public/works/about/about.webp`, igual que el hero. Origen: `balayage-03.webp`, ya movida. `alt` descriptivo del contenido real de la foto, sin "imagen de". No se pasan `width` ni `height` a mano: `ImageMetadata` los trae.

**D4 — Layout.**
Imagen a la izquierda y fija en `split`, solo con CSS (`order: -1` desde 64rem). El DOM mantiene el contenido primero, así que en mobile el texto va antes que la foto, y el orden de lectura y de foco no cambia. El `badge` ya no es opcional por variante: solo existe en `split`, como hoy.

**D5 — Card de experiencia.**
Mismo dato (`value` y `label`), sin ícono ni ubicación. Es un elemento de About (`about__badge`), no un `Badge` de `ui/`, porque su forma es única de esta composición.

- Fondo: `color-mix(in srgb, var(--color-surface-raised) 92%, transparent)`. Con 92 % el contraste del texto se mantiene casi igual al del token sobre la superficie, sin depender de qué haya detrás en la foto.
- `backdrop-filter: blur()` solo dentro de `@supports`, como mejora. Sin soporte, el 92 % ya es legible.
- Borde de 1 px con el acento al 45 % (`color-mix`), radio chico del preset (`--preset-badge-radius`), sombra `--shadow-default`.
- Número en `--font-heading` liviano, tamaño de display chico, color `--color-accent-text`. `value` es un único string ("16+"): el lector de pantalla anuncia "16+ años de experiencia" completo. No se parte el "+" en otro elemento.
- Hairline entre número y label. Label en `--text-ui`, mayúsculas, tracking de `--eyebrow-tracking`, `--color-text-secondary`.
- Anclada abajo a la derecha de la foto, solapando el borde.
- En modo claro la card es clara (alabastro) con texto oscuro; en oscuro es oscura con texto claro. Es la misma regla con tokens semánticos, no dos diseños.

**D6 — Paleta y temas.**
Se agrega un único token semántico, `--color-accent-text`, para texto decorativo-editorial en dorado (cita, número de la card):

- Oscuro: `var(--color-brand-300)`.
- Claro: `var(--color-brand-700)`.

Entra en `scripts/check-contrast.ts` con mínimo 4,5:1 contra los cinco fondos, en los dos temas. Las líneas decorativas (eyebrow, bajo el título, marco) usan `color-mix(in srgb, var(--color-accent-text) 55%, transparent)`: son decorativas, no comunican información, y no se mezclan hex nuevos. No se escribe ningún hex ni `rgba(197, 164, 119, …)` en los CSS de esta sección (Button.css hoy sí lo hace; no se toca fuera de About).

**D7 — Lenguaje visual.**
Dos referencias, usadas con contención:

- **Programa de teatro (playbill)**: versalitas con tracking amplio, filetes finos, numeral grande liviano, cita como "nota del director".
- **Casa de perfumes (etiqueta y estuche)**: mucho aire, un solo acento dorado, serif liviana, un marco fino desplazado detrás de la foto como la guarda de un estuche.

Marco fino: `about__image-wrap::before`, borde 1 px con el acento al 30 %, desplazado `--space-3` hacia abajo y a la izquierda, decorativo. Es retocable: si recarga la foto, se quita sin afectar nada más.

**D8 — Movimiento.**
Solo CSS, con `transform` y `opacity`, tokens de `motion.css`:

- Entrada de la card y de la cita al aparecer en pantalla (`animation-timeline: view()` dentro de `@supports`, con `@media (prefers-reduced-motion: no-preference)`).
- Flecha del link que se desplaza 0,125 rem al hacer hover o foco.
- Sin parallax, sin autoplay, sin animar layout.

Con `prefers-reduced-motion: reduce` todo queda estático y visible.

**D9 — Accesibilidad.**

- La `section` se asocia a su título con `aria-labelledby` apuntando al `id` del heading de `SectionTitle`. Jerarquía: un `h2` por sección.
- `Quote` es `<figure><blockquote><p>…</p></blockquote><figcaption class="visually-hidden">…</figcaption></figure>`. La atribución a Tomas Mooney queda disponible para lector de pantalla sin duplicarla en pantalla (ya está en el eyebrow). `visually-hidden` ya existe en `utilities/accessibility.css`.
- Las líneas del eyebrow y del título son pseudo-elementos: los lectores de pantalla no las ven. El eyebrow no lleva guiones ni "—" en el texto.
- El link de WhatsApp: el ícono es decorativo (`aria-hidden`), el nombre accesible es el label, foco visible con `--color-focus`, área táctil mínima 2,75 rem (ya garantizada por `.button`).
- `@media (prefers-contrast: more)`: borde de la card al 100 % del acento y sin `backdrop-filter`. `@media (forced-colors: active)`: borde con `CanvasText`/`ButtonText`, sin depender de `color-mix`.
- Zoom y reflow: sin anchos fijos en px, la card pasa a posición estática debajo de la foto si el ancho es menor a 22 rem.
- El `alt` de la foto describe la imagen. El nombre de Tomas Mooney va en el texto, no en el `alt`.

**D10 — OWASP.**

- A03 (inyección y XSS): todo texto va por interpolación de Astro, que escapa. No se usa `set:html` ni `innerHTML` en esta sección. `quote`, `eyebrow`, `title` y `description` son `string` plano.
- A05 (configuración de seguridad): sin `style=` ni `<style>` en línea, así que la CSP con hashes no se toca ni se amplía. Sin scripts nuevos, sin fuentes ni recursos de terceros.
- A04 (diseño inseguro): los contratos tipan `iconPosition` y `variant` como uniones cerradas; `Quote` y `SectionTitle` no aceptan HTML.
- A08 (integridad): sin dependencias nuevas.
- Enlaces externos: `resolveAction` marca WhatsApp con `target="_blank"` y `Button.astro` agrega `rel="noopener noreferrer"`. La etapa 3 lo cubre con un test.
- Privacidad: el número de WhatsApp sale de `site.business.whatsapp` por `getWhatsAppUrl`; no se escribe en el contenido de About.

**D11 — Contenido placeholder.**
Todo en `src/content/page.ts`, sin textos en componentes. Texto presentable que simula el real:

- `eyebrow`: "El profesional — Tomas Mooney". El "—" separa dos datos dentro del string; las líneas decorativas son CSS (D9).
- `title`: "Experiencia, dedicación y atención personalizada"
- `quote`: "Cada trabajo es único. Lo que más valoro es escuchar qué querés y acompañarte para que el resultado sea exactamente el que buscás."
- `description`: "Desde la elección minuciosa de cada matiz hasta la arquitectura de peinados que deben resistir horas de emoción y movimiento, cada sesión se concibe como una obra a medida. Trabajamos bajo un estándar de hospitalidad serena, asegurando que tu momento de preparación sea tan placentero como el resultado final."
- `action`: `{ label: "Escribir por WhatsApp", whatsapp: { message }, variant: "link", icon: "arrow-right", iconPosition: "end" }`
- `badge`: `{ value: "16+", label: "años de experiencia" }`
- `image`: `about.webp` con `alt: "Cabello largo con ondas balayage y reflejos dorados, visto desde atrás"`.

El registro es "Trabajamos" (plural) para no depender del género de quien habla. No se aplica "Conocer más".

**D12 — Qué no se toca.**
Hero, Services, Gallery, Stats, Testimonials, CTA y Contact. `Button.css` solo suma la variante `link`; no se reescribe el gradiente ni el glow existentes. El copy en primera persona femenina de Contact y Services ("Escribime", "mi espacio") se revisa cuando toque cada sección.

---

## Plan por etapas

Cada etapa se implementa en una sesión nueva con `/etapas docs/plans/about-editorial.md <número>`.

### Etapa 1: Token de acento y contraste

- **Objetivo**: existe `--color-accent-text` en ambos temas y `npm run check:contrast` lo valida contra todos los fondos. Nada visible cambia todavía.
- **Leer antes**: D6; `src/styles/themes/light.css`, `src/styles/themes/dark.css`, `scripts/check-contrast.ts`.
- **Archivos**:
  - `src/styles/themes/light.css` y `src/styles/themes/dark.css`: agregar `--color-accent-text` en el bloque de Links.
  - `scripts/check-contrast.ts`: sumar `accent-text` a la regla de texto (4,5:1).
- **Verificación**: `npm run check:contrast` (debe subir la cantidad de combinaciones y pasar), `npm run check`, `npm run lint`, `npm run format:check`. Si falla, el ajuste va en la escala de `site.ts` y no en el componente.
- **Modelo sugerido**: Opus (paleta y contraste en dos temas).
- **Estado**: Implementada.

### Etapa 2: Primitivos editoriales (SectionTitle accent y Quote)

- **Objetivo**: `SectionTitle` acepta `accent` y muestra el eyebrow con líneas y la línea fina bajo el título. Existe `ui/Quote`. Ambos se ven en el catálogo sin usarse todavía en About.
- **Leer antes**: D2, D6, D7, D9, D10; skill `landing-design`; `src/components/ui/SectionTitle/SectionTitle.astro` y `.css`; `src/styles/utilities/accessibility.css`; `src/styles/tokens/typography.css`; `src/dev/` (cómo se muestran los primitivos en el catálogo).
- **Archivos**:
  - `src/components/ui/SectionTitle/SectionTitle.astro`: prop `accent?: boolean` que suma `section-title--accent`. Sin markup nuevo.
  - `src/components/ui/SectionTitle/SectionTitle.css`: líneas con `::before`/`::after` del eyebrow y filete bajo el heading, alineados a `start` y a `center`.
  - `src/components/ui/Quote/Quote.astro` y `Quote.css` (nuevos): props `text` y `author?`, estructura de D9, cursiva, `--font-heading`, `--color-accent-text`.
  - `src/dev/` (catálogo): una entrada de `Quote` y de `SectionTitle accent`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`; catálogo `/dev/components` a 375 y 1280 px, temas claro y oscuro, los tres presets; revisar que el filete no rompa `align="center"`.
- **Modelo sugerido**: Opus (diseño visual y accesibilidad de dos primitivos).
- **Estado**: Pendiente.

### Etapa 3: Acción tipo link con ícono al final

- **Objetivo**: una acción puede ser `variant: "link"` (sin borde, mayúsculas, tracking) con `iconPosition: "end"`, y la flecha se desplaza apenas al hover y al foco.
- **Leer antes**: D8, D9, D10; `src/types/action.ts`, `src/utils/action.ts`, `src/components/ui/ActionButton/ActionButton.astro`, `src/components/ui/Button/Button.css` (solo bloque de variantes), `src/components/ui/Icon/Icon.astro`.
- **Archivos**:
  - `src/types/action.ts`: `ActionVariant` suma `"link"`; `ActionBase` suma `iconPosition?: "start" | "end"`.
  - `src/utils/action.ts` y `ResolvedAction`: transportar `iconPosition`.
  - `src/components/ui/ActionButton/ActionButton.astro`: renderizar el ícono antes o después del label.
  - `src/components/ui/Button/Button.css`: `.button--link` con las variables `--button-*`, sin borde ni fondo, `text-transform: uppercase`, tracking de `--eyebrow-tracking`; transición de `transform` en el ícono final, solo con `prefers-reduced-motion: no-preference`.
  - `tests/e2e/interactions.spec.ts` o spec nuevo: el link de WhatsApp tiene `target="_blank"` y `rel` con `noopener`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`; `npm run check:contrast`; catálogo a 375 y 1280 px en ambos temas; foco por teclado visible sobre el link; `npm run build` y el spec modificado.
- **Modelo sugerido**: Sonnet (sigue el patrón de las variantes existentes).
- **Estado**: Pendiente.

### Etapa 4: Composición de About y contenido

- **Objetivo**: About muestra la composición de la referencia: foto a la izquierda con marco fino, eyebrow decorado, título, filete, cita, descripción, link de WhatsApp y la card de experiencia rediseñada, con el contenido de D11, en ambos temas.
- **Leer antes**: D2 a D5, D7, D9, D11, D12; skill `landing-design`; `src/types/about.ts`, `About.astro`, `About.css`; `src/content/page.ts` (solo la sección about); `src/utils/image-sizes.ts`.
- **Archivos**:
  - `src/types/about.ts`: `quote?: string` en `AboutStandard`.
  - `src/components/sections/About/About.astro`: `aria-labelledby`, `SectionTitle accent` sin `description`, `Quote`, `<p class="about__description">`, badge sin ícono (`about__badge-value`, `about__badge-label`).
  - `src/components/sections/About/About.css`: `order: -1` desde 64rem, marco fino, card de D5, `about__description`, `@supports` del blur, `prefers-contrast`, `forced-colors`, card estática bajo 22 rem.
  - `src/content/page.ts`: contenido de D11 e `import about from "@/assets/images/about.webp"`.
  - Imagen: `src/assets/images/about.webp` y `public/works/about/about.webp` (ya en el árbol de trabajo, se commitean acá). Evaluar el PNG sin trackear de `public/works/` con Camila antes de incluirlo; por defecto queda afuera.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`; catálogo y home a 375, 768 y 1280 px; claro y oscuro; presets editorial, modern y elegant; zoom al 200 % y 400 % sin pérdida de contenido; texto largo en la cita; navegación con teclado; `npm run build`.
- **Modelo sugerido**: Opus (composición visual, contrato nuevo, accesibilidad de la card).
- **Estado**: Pendiente.

### Etapa 5: Movimiento y modos de accesibilidad

- **Objetivo**: la card y la cita entran con un fade y un desplazamiento mínimos al aparecer en pantalla; con `prefers-reduced-motion`, `prefers-contrast` y `forced-colors` la sección se ve completa y legible.
- **Leer antes**: D8, D9; skill `landing-motion`; `src/styles/tokens/motion.css`; `About.css` y `Quote.css` tal como quedaron.
- **Archivos**:
  - `src/components/sections/About/About.css`: animación de entrada de `about__badge`, dentro de `@supports (animation-timeline: view())` y `@media (prefers-reduced-motion: no-preference)`.
  - `src/components/ui/Quote/Quote.css`: la misma entrada, escalonada con `--duration-reveal`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`; en el navegador: scroll con y sin reducción de movimiento (DevTools, Rendering), contraste aumentado, colores forzados de Windows; sin saltos de layout (CLS); `npm run build`.
- **Modelo sugerido**: Opus (movimiento fino y modos de accesibilidad).
- **Estado**: Pendiente.

### Etapa 6: Tests, auditoría y cierre

- **Objetivo**: hay cobertura automática de About (estructura, accesibilidad, enlace de WhatsApp, sin desborde) y el plan se cierra.
- **Leer antes**: este plan; `tests/e2e/accessibility.spec.ts`, `tests/e2e/layout.spec.ts`, `tests/e2e/fixtures.ts`.
- **Archivos**:
  - `tests/e2e/accessibility.spec.ts`: axe sobre `#about` en claro y oscuro, desktop y mobile.
  - `tests/e2e/layout.spec.ts`: sin desborde horizontal de 320 a 1440 px con About.
  - `tests/e2e/interactions.spec.ts`: el link de WhatsApp (`href` a `wa.me`, `target`, `rel`).
  - `docs/architecture/overview.md`: sección 4.2 de About (imagen fija a la izquierda en Split, cita, badge) y sección 4.4 (`Quote`, `accent` en `SectionTitle`, variante `link`).
  - `README.md`: nada que cambiar en la tabla de variantes (About ya figura); anotar en la lista de pendientes de Saint Aure que el texto y la foto de About son provisorios.
- **Verificación**: `npm run build`, `npm run test:e2e` completo, `npm run check:contrast`, `npm run check`, `npm run lint`, `npm run format:check`. Revisión final en navegador a 375 y 1280 px en ambos temas.
- **Cierre del plan**: llevar a `docs/architecture/overview.md` lo indicado, borrar `docs/plans/about-editorial.md` y commitear `docs: close about-editorial plan`.
- **Modelo sugerido**: Sonnet (tests y documentación sobre lo ya decidido).
- **Estado**: Pendiente.

---

## Retoques

_Lista vacía._
