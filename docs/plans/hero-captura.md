# Hero como en la captura (Stitch "Landing Editorial Desktop")

Alcance: plantilla (componente `Hero`) + cliente (`page.ts`, imagen en `src/assets/images/`).

Referencia visual: captura del diseño Stitch y `design/stitch-export/.../saint_aure_beauty_house_landing_editorial_desktop_luxury/code.html`.

## Decisiones

- **D1 — Variante**: el hero de Saint Aure pasa de `fullscreen` a `split` con `imagePosition: "right"` y `ratio: "image"` (grid `2fr 3fr` ≈ 40/60, lo más cercano al 42/58 de la captura). La variante `fullscreen` y su CSS se mantienen en la plantilla: solo cambia el contenido del cliente.
- **D2 — Imagen**: `public/works/peinado.webp` (1279×1600, untracked) se copia a `src/assets/images/peinado.webp` y se importa como `ImageMetadata`, para que Astro la optimice. `public/works/` no se toca ni se commitea.
- **D3 — Badge circular: no se implementa.** Ni en el hero ni como componente. El hero no tendrá ningún badge con logo. El badge "16+" de About (Etapa 5 del plan anterior) es otro elemento y no se modifica.
- **D4 — Franja editorial**: se renderiza también en la variante `split` (hoy solo existe en `fullscreen`). Texto tomado de `page.ts` sin cambios de copy, con separadores `/` como en D11 del plan anterior. Estilo: filete superior dorado al 10%, uppercase, tracking 0.24em, tamaño 11px.
- **D5 — Paleta del hero**: el hero usa propiedades locales en `Hero.css` con los valores de la captura (`#0B0908` fondo, `#151312` superficies, `#F2EDE5` texto, `#A89582` texto secundario, `#C5A477` dorado = `--color-primary-500`, `#E5D1AD` y `#B38F5F` para el gradiente). El hero es oscuro en ambos temas. Se revisa con `check:contrast`. Pasar estos valores a tokens de tema queda como posible trabajo futuro.
- **D6 — Tipografía**: títulos en Playfair Display (`--font-heading`), resto en DM Sans, según `DESIGN.md`. Se verifica en el navegador que `--font-heading` resuelve a Playfair antes de ajustar tamaños.
- **D7 — Escala de texto del hero** (solo hero): título `clamp(2.25rem, 4vw, 3.5rem)`, line-height 1.08, tracking `-0.02em`. Descripción 18px en desktop, peso 300. Eyebrow 11px con línea decorativa de 32px antes del texto.
- **D8 — Botones del hero**: pill (`border-radius: 9999px`) solo dentro del hero, para no cambiar el preset `editorial` (que usa botones cuadrados en todo el sitio). Texto 12px, uppercase, tracking 0.16em, semibold. Primario con gradiente metálico también en tema claro y glow permanente (`0 0 25px rgba(197,164,119,.35)`), que sube en hover. Secundario con fondo `#292725` y borde dorado al 25%.
- **D9 — Layout**: en desktop (≥64rem) la imagen va de borde a borde del viewport (sin gutter del contenedor) y la sección ocupa `min-block-size: 92svh`. Sin padding vertical en la sección; el padding vive en la columna de texto (96px). El texto usa padding horizontal de 64px. Debajo de 64rem, las columnas se apilan: texto primero, imagen después, con altura mínima de 460px.
- **D10 — Overlay de la imagen**: degradado lateral desde `#0B0908` (izquierda) a transparente al 40%, más una viñeta radial a `#0B0908` al 70% en los bordes. Se implementa con un wrapper `.hero__media` y pseudo-elementos `::after`, porque los `<img>` no admiten pseudo-elementos. En mobile el degradado pasa a vertical.
- **D11 — Movimiento**: la imagen arranca con `scale(1.05)` y vuelve a `scale(1)` en hover, con `transition` de 1s. Se desactiva con `prefers-reduced-motion`.
- **D12 — Fuera de alcance**: el header (la captura muestra "Reservar cita" y el header actual dice "Consultar por WhatsApp"; no se cambia en este plan), el glow `::before` de `fullscreen`, el badge de About, y la sección Gallery (`#gallery` ya es el id por defecto y coincide con "Ver trabajos").

## Plan por etapas

Cada etapa se implementa en una sesión nueva con `/etapas docs/plans/hero-captura.md <número>`. Cada etapa deja la build y el catálogo funcionando.

### Etapa 1: Contrato, markup y contenido del hero

