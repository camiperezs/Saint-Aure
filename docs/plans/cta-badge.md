# CTA badge

Alcance: plantilla (etapa 1) y cliente (etapa 2).

Referencia de diseño: mockup "¿Tenés algo en mente para tu cabello?": panel oscuro translúcido con borde fino, badge circular con el logo arriba, título grande, descripción corta y botón dorado en píldora con ícono de WhatsApp.

## Decisiones

- **D1 — Reemplaza, no se suma**: la sección nueva sustituye al CTA actual (variante `highlight`, debajo de Testimonios). Al terminar hay un solo bloque `cta` en `page.ts`, ubicado justo debajo de `gallery`.
- **D2 — Variante, no componente**: se reutiliza `CallToAction.astro` con una variante nueva `badge`. No se crea un componente aparte.
- **D3 — `highlight` se elimina**: ya nadie la usa y `badge` la reemplaza. Se retira del tipo `CTA`, de `CallToAction.css` (reglas `.cta--highlight*`), de `catalog.ts` y de `docs/architecture/overview.md`. `simple` y `split` se conservan porque son variantes genéricas de la plantilla. Antes de borrar, buscar usos de `highlight` con grep.
- **D4 — Tema**: la variante usa `data-theme="dark"` en la sección (como el portfolio de Gallery, vía la prop `theme` de `SectionShell`) y solo tokens, nada hardcodeado. El panel se ve oscuro en ambos temas globales. Si `CallToAction` no usa `SectionShell`, aplicar `data-theme` directamente en su `<section>`.
- **D5 — Imagen**: en `badge`, `image` es el logo y se muestra como círculo pequeño centrado sobre el título (`Media` con tamaño fijo, `alt` descriptivo). En `split` sigue como hoy.
- **D6 — Botón**: acción primaria de WhatsApp con ícono `whatsapp` y `iconPosition: "start"`, en píldora dorada (degradé con tokens `brand`). Sin acción secundaria.
- **D7 — Copy**: título "¿Tenés algo en mente para tu cabello?"; descripción "Contame qué estás buscando y te asesoro sin compromiso para planificar tu próxima cita o evento especial."
- **D8 — Logo**: el mockup usa el logo real de Saint Aure. Si Camila no lo trae antes de la etapa 2, se usa el placeholder actual (`/placeholders/portrait.svg`) marcado con comentario "Placeholder — confirmar con la clienta".

## Plan por etapas

Cada etapa se implementa en una sesión nueva con `/etapas docs/plans/cta-badge.md <número>`.

### Etapa 1: Variante `badge` y retiro de `highlight`

- **Objetivo**: `CallToAction` renderiza la variante `badge` como en el mockup y `highlight` deja de existir; el catálogo dev muestra `simple`, `split` y `badge` y la build pasa.
- **Leer antes**: D2 a D6, skill `landing-design`, `src/components/sections/CallToAction/` (`.astro` y `.css`), `src/types/cta.ts`, `src/dev/catalog.ts` (línea de `variants("cta", ...)` y el contenido de ejemplo que use), `src/components/ui/Actions/Actions.astro`.
- **Archivos**: `src/types/cta.ts`, `src/components/sections/CallToAction/CallToAction.astro`, `src/components/sections/CallToAction/CallToAction.css`, `src/dev/catalog.ts`, y `src/content/page.ts` solo para pasar el bloque `cta` existente a `variant: "badge"` y que la build no rompa.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`; catálogo `/dev/components` (`npm run dev`) a 375 y 1280 px, temas claro y oscuro, los tres presets; `npm run check:contrast` (texto dorado y botón sobre el panel oscuro).
- **Modelo sugerido**: Opus (diseño visual y contrato nuevo).
- **Estado**: Implementada.

### Etapa 2: Ubicación, contenido, docs y tests

- **Objetivo**: la landing muestra la sección debajo de Galería con el copy y el logo finales, sin otro CTA en la página, y todo queda documentado y probado.
- **Leer antes**: D1, D7, D8, skill `landing-conversion`, el bloque `cta` y el orden de `sections` en `src/content/page.ts`, la sección CallToAction de `docs/architecture/overview.md`, `tests/e2e/conversions.spec.ts` y `tests/e2e/accessibility.spec.ts`.
- **Archivos**: `src/content/page.ts` (mover el bloque `cta` justo después de `gallery`, actualizar descripción y logo), `src/assets/images/` o `public/` (logo si Camila lo trae), `docs/architecture/overview.md` (variantes de CallToAction: simple, split y badge; quitar highlight) y, si aplica, `README.md` y las skills `landing-*` que mencionen `highlight`. Revisar que los anchors (`#contact`, `#gallery`) y el orden de la página sigan coherentes.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run build`, `npm run test:e2e` (specs `conversions`, `accessibility` y `layout`); en el navegador, 375 y 1280 px en ambos temas y foco por teclado en el botón. Confirmar con grep que no queda ningún `highlight` de CTA.
- **Modelo sugerido**: Sonnet (contenido y docs, sigue lo hecho en la etapa 1).
- **Estado**: Implementada.

## Retoques

Ajustes chicos que aparecen durante las etapas y se aplican juntos al final.

(vacío)
