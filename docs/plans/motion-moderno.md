# Saint Aure — Movimiento moderno

Alcance: **cliente** (solo Saint Aure), con una excepción acordada: en este repositorio se pueden reescribir los componentes `Hero`, `About`, `Stats`, `Gallery`, `Services` (catálogo), `CallToAction`, `Header` y `Button`, sus CSS y los tipos que usan. No se generaliza para la plantilla (igual que `ServiceCatalog`, ver `overview.md` §7). Consecuencia: al traer cambios de la plantilla (`docs/guides/template-updates.md`) estos archivos van a dar conflicto y se resuelven a favor de Saint Aure.

Pedido de Camila: el movimiento actual no le gusta (entrada del hero, hair-flow con el cursor, badge de About). El hero puede cambiar por completo. La idea es una forma nueva y moderna de presentar las secciones, con más movimiento y retoques visuales chicos.

## Decisiones

- **D1 — Se descarta el movimiento actual.** Se eliminan: las entradas `hero-*` de `Hero.css`, `HeroHairFlow.astro` y `.css`, `src/scripts/hair-flow.ts`, el campo `hairFlow` (`src/types/hero.ts` y `page.ts`), `about-badge-rise` en `About.css`. Lo borra la etapa que reemplaza cada pieza, no esta. Se conserva todo lo que no es movimiento (contenido, contratos, lightbox, catálogo accesible).
- **D2 — GSAP habilitado.** Paquetes `gsap` con `ScrollTrigger` y `SplitText` (gratis desde 2025), instalados con npm y empaquetados por Astro en un único módulo `src/scripts/motion/index.ts`. Se carga solo en la home (no en thank-you, legales ni 404). Sin CDN, sin `style=""`. La etapa 1 registra la decisión como excepción de Saint Aure en la tabla del punto 15 de `overview.md`. Sin Lenis ni otra librería: el scroll es el nativo.
- **D3 — CSS primero.** Hover, presionar, transición entre páginas (`@view-transition`) y cualquier cosa sin scroll van en CSS. GSAP solo para lo que CSS no resuelve: texto dividido por líneas, pin con scrub, scroll horizontal, contadores y secuencias.
- **D4 — Un solo lenguaje de movimiento** (no un fade en todo):
  1. **Títulos**: líneas enmascaradas que suben (SplitText `lines`, máscara por línea).
  2. **Imágenes**: revelado con `clip-path: inset()` y asentamiento de `scale` de 1.12 a 1; parallax interno con scrub dentro del marco.
  3. **Filetes y líneas doradas**: se dibujan con `scaleX` desde el origen.
  4. **Cifras**: cuentan hasta el valor.
     Curvas y duraciones espejan los tokens de `src/styles/tokens/motion.css` en `src/scripts/motion/config.ts` (`expo.out` para entradas, `power3.inOut` para desplazamientos, 0.6 a 1.1 s para el momento destacado).