- **Objetivo**: el hero de Saint Aure es `split` con la foto de peinado a la derecha, la franja editorial visible y sin badge. Todavía sin estilos finales; el objetivo es que la estructura esté bien antes de tocar CSS.
- **Leer antes**: D1, D2, D3, D4. Archivos: `src/types/hero.ts`, `src/components/sections/Hero/Hero.astro`, `src/content/page.ts` (líneas del hero).
- **Archivos**:
  - `src/assets/images/peinado.webp` (copia de `public/works/peinado.webp`, binario nuevo).
  - `src/types/hero.ts`: agregar `editorial?: string` a `HeroSplit`.
  - `src/components/sections/Hero/Hero.astro`: en la variante `split`, envolver `<Media>` en `<div class="hero__media">` y renderizar `{hero.editorial && <p class="hero__editorial">…</p>}` dentro de `.hero__inner`, fuera de `.hero__content`.
  - `src/content/page.ts`: `variant: "split"`, `imagePosition: "right"`, `ratio: "image"`, `image: { src: peinado, alt: "Peinado recogido con ondas, vista desde atrás" }` con `import peinado from "@/assets/images/peinado.webp"`. Quitar `overlay` y `focalPoint`. Mantener `editorial`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run build`. En `/dev/components` y en la home a 1280 px: la foto aparece a la derecha, la franja se ve debajo del texto, y no hay ningún elemento circular con logo en el hero (buscar en el DOM `.hero` que no exista nada con `border-radius: 50%`).
- **Modelo sugerido**: Sonnet (cambio de contrato y markup siguiendo el patrón de `split`).
- **Estado**: Pendiente.

### Etapa 2: Layout, imagen y overlay

- **Objetivo**: columnas 40/60 de borde a borde, altura 92svh, degradado lateral y viñeta sobre la foto, y movimiento de la imagen en hover.
- **Leer antes**: D8 (no aplica acá), D9, D10, D11. Archivos: `src/components/sections/Hero/Hero.css`, `src/styles/utilities/containers.css` (para entender el padding del contenedor wide).
- **Archivos**: `src/components/sections/Hero/Hero.css` (solo reglas `.hero--split…` y `.hero__media`, `.hero__image`).
- **Verificación**: catálogo y home a 1280 y 1920 px. Comparar con la captura: la imagen llega al borde derecho, el corte entre texto y foto es suave, la altura es ~92svh. A 375 px: columna única, texto arriba, foto de 460px mínimo. Revisar en tema claro y oscuro. Hover sobre la imagen: escala 1.05→1.
- **Modelo sugerido**: Opus (composición visual y responsive).
- **Estado**: Pendiente.

### Etapa 3: Tipografía, eyebrow, descripción y franja editorial

- **Objetivo**: tipografía y espaciado del hero iguales a la captura.
- **Leer antes**: D4, D6, D7. Archivos: `src/components/sections/Hero/Hero.css`, `src/styles/tokens/typography.css`, `src/styles/presets/editorial.css`.
- **Archivos**: `src/components/sections/Hero/Hero.css` (reglas `.hero--split .hero__eyebrow`, `.hero--split .hero__title`, `.hero--split .hero__description`, `.hero--split .hero__editorial`).
- **Verificación**: en el navegador, `getComputedStyle` del `h1` muestra Playfair Display y ~56px a 1280 px; el eyebrow tiene la línea antes; la descripción tiene peso 300. Revisar que `text-wrap: balance` no deje títulos de una sola palabra en la última línea.
- **Modelo sugerido**: Opus (ajuste fino de tipografía).
- **Estado**: Pendiente.

### Etapa 4: Botones del hero

- **Objetivo**: los dos botones del hero tienen el estilo pill, gradiente y glow de la captura, sin cambiar los botones del resto del sitio.
- **Leer antes**: D8. Archivos: `src/components/ui/Button/Button.css` (solo para no romper variantes), `src/components/ui/Actions/Actions.astro` y `ActionButton.astro` (confirmar cómo se pasan las clases de `.button--primary` y `.button--outline`).
- **Archivos**: `src/components/sections/Hero/Hero.css` (reglas con `.hero--split .button…`). No tocar `Button.css`.
- **Verificación**: en el catálogo, un botón de `.hero--split` tiene `border-radius` de 9999px y el de la sección Services sigue cuadrado (preset editorial). Hover en primario: glow más intenso. Estado `aria-disabled` y foco visible (`--color-focus`) siguen funcionando. Correr `npm run check:contrast`.
- **Modelo sugerido**: Sonnet (reglas CSS acotadas y patrón existente).
- **Estado**: Pendiente.

### Etapa 5: Responsive, accesibilidad y temas

- **Objetivo**: el hero se ve bien en todos los anchos y temas, y cumple accesibilidad.
- **Leer antes**: D5, D9, D10, D11. Archivos: `src/components/sections/Hero/Hero.css`, `src/styles/utilities/accessibility.css`.
- **Archivos**: `src/components/sections/Hero/Hero.css` (ajustes de breakpoints y de `prefers-reduced-motion`).
- **Verificación**: catálogo a 375, 768, 1024 y 1440 px, tema claro y oscuro, los tres presets. Sin scroll horizontal (`document.documentElement.scrollWidth === clientWidth`). `prefers-reduced-motion: reduce` desactiva el hover de la imagen. Correr `npm run check:contrast`.
- **Modelo sugerido**: Sonnet (verificación y ajustes puntuales).
- **Estado**: Pendiente.

### Etapa 6: Cierre

- **Objetivo**: build, e2e y auditoría completos, y limpieza del plan.
- **Leer antes**: nada más que el plan.
- **Archivos**: `docs/architecture/overview.md` si el hero `split` con overlay cambia algún contrato (agregar el campo `editorial` a `HeroSplit`); `README.md` si la tabla de variantes lo menciona.
- **Verificación**: `npm run build`, `npm run test:e2e` completo, `npm run check:launch`. Comparar la home contra la captura a 1280 px una última vez.
- **Modelo sugerido**: Sonnet.
- **Estado**: Pendiente.

Al cerrar: borrar este archivo (`docs/plans/hero-captura.md`) en la misma sesión, como indica la skill.

## Retoques

Ninguno todavía.
