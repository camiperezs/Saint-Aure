# Orden del proyecto

Alcance: **plantilla** (etapas 1 a 4) y **cliente** (etapa 5).

Origen: auditoría de inventario de componentes (plantilla + cliente Saint Aure). Todo cambio de la plantilla debe seguir funcionando con otro cliente: sin colores, textos ni imágenes de Saint Aure dentro de `src/components/`, `src/styles/` ni `src/scripts/`.

## Decisiones

- **D1 — Colores de marca fuera de componentes.** Los `rgba(197, 164, 119, …)` (`#c5a477`, brand-500 del cliente) y `rgba(229, 209, 173, …)` (champagne del `DESIGN.md`) escritos en CSS de la plantilla se reemplazan por `color-mix()` sobre tokens existentes (`--color-brand-*`, `--color-accent*`) o por tokens semánticos nuevos en `src/styles/tokens/` (por ejemplo `--color-accent-soft`, `--shadow-glow`). Ningún `#hex` ni `rgba()` fuera de `tokens/`, `themes/`, `presets/` y la paleta de `site.ts`.
- **D2 — HeroHairFlow se queda tal cual.** No se renombra ni se elimina. Solo se revisan sus colores y valores hardcodeados contra D1; la opción `hero.hairFlow` y el contrato no cambian.
- **D3 — ServiceCatalog es código solo de Saint Aure.** No se generaliza ni se renombra. Se documenta como excepción conocida en `docs/architecture/overview.md` (vive en la plantilla pero lo usa un solo cliente). Solo se le quita el color hardcodeado (`black 80%`) pasándolo a un token de overlay.
- **D4 — Tokens sin uso se conservan.** Los 17 tokens sin consumidores (`--space-10/16/20/32`, `--elevation-*`, `--ease-*`, `--radius-2xl`, `--focus-radius`, `--grid-gap-compact`, `--section-spacing-compact`, `--active-opacity`, `--hover-opacity`, `--space-fluid-sm`) son escala de plantilla. No se borran. Se borran las imágenes y placeholders sobrantes.
- **D5 — Logo preparado, todavía sin archivo.** El logo es opcional en la configuración del cliente. Header, Footer y el JSON-LD lo muestran si existe y, si no, siguen mostrando el texto de marca como hoy. Sin logo no cambia nada visual. Reglas: `alt` igual al nombre de marca (o vacío si el nombre ya está visible al lado), `width` y `height` reservados para evitar CLS, un solo archivo con variante clara/oscura solo si el cliente la entrega. El badge de `CallToAction` ya acepta `image` y no cambia. La ruta final del logo la define la etapa 4 según `src/types/site.ts` y `src/types/image.ts`.
- **D6 — La imagen PNG se convierte a WebP con transparencia.** `public/works/Mujer de espaldas con cabello ondulado sin fondo.png` (1,7 MB, con espacios en el nombre) pasa a `.webp` con canal alfa usando `sharp` (ya es devDependency), con nombre sin espacios ni tildes y en `public/works/hero/`. El conversor es un script descartable fuera del repo (scratchpad), no se agrega a `package.json`. El PNG original se elimina después de verificar el WebP. La imagen todavía no se usa en el hero: eso es trabajo posterior.

## Plan por etapas

Cada etapa se implementa en una sesión nueva con `/etapas docs/plans/orden-proyecto.md <número>`.

### Etapa 1: Colores de marca a tokens (P0)