- **D5 — Contenido visible por defecto.** Un script inline de pre-pintado (`src/scripts/inline/motion-init.js`, con hash en la CSP como `theme-init.js`) agrega `has-motion` a `<html>` solo si `prefers-reduced-motion: no-preference`. Los estados iniciales ocultos (`opacity: 0`, `clip-path`) viven en CSS bajo `.has-motion`. Failsafe: si el módulo no inicializó a los 3 s, el mismo script quita la clase y todo queda visible. Sin JS, sin soporte o con movimiento reducido, la página se ve completa y estática.
- **D6 — Movimiento reducido.** Todo en `gsap.matchMedia()` con la condición `(prefers-reduced-motion: no-preference)`; en `reduce` no se registra nada (estado final). Nada de `scrub` ni pin en esa rama.
- **D7 — Pin y scroll horizontal solo en desktop** (`min-width: 64rem` y `(hover: hover)`). En mobile y tablet: layout apilado normal. Lo que se fija nunca oculta contenido ni quita foco de teclado: todo elemento enfocable queda alcanzable y `scrollIntoView` lo lleva a la vista.
- **D8 — Rendimiento.** Solo `transform`, `opacity`, `clip-path`, `filter` (blur menor a 20 px). `will-change` solo durante la animación. La imagen del hero es el LCP: su revelado dura 1 s o menos, sin `opacity: 0` inicial sobre la imagen (solo `clip-path`). Presupuesto del chunk de motion: 60 kB gzip o menos, medido en la salida de `npm run build`. `ScrollTrigger.refresh()` después de `document.fonts.ready`.
- **D9 — Hero nuevo.** Composición a pantalla completa en vez del split actual: titular grande en Playfair (escala fluida mayor que hoy), imagen que se revela con cortina, línea editorial y acciones. Al hacer scroll el hero se comprime (imagen escala y se desplaza, texto sale con parallax suave). Mantiene H1, `titleAccent`, acciones y WhatsApp. Si el contrato `HeroSplit` ya no alcanza, se extiende o se usa la variante `fullscreen` con `editorial`. **Imagen**: usar `public/works/hero/mujer-espaldas-cabello-ondulado.webp`, una mujer de espaldas con cabello ondulado y sin fondo (recorte). Como no tiene fondo, el hero la compone sobre el fondo del tema (no con overlay): la figura puede superponerse al titular, escalar y moverse con parallax por encima del texto o entre capas. Al ser un archivo de `public/` no pasa por el pipeline de Astro: declarar `width` y `height`, `fetchpriority="high"` y sin lazy (es el LCP).
- **D10 — Retoques visuales chicos** (skill `landing-design`), dentro de cada etapa de su sección: titulares más grandes, más espacio vertical entre secciones, numeración editorial por sección (`01`, `02`… generada en CSS con counter, no en `page.ts`). Sin cambiar paleta, tipografía ni preset.
- **D11 — Cada etapa verifica a11y y CSP.** Los tests e2e corren axe y fallan con errores de consola o violaciones de CSP, así que se corre el spec que corresponde en cada etapa que toca scripts.

---

## Plan por etapas

Cada etapa se implementa en una sesión nueva con `/etapas docs/plans/motion-moderno.md <número>`.

### Etapa 1: Cimientos de movimiento

