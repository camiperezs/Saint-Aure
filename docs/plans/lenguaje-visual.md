# Lenguaje visual Saint Aure (superficies y Stats)

Alcance: **plantilla** (tokens, utilidad, variante de Stats y migración de secciones), con el contenido de Saint Aure en `src/content/page.ts`. Se hace en la rama del proyecto de Saint Aure; si otros clientes heredan la plantilla, las variantes nuevas son opt-in y no cambian `cards`/`row`.

## Contexto

Las secciones ya trabajadas (Hero split, CTA badge, Gallery portfolio) comparten un vocabulario que nunca se definió como sistema: filete de 1 px dorado, eyebrow en mayúsculas con tracking amplio, acento dorado (`--color-link`), título sans con palabra serif itálica, botones pill, paneles translúcidos con `color-mix` y borde de 1 px. Stats (`src/components/sections/Stats/Stats.css:16-22`) usa en cambio el estilo genérico `--preset-card-*` (caja, radio grande, borde), que no coincide. Además un dato textual ("Rosario & Roldán") convive con números al mismo tamaño y rompe el ritmo.

## Decisiones

- **D1 — Los valores se definen una vez, como tokens.** Archivo nuevo `src/styles/tokens/surfaces.css` (importado en `global.css` en la capa `tokens`): `--surface-panel-bg`, `--surface-panel-border`, `--surface-panel-border-hover`, `--surface-rule-color`, `--surface-rule-size`. Todo sale de tokens semánticos existentes, sin hex.
- **D2 — Utilidad `.panel`** en `src/styles/utilities/panel.css` (capa `utilities`): fondo translúcido, borde de 1 px, radio `--preset-card-radius`, sin sombra (la elevación se declara una vez). Hover solo con `(hover: hover) and (pointer: fine)`: el borde pasa al dorado, sin zoom ni sombra. Modificador `.panel--ruled`: filete dorado de 32 px arriba, igual al del hero.
- **D3 — Stats gana la variante `ruled`** (opción A): sin caja, separadores verticales de 1 px entre columnas (horizontales en mobile), valor en dorado, label en mayúsculas con tracking (voz del eyebrow), descripción en peso 300. `cards` y `row` quedan intactas.
- **D4 — Valores textuales.** `StatItem` suma `kind?: "number" | "text"` (por defecto `number`). `text` usa `--font-heading` itálica y un tamaño menor, para no competir con los números. Se resuelve con clase (`stats__value--text`), nunca con `style=""` (CSP).
- **D5 — `tabular-nums`** en `.stats__value` cuando es número.
- **D6 — Documentación.** El sistema queda escrito en `docs/architecture/` (sección "Lenguaje visual": tokens, `.panel`, filete, eyebrow) y es la referencia al migrar cada sección.
- **D7 — Migración de las demás secciones** solo cuando el cambio sea visible y justificado; las que ya funcionan (Hero, Gallery, CTA) pasan a consumir los tokens sin cambiar su aspecto.

## Plan por etapas

Cada etapa se implementa en una sesión nueva con `/etapas docs/plans/lenguaje-visual.md <número>`.

### Etapa 1: Tokens de superficie y utilidad `.panel`

- **Objetivo**: existen los tokens y `.panel` / `.panel--ruled`, probados en el catálogo en ambos temas; el CTA badge los consume sin cambiar de aspecto.
- **Leer antes**: D1, D2; `src/styles/global.css`, `src/styles/tokens/borders.css`, `src/components/sections/CallToAction/CallToAction.css`; skill `landing-design`.
- **Archivos**: `src/styles/tokens/surfaces.css` (nuevo), `src/styles/utilities/panel.css` (nuevo), `src/styles/global.css`, `src/components/sections/CallToAction/CallToAction.css`, `src/dev/Catalog.astro` y `src/dev/catalog.css` (muestra del panel).
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`; catálogo `/dev/components` a 375 y 1280 px, claro y oscuro, tres presets; el CTA badge se ve igual que antes.
- **Modelo sugerido**: Opus (decisión de tokens y contraste del dorado sobre fondo translúcido).
- **Estado**: Implementada.

### Etapa 2: Stats `ruled` y valores textuales

- **Objetivo**: `Stats` soporta `variant: "ruled"` y `kind: "text"`; la landing de Saint Aure la usa y los tres datos conviven con buen ritmo.
- **Leer antes**: D3 a D5; `src/types/stats.ts`, `src/components/sections/Stats/Stats.astro` y `Stats.css`, el bloque `stats` de `src/content/page.ts`; skills `landing-design` y `landing-motion` (solo si se anima la aparición).
- **Archivos**: `src/types/stats.ts`, `src/components/sections/Stats/Stats.astro`, `src/components/sections/Stats/Stats.css`, `src/content/page.ts`, `src/dev/Catalog.astro`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`; catálogo y página real a 320, 375 y 1280 px, claro y oscuro, contenido largo; `npm run build` y el spec e2e que cubra Stats, si existe.
- **Modelo sugerido**: Opus (diseño visual y contrato nuevo).
- **Estado**: Implementada. Los valores `text` usan `--text-title`; falta revisión visual en navegador (320/375/1280, claro/oscuro).

### Etapa 3: Documentar y migrar secciones

- **Objetivo**: el lenguaje visual está documentado y Services, Process, Testimonials y FAQ se contrastan contra él; se migran solo las que hoy usan cajas genéricas sin motivo.
- **Leer antes**: D6, D7; `docs/architecture/overview.md`, los `.css` de Services, Process, Testimonials y FAQ; skill `landing-audit`.
- **Archivos**: `docs/architecture/overview.md` (sección Lenguaje visual), los `.css` de las secciones que se migren, `README.md` si cambia la tabla de variantes.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`; catálogo en los dos temas y tres presets; `npm run build` y `npm run test:e2e`.
- **Modelo sugerido**: Sonnet (sigue el patrón de las etapas 1 y 2), salvo que la auditoría pida rediseño.
- **Estado**: Implementada. Se migraron las tarjetas de Testimonials a `.panel panel--ruled`; Services, Process y FAQ no cambian (sin motivo visible).

## Retoques

Ajustes chicos que aparecen durante las etapas y se aplican juntos al final.