- **Objetivo**: ningún color del cliente queda escrito en CSS de la plantilla; cambiar la paleta en `site.ts` cambia también esos bordes, halos y glows.
- **Leer antes**: D1; `src/styles/tokens/colors.css`, `src/styles/tokens/surfaces.css`, `src/styles/tokens/interaction.css`; skill `landing-design`.
- **Archivos**: `src/components/forms/ContactForm/ContactForm.css:32`, `src/components/sections/Hero/Hero.css:78`, `src/components/ui/Button/Button.css:122`, `src/components/ui/Card/Card.css:15,17`; token nuevo en `src/styles/tokens/` si hace falta; `src/components/sections/Hero/HeroHairFlow.css` y `src/components/sections/Hero/Hero.css:123` (revisar colores y comentario, según D2).
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`. Catálogo `/dev/components` a 375 y 1280 px, claro y oscuro, los tres presets. Confirmar con grep que no quedan `rgba(197`, `rgba(229` ni `#c5a477` fuera de `site.ts`.
- **Modelo sugerido**: Opus (decisión de tokens semánticos y contraste).
- **Estado**: Implementada. Tokens nuevos en `surfaces.css`: `--color-accent-soft`, `--color-accent-border`, `--color-accent-border-strong`, `--color-accent-highlight`, `--shadow-glow` (la etapa 3 los reutiliza). `HeroHairFlow.css` no tenía colores fijos. Sin revisión visual en navegador (solo check, lint, contraste y grep). `format:check` falla en 6 archivos previos ajenos a la etapa.

### Etapa 2: Hero.css sin duplicados ni px

- **Objetivo**: `Hero.css` más corto y sin valores fijos, con el hero idéntico a la vista.
- **Leer antes**: D1, D2; `src/components/sections/Hero/Hero.css`, `src/types/hero.ts`; skills `landing-design` y `landing-motion`.
- **Archivos**: `src/components/sections/Hero/Hero.css`: los dos degradados de 6 paradas (`to right` / `to left`, líneas ~472 y ~492) pasan a una variable con la dirección; `font-size` de 11px, 12px y 18px (líneas ~323, 368, 411) pasan a `rem` o a tokens de tipografía; revisar el `font-family: var(--font-body)` forzado en el título `split` contra la regla del preset; duraciones literales de `animation` hacia los tokens de `motion.css` donde exista equivalente.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`. Catálogo, variantes `fullscreen`, `compact` y `split` (con `image-left`), 375 y 1280 px, claro y oscuro. Comprobar `prefers-reduced-motion`.
- **Modelo sugerido**: Opus (tocar el hero con movimiento y tres variantes).
- **Estado**: Pendiente.

### Etapa 3: Literales restantes (íconos, glows, overlay)

- **Objetivo**: tamaños de ícono, glows y overlays salen de tokens; ServiceCatalog queda sin colores fijos.
- **Leer antes**: D1, D3; `src/styles/tokens/typography.css`, `src/styles/tokens/interaction.css`, `src/styles/utilities/overlay.css`; skill `landing-design`.
- **Archivos**: token de tamaño de ícono en `src/styles/tokens/` y su uso en `CallToAction.css:84`, `Contact.css:34,67`, `Gallery.css:166`, `Embed.css:36`, `Icon.css:16`, `ThemeToggle.css:31`, `WhatsAppButton.css:13`, `FAQ.css:61`; `--shadow-glow` (o equivalente) compartido por `Button.css` y `Hero.css:380,392` (si la etapa 1 no lo dejó creado); `ServiceCatalog.css:83` usa un token de overlay oscuro de `overlay.css`; `About.css` y `Hero.css` unifican los `color-mix` repetidos con un token `--color-accent-soft` (si la etapa 1 lo creó, reutilizarlo).
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`. Catálogo a 375 y 1280 px, claro y oscuro, los tres presets; la variante `catalog` de Services con el overlay.
- **Modelo sugerido**: Sonnet (sigue el patrón de tokens de las etapas 1 y 2).
- **Estado**: Pendiente.

### Etapa 4: Logo preparado

- **Objetivo**: Header, Footer y datos estructurados aceptan un logo opcional; sin logo todo se ve y funciona igual que hoy.
- **Leer antes**: D5; `src/types/site.ts`, `src/types/image.ts`, `src/types/business.ts`, `src/types/navigation.ts`; `src/components/layout/Header/Header.astro` y `.css`, `src/components/layout/Footer/Footer.astro` y `.css`, `src/utils/structured-data.ts`, `src/layouts/BaseLayout.astro` (cómo se pasan `brand` a Header y Footer); skills `landing-design` y `landing-conversion` (guía de marca en el encabezado).
- **Archivos**: contrato en `src/types/` con el campo opcional del logo; `Header.astro` y `.css`, `Footer.astro` y `.css` (logo con `Media` o `<img>` con dimensiones; texto de marca como fallback y como nombre accesible); `src/utils/structured-data.ts` (usar `business.logo` solo si existe); `src/config/site.ts` (sin logo todavía, dejando un comentario o campo comentado que indique dónde ponerlo); `src/dev/UiPrimitives.astro` o el catálogo con un caso "con logo" usando un SVG o placeholder; actualizar `docs/guides/new-landing.md` con cómo cargar el logo.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`. Catálogo y `npm run dev` a 375 y 1280 px, claro y oscuro, con y sin logo. `npm run build` y `npm run test:e2e` (specs de header y SEO).
- **Modelo sugerido**: Opus (contrato nuevo, accesibilidad y CLS).
- **Estado**: Pendiente.

### Etapa 5: Assets del cliente y cierre del plan

- **Objetivo**: sin imágenes sobrantes, el PNG convertido a WebP y la documentación al día.
- **Leer antes**: D3, D4, D6; `src/content/page.ts` (confirmar rutas en uso), `docs/architecture/overview.md`.
- **Archivos**:
  - Convertir `public/works/Mujer de espaldas con cabello ondulado sin fondo.png` a `public/works/hero/mujer-espaldas-cabello-ondulado.webp` con `sharp` (calidad ~85, conserva alfa, ancho máximo según el hero) usando un script en el scratchpad; verificar el resultado (tamaño y transparencia) y recién entonces eliminar el PNG.
  - Antes de borrar, comprobar con grep que `page.ts` y `site.ts` no usan por otra ruta: `src/assets/images/about.webp`, `hero.webp`, `sample.webp`, `public/works/about/about.webp`, `public/works/hero/hero.webp`, `public/works/novia/novia.webp`, `public/placeholders/logo-1…5.svg`. Borrar los que no tengan uso; los que sí tengan, dejarlos y anotarlo.
  - `docs/architecture/overview.md`: anotar D1 (colores solo en tokens), D3 (ServiceCatalog solo de Saint Aure) y D5 (logo opcional).
  - Cierre según la skill: borrar este plan y commitear `docs: close orden-proyecto plan`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run build`, `npm run test:e2e` completo y `npm run check:launch`.
- **Modelo sugerido**: Sonnet (contenido y limpieza).
- **Estado**: Pendiente.

## Retoques

Ajustes chicos que aparecen durante las etapas y se aplican juntos al final.

- (vacío)