- **Objetivo**: GSAP, ScrollTrigger y SplitText instalados y empaquetados; módulo de motion con `matchMedia`, helpers del lenguaje de D4 (títulos, filetes, imágenes) y el script `has-motion` con failsafe y hash en la CSP. Los `SectionTitle` de la home ya revelan sus líneas. La build, la CSP y los e2e siguen pasando.
- **Leer antes**: D2 a D8 y D11; skill `landing-motion` (SKILL.md, sección GSAP); `src/layouts/BaseLayout.astro`; `astro.config.mjs` (cómo se hashean los scripts inline); `src/scripts/inline/theme-init.js`; `src/components/ui/SectionTitle/`; `src/styles/tokens/motion.css`; `docs/architecture/overview.md` punto 15.
- **Archivos**: `package.json`; `src/scripts/motion/index.ts`, `config.ts`, `helpers.ts` (nuevos); `src/scripts/inline/motion-init.js` (nuevo); `astro.config.mjs` (hash, si no es automático); `BaseLayout.astro` (cargar solo en la home); `SectionTitle` (atributo `data-reveal="lines"` y CSS bajo `.has-motion`); `docs/architecture/overview.md` (excepción de GSAP en el punto 15).
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`; `npm run build` y mirar el tamaño del chunk contra D8; `npm run test:e2e` completo (CSP y consola limpias); en el navegador (`npm run dev`) a 375 y 1280 px con movimiento normal, con movimiento reducido emulado y con JS desactivado: los títulos aparecen siempre.
- **Modelo sugerido**: Opus (CSP, arquitectura de carga, contrato de accesibilidad de D5 y D6).
- **Estado**: Implementada.
- **Notas de implementación**:
  - `BaseLayout` recibe `motion` (la home lo activa): inyecta `motion-init.js` en el `<head>` y el `<script>` del módulo. `motion-init` está en la lista de hashes de `astro.config.mjs`. Las globals `matchMedia` y `setTimeout` se agregaron a la config de ESLint para `src/scripts/inline/`.
  - Helpers en `src/scripts/motion/helpers.ts`: `revealLines` (`data-reveal="lines"`), `drawRules` (`data-reveal-rule`, anima `--rule` de 0 a 1) y `revealImages` (`data-reveal="image"`, sin tocar `opacity`). `SectionTitle` ya marca el heading y, con `accent`, los filetes. `revealImages` todavía no se usa en ningún marcado; lo estrenan las etapas 2 y 3.
  - El título se oculta con `visibility: hidden` bajo `.has-motion` hasta `data-reveal-state="ready"` (no con `opacity`, para que axe no mida un texto a medio fundido). Bajo `.has-motion` el heading pierde `text-wrap: balance` (SplitText mide líneas).
  - SplitText parte el `<em>` del `titleAccent` en uno por línea: el test de About en `accessibility.spec.ts` compara el texto unido.
  - Chunk de motion: unos 47 kB gzip (límite de D8: 60 kB). Medido en `dist/_astro/`; las etapas siguientes lo vuelven a medir.
  - Verificado con Playwright: con movimiento normal `has-motion` y los títulos `ready`; con `reducedMotion` y sin JS no hay `has-motion` y todo es visible. E2E: 83 pasan, 19 se omiten, sin errores de consola ni CSP. `format:check` marca `README.md` y `src/types/gallery.ts`, que ya venían así y no se tocaron.
  - No se revisó a ojo en navegador a 375 y 1280 px; queda para la etapa 2, cuando haya algo más que títulos para mirar.

### Etapa 2: Hero nuevo

- **Objetivo**: el hero nuevo de D9 con entrada coreografiada y salida por scroll; se elimina todo el movimiento anterior del hero (D1).
- **Leer antes**: D1, D4 a D10; skills `landing-motion` y `landing-design`; `src/types/hero.ts`; `src/components/sections/Hero/` completo (`Hero.astro`, `Hero.css`, `HeroHairFlow.*`); `src/scripts/hair-flow.ts` (solo para borrarlo); el bloque `hero` de `src/content/page.ts`; los helpers de la etapa 1.
- **Archivos**: `Hero.astro`, `Hero.css`; borrar `HeroHairFlow.astro`, `HeroHairFlow.css`, `src/scripts/hair-flow.ts`; `src/types/hero.ts` (quitar `hairFlow`, ajustar contrato); `src/content/page.ts` (hero); `src/scripts/motion/hero.ts` (nuevo, llamado desde `index.ts`).
- **Verificación**: comandos base; `npm run check:contrast` si cambia el overlay; `npm run build` y `npm run test:e2e` (specs de hero, desborde y a11y); navegador a 375 y 1280 px, temas claro y oscuro: LCP sin parpadeo, H1 legible durante la animación, scroll del hero sin saltos, movimiento reducido emulado muestra el estado final.
- **Modelo sugerido**: Opus (rediseño visual, LCP, contrato nuevo).
- **Estado**: Implementada. El hero usa la variante `fullscreen` (se agregó `titleAccent` a `HeroFullScreen`); `hairFlow` y el movimiento `hero-*` del split se eliminaron (la variante split queda estática). Motion en `src/scripts/motion/hero.ts`.

### Etapa 3: About y Stats

- **Objetivo**: About con imagen revelada y parallax interno, texto por líneas y badge que cuenta; Stats con filetes que se dibujan y cifras que cuentan. Se elimina `about-badge-rise`.
- **Leer antes**: D1, D4 a D8, D10; skills `landing-motion` y `landing-design`; `src/components/sections/About/` y `Stats/` (`.astro` y `.css`); los bloques `about` y `stats` de `page.ts`; `src/scripts/motion/helpers.ts`.
- **Archivos**: `About.astro`, `About.css`, `Stats.astro`, `Stats.css`; `src/scripts/motion/about.ts` y `stats.ts` (nuevos, registrados en `index.ts`); `page.ts` solo si cambia el contrato del badge.
- **Verificación**: comandos base; `npm run build` y `npm run test:e2e`; navegador a 375 y 1280 px en ambos temas: las cifras no textuales (`16+`, `5`) cuentan y terminan en el valor exacto; la cifra de texto (`Rosario & Roldán`) no cuenta, solo revela; con movimiento reducido las cifras salen ya en su valor final.
- **Modelo sugerido**: Sonnet (sigue los helpers de la etapa 1; el diseño del lenguaje ya está en D4).
- **Estado**: Pendiente.

### Etapa 4: Servicios (catálogo)

- **Objetivo**: las cards del catálogo entran escalonadas y el panel de detalle cambia con un cruce direccional (según la tarjeta elegida y las flechas), sin romper la semántica de tabs ni el teclado.
- **Leer antes**: D3, D4, D6, D8, D10; skill `landing-motion`; `overview.md` §4.2 (semántica del catálogo); `src/components/sections/Services/ServiceCatalog.astro` y `.css`; `src/scripts/service-catalog.ts`; el bloque `services` de `page.ts`.
- **Archivos**: `ServiceCatalog.css`; `src/scripts/service-catalog.ts` (hooks de dirección y transición); `src/scripts/motion/services.ts` (entrada escalonada); `ServiceCatalog.astro` solo si falta un atributo.
- **Verificación**: comandos base; `npm run build` y `npm run test:e2e` (spec del catálogo y teclado: ← → Home End, primer panel visible sin JS); navegador a 375 y 1280 px en ambos temas; con movimiento reducido, el panel cambia sin desplazamiento.
- **Modelo sugerido**: Sonnet (modifica un script y un CSS existentes, sin contratos nuevos).
- **Estado**: Pendiente.

### Etapa 5: Galería inmersiva

- **Objetivo**: en desktop la galería `portfolio` se presenta como recorrido horizontal fijado con scrub y revelado de imágenes; en mobile, tablet y movimiento reducido queda en su layout normal. El lightbox sigue funcionando.
- **Leer antes**: D4 a D8, D10; skills `landing-motion` y `landing-design`; `src/components/sections/Gallery/` completo; `src/scripts/lightbox.ts`; el bloque `gallery` de `page.ts`; los tests e2e del lightbox.
- **Archivos**: `Gallery.astro`, `Gallery.css`; `src/scripts/motion/gallery.ts` (nuevo); `src/scripts/lightbox.ts` si hay que reabrir/cerrar sin perder la posición del scroll; `page.ts` solo si cambia el contenido.
- **Verificación**: comandos base; `npm run build` y `npm run test:e2e` (lightbox con Escape, desborde 320 a 1440 px, axe); a mano: Tab recorre todas las imágenes y cada una queda a la vista (D7), `ScrollTrigger.refresh()` tras cargar imágenes, sin salto al salir del pin; probar a 1280 px y a 375 px.
- **Modelo sugerido**: Opus (pin con scrub, accesibilidad no trivial, interacción con el lightbox).
- **Estado**: Pendiente.

### Etapa 6: CTA, header, botones y transición entre páginas

- **Objetivo**: el CTA badge entra con panel y logo; el header se oculta al bajar y vuelve al subir (reemplaza el fondo por scroll actual); los botones tienen hover y presionar pulidos, con efecto magnético solo en los primarios de hero y CTA; home a thank-you y a legales con View Transitions.
- **Leer antes**: D3, D4, D6, D10; skills `landing-motion` (recetas 1, 7 y 11) y `landing-design`; `src/components/sections/CallToAction/`; `src/components/layout/Header/Header.css` y `Header.astro`; `src/components/ui/Button/Button.css`; `src/layouts/BaseLayout.astro` y `MessagePage`.
- **Archivos**: `CallToAction.astro` y `.css`; `Header.css` y su script de menú si hace falta; `Button.css`; `src/scripts/motion/cta.ts` y `header.ts` (nuevos); `BaseLayout.astro` (`@view-transition`, si la CSP y los scripts empaquetados lo permiten); `src/styles/` solo si hace falta un token.
- **Verificación**: comandos base; `npm run build` y `npm run test:e2e` (menú móvil, skip link, formulario, redirección a `/thank-you`); navegador: el header con el menú móvil abierto no se oculta; el foco visible nunca queda bajo el header; el efecto magnético no existe sin `(hover: hover)`.
- **Modelo sugerido**: Sonnet (sigue las recetas y helpers ya existentes).
- **Estado**: Pendiente.

### Etapa 7: Auditoría y cierre

- **Objetivo**: el movimiento está auditado y probado: spec e2e de motion, presupuesto de rendimiento verificado y documentación actualizada.
- **Leer antes**: D5 a D8, D11; skills `landing-motion` (`references/review.md`) y `landing-audit`; `tests/` o `e2e/` (specs existentes para copiar el estilo); salida de `npm run build`.
- **Archivos**: `tests/e2e/motion.spec.ts` (o la carpeta de specs que use el repo): sin JS todo el contenido visible, con `reducedMotion: "reduce"` estado final y sin errores de consola ni CSP, la home tiene `has-motion` solo en `no-preference`; correcciones que salgan de la auditoría; `README.md`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`, `npm run build`, `npm run test:e2e` completo. `npm run check:launch` seguirá fallando solo por lo que ya figura en el README.
- **Modelo sugerido**: Sonnet.
- **Estado**: Pendiente.

## Retoques

Ajustes chicos que aparecen durante las etapas y se aplican juntos al final.

- Hero móvil: la línea editorial queda tapada en parte por el botón flotante de WhatsApp (375 px).
