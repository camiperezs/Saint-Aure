# Hero y header "stage" de Saint Aure

Alcance: **cliente, con excepción explícita** (ver D1). Se aparta de la tabla de `docs/guides/template-updates.md` porque Camila eligió que esto exista solo para Saint Aure.

Referencia visual exacta: artifact https://claude.ai/artifact/S1Vjya9c5eEHsUq2DuGCRm. Copia de su código en `docs/plans/hero-header-stage/reference.html` (se lee con el navegador o con Read; la foto que usa se genera en la etapa 1). El resultado tiene que verse igual que el artifact en escritorio y móvil, en oscuro y en claro.

## Decisiones

- **D1 — Dónde vive el código.** Todo lo nuevo va en `src/client/` (carpeta propia del cliente, no existe en la plantilla): `src/client/HeroStage/HeroStage.astro` y `.css`, `src/client/header-stage.css`, `src/client/stage-particles.ts`, `src/client/hero-stage.ts` (contenido del hero). Los únicos archivos de la plantilla que se tocan son `src/pages/index.astro` (renderizar `HeroStage` y activar `headerOverlay`) y, si hace falta, `src/layouts/BaseLayout.astro` (una línea para importar el CSS del header). No se toca `src/components/`, `src/types/` ni `src/styles/`. Se anota en el README del cliente que estos archivos pueden dar conflicto al hacer merge de la plantilla.
- **D2 — Contenido.** Los datos del hero van en `src/client/hero-stage.ts` (el tipo `Hero` de la plantilla no tiene esta variante). `page.hero` queda sin definir o se elimina si nada más lo usa; revisar con grep `page.hero` antes (JSON-LD, SEO).
- **D3 — Foto del hero.** Origen: `public/works/hero-v2.png` (PNG con alfa, **1132×1389** en el repo; el recorte 100/80/1184×1430 pensado para 1284×1575 no aplica). Se usó la imagen entera, fundido del borde inferior de 150 px (smoothstep) y WebP calidad 90, `alphaQuality 100`, `effort 6`. Resultado: `src/assets/images/hero-stage.webp` (1132×1389, ~280 KB). El brazo derecho sale cortado por el borde de la foto: la tarjeta de 16 años lo tapa (no hay que rellenarlo con IA). No se agranda la imagen.
- **D4 — Logo.** `public/works/logo.png` (1536×1024) **no tiene transparencia**: tiene fondo blanco opaco, aunque Camila lo dio por sin fondo. Es un isotipo metálico dorado en círculo, con "SAINT AURE" adentro. No se vectoriza a SVG (un dorado con degradados se deforma); se convierte a **WebP con alfa**, quitando el blanco por distancia al blanco con borde descontaminado, recortado al círculo (cuadrado). Hecho: recorte cuadrado de 1024 px del círculo, alfa por croma/oscuridad (también elimina el patrón de cuadros falso del fondo), redimensionado a 256×256 en `src/assets/images/logo.webp` (una sola versión; sirve para 2x de ~3.5 rem). Se conecta en `site.logo`. Se usa a través de `site.logo` (BrandLogo), tamaño visual a decidir mirando el header (probar 3.2 a 3.6 rem; el texto interior es chico). Si el recorte automático queda con halo blanco, se le pide a Camila un PNG con alfa real.
- **D5 — Tokens.** Los valores del artifact son referencia. En el código se usan los tokens del proyecto (`var(--…)` de `src/styles/tokens` y los temas dark/light). Donde falte un valor (brillo cálido, marrón ambiental, tarjeta), se declara como variable local en `HeroStage.css`. El tema claro tiene que verse como el del artifact (durazno cálido, no un oscuro invertido).
- **D6 — Movimiento.** CSS primero. El hero nuevo **no** usa `data-hero`, `data-hero-in` ni `text-reflow`, para no cruzarse con `initHero` de GSAP ni con el failsafe de `motion-init.js`. El header sigue con su ocultar-al-bajar (`initHeader` busca `.header--standard[data-header]`): comprobar que no choca con la línea inferior. Todo respeta `prefers-reduced-motion`.
- **D7 — Partículas.** Canvas en un script bundleado (`src/client/stage-particles.ts`, sin inline, no hace falta hash de CSP). Densidad por área (~48 en 1440×900), ascenso lento, tamaños y opacidades distintos, color desde variables CSS del tema; con reduced motion se dibuja un solo cuadro estático.
- **D8 — Órbita.** Un anillo tenue (borde 1 px) centrado en la foto, con un arco brillante tipo estrella fugaz (máscara cónica) que gira una vuelta cada 64 s. Sin puntos ni marcas interiores. Detrás de la foto.
- **D9 — Tarjeta.** ~~"16 años de experiencia" sobre la foto.~~ **Quitada** por pedido de Camila (después de la etapa 4). El dato sigue en la descripción del hero. El brazo derecho cortado de la foto (D3) queda a la vista: revisar si se nota.
- **D12 — Pausa del movimiento (WCAG 2.2.2).** El arco, el brillo del acento, la respiración del fondo y las motas duran más de 5 s, así que se agregó un botón redondo de pausa/reanudar (abajo a la derecha del hero, 44 px, `aria-pressed`, texto accesible "Pausar/Reanudar animaciones"). Se prefirió a detener todo solo a los 5 s, porque la órbita tarda 64 s por vuelta y ese corte la haría desaparecer. El botón pone `data-paused` en la sección: el CSS congela las animaciones infinitas y el canvas se detiene. La elección se guarda en `localStorage`. Sin JS o con movimiento reducido el botón no aparece.
- **D10 — Geografía.** La información correcta es Rosario, Roldán y Baigorria. Se corrige en la descripción del hero y se busca el resto (`site.ts` descripción y título SEO, `page.ts` secciones que dicen "Rosario y Roldán"); esa revisión se hace en la etapa 6.
- **D11 — Header.** Solo el isotipo (sin nombre al lado), navegación centrada (Servicios, Sobre mí, Trabajos, Contacto), botón de contacto/WhatsApp **solo texto con subrayado, sin ícono de WhatsApp ni caja** (decisión de Camila, etapa 1; ver también Retoques), selector de tema, línea fina bajo el header con rombo dorado alineado al borde del texto, y en móvil menú con el botón existente de la plantilla. Se logra con CSS del cliente sobre las clases de `Header` (no se edita `Header.astro`).

- **D13 — Código limpio y componentes chicos (pedido de Camila, después de la etapa 4).** Solo en `src/client/`. (1) Se sacan **todos** los comentarios de `.astro`, `.ts` y `.css`. Lo que explicaban (el porqué de cada decisión) ya está en este plan y pasa al README del cliente al cerrar. (2) El hero se parte en componentes chicos reutilizables, cada uno en su carpeta con `.astro`, `.css` y `.ts` si tiene comportamiento: por ejemplo `Eyebrow`, `StageTitle` (líneas con acento), `StageButton` (variantes satinado y subrayado), `StageOrbit`, `StageDust` (canvas + script), `MotionPause` (botón + script) y `StagePhoto`. `HeroStage` solo los arma y recibe su contenido por props. Las props van tipadas con `interface Props`. Los scripts quedan con un archivo por componente. (3) No cambia nada visual: se compara contra el estado actual a 375 y 1280 px, en oscuro y en claro. Los comentarios de la plantilla no se tocan (se limpian en el repo de la plantilla, para que no den conflicto en los merges).

## Plan por etapas

Cada etapa se implementa en una sesión nueva con `/etapas docs/plans/hero-header-stage.md <número>`.

### Etapa 1: Imágenes (foto del hero y logo)

- **Objetivo**: existen `src/assets/images/hero-stage.webp` y `src/assets/images/logo.webp` (transparentes, nítidos), verificadas sobre fondo oscuro y claro, y `site.logo` apunta al logo.
- **Leer antes**: D3, D4. `src/config/site.ts` (campo `logo`), `src/types/image.ts`. Sin skills.
- **Archivos**: crea `src/assets/images/hero-stage.webp` y `src/assets/images/logo.webp`; toca `src/config/site.ts` (`logo`). Se puede usar `sharp` (ya instalado) con un script temporal fuera del repo; no se versiona el script.
- **Verificación**: abrir cada imagen aplanada sobre `#0b0908` y `#ecdccf` y revisar halos blancos en el logo y bordes del cabello; `npm run check`, `npm run lint`, `npm run format:check`.
- **Modelo sugerido**: Sonnet.
- **Estado**: Implementada.

### Etapa 2: Header

- **Objetivo**: el header se ve como el del artifact (isotipo, nav centrada, WhatsApp sin caja, tema, línea con rombo) en escritorio y móvil, oscuro y claro, sin tocar `Header.astro`.
- **Leer antes**: D1, D5, D6, D11. `src/components/layout/Header/Header.astro` y `Header.css`, `src/layouts/BaseLayout.astro` (cómo se pasa `overlay`), `src/config/site.ts` (`header`), `src/scripts/motion/header.ts`. Skill `landing-design`.
- **Archivos**: crea `src/client/header-stage.css`; toca `src/layouts/BaseLayout.astro` (import del CSS) o `src/pages/index.astro`; ajusta `site.ts` (`header`) solo si hace falta configuración.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`; en `npm run dev`, mirar la home a 375 y 1280 px en ambos temas, con el menú móvil abierto y haciendo scroll (ocultar/mostrar).
- **Modelo sugerido**: Opus (diseño visual y accesibilidad del menú).
- **Estado**: Implementada.

### Etapa 3: Hero stage (estructura y estilos estáticos)

- **Objetivo**: `HeroStage` renderizado en la home con título de 4 líneas y acento dorado, descripción, botones (WhatsApp satinado y "Ver trabajos" subrayado), foto recortada, tarjeta de 16 años, anillo de la órbita (quieto), fondos cálidos de ambos temas, responsive a 375, 768 y 1280+. Se ve como el artifact sin animaciones.
- **Leer antes**: D1 a D5, D8, D9. `docs/plans/hero-header-stage/reference.html` (CSS y HTML del hero), `src/pages/index.astro`, `src/components/ui/Actions/Actions.astro` y `ActionButton` (para los botones: ver si se reutilizan o se estilan desde el cliente), `src/utils/image-sizes.ts`. Skill `landing-design`.
- **Archivos**: crea `src/client/HeroStage/HeroStage.astro`, `src/client/HeroStage/HeroStage.css`, `src/client/hero-stage.ts`; toca `src/pages/index.astro`, `src/content/page.ts` (quitar `hero` si D2 lo permite).
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`; en `npm run dev`, comparar lado a lado con el artifact a 375, 768, 1280 y 1920 px, oscuro y claro. Los botones tienen que seguir abriendo WhatsApp y llevando a `#gallery`.
- **Modelo sugerido**: Opus.
- **Estado**: Implementada. `page.hero` se conservó en `page.ts` porque el catálogo `/dev/components` lo usa para las variantes de `Hero`; `index.astro` ya no lo renderiza. El botón de WhatsApp del hero conserva el ícono (como el artifact). El `<canvas data-stage-dust>` ya está en el markup para la etapa 4.

### Etapa 4: Movimiento y partículas

- **Objetivo**: partículas ascendentes, arco orbital, entrada escalonada del texto y de la foto, brillo del acento y respeto de `prefers-reduced-motion`, sin romper la animación del resto de la página.
- **Leer antes**: D6, D7, D8. `docs/plans/hero-header-stage/reference.html` (parte `<script>` y `@keyframes`), `src/scripts/inline/motion-init.js`, `src/scripts/motion/index.ts`, `src/scripts/motion/helpers.ts`, `astro.config.mjs` (CSP). Skill `landing-motion`.
- **Archivos**: crea `src/client/stage-particles.ts`; toca `src/client/HeroStage/HeroStage.astro` y `.css`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`; en el navegador, ver las partículas subir despacio, el arco recorrer la órbita sin moverse la foto, cambiar el tema (el color de las partículas cambia) y activar reduced motion (todo quieto y bien compuesto).
- **Modelo sugerido**: Opus.
- **Estado**: Implementada. Entrada, órbita, brillo del acento y respiración del fondo en `HeroStage.css`, todo dentro de `prefers-reduced-motion: no-preference` (con reducido el hero queda en su estado final). `stage-particles.ts` se carga con un `<script>` procesado de Astro en `HeroStage.astro`; ajusta la cantidad de motas al área (18 a 72), relee el color al cambiar `data-theme` y se detiene fuera de pantalla o con la pestaña oculta. Las líneas del titular llevan `overflow: hidden` para la máscara de la entrada. Después, con Camila: se quitó la tarjeta (D9) y se agregó el control de pausa (D12, `src/client/stage-motion.ts`).

### Etapa 5: Refactor a componentes chicos y código sin comentarios

- **Objetivo**: `src/client/` sin comentarios y con el hero armado a partir de componentes chicos reutilizables (D13), con el mismo aspecto y el mismo comportamiento (entrada, órbita, motas, pausa, tema, movimiento reducido).
- **Leer antes**: D1, D6, D7, D12, D13. Todo `src/client/` (`HeroStage/`, `hero-stage.ts`, `stage-particles.ts`, `stage-motion.ts`, `header-stage.css`), `src/pages/index.astro`, `src/components/ui/Icon/Icon.astro` y `src/utils/action.ts` (para ver qué se reutiliza). Skills `landing-design` y `landing-motion` (solo para no romper nada; no cambia la estética).
- **Archivos**: crea carpetas por componente en `src/client/` (por ejemplo `src/client/StageButton/StageButton.astro` + `.css`, `src/client/StageDust/StageDust.astro` + `.css` + `.ts`, `src/client/MotionPause/…`); reescribe `src/client/HeroStage/HeroStage.astro` y `.css`; quita los comentarios de `src/client/header-stage.css`. Se borran `stage-particles.ts` y `stage-motion.ts` si pasan a las carpetas de sus componentes.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run build`; `grep -rnE "//|/\*|<!--" src/client` sin resultados (salvo URLs); en `npm run dev`, comparar con el estado de antes (commit de esta etapa 4) a 375 y 1280 px, oscuro y claro, con pausa y con movimiento reducido.
- **Modelo sugerido**: Opus (reestructura de componentes sin cambio visual).
- **Estado**: Implementada. Componentes en `src/client/`: `Eyebrow`, `StageTitle` (con `types.ts` para `TitleLine`), `StageButton` (`satin` con ícono adelante, `underline` con flecha atrás), `StageOrbit` (tamaño por `--stage-orbit-size`), `StagePhoto` (`priority`), `StageDust` (`stage-dust.ts`) y `MotionPause` (`motion-pause.ts`, textos por props). La paleta de ambos temas pasó de `.hero-stage` a `:root` en `src/client/stage-tokens.css` para que las piezas sirvan fuera del hero. La pausa ya no busca `.hero-stage`: busca el ancestro `[data-motion-scope]`, y cada componente congela su propia animación con `[data-paused] …`. Regla para no depender del orden de los bundles: cada componente define solo su aspecto y su movimiento propio; `HeroStage.css` ubica las piezas (posición, z-index, márgenes, tamaño del título, retardos de entrada) con sus clases `hero-stage__*`, sin repetir propiedades del componente. `HeroStage` recibe `content` por props desde `index.astro`. Verificado comparando píxel a píxel con capturas de antes (375 y 1280, oscuro y claro, movimiento reducido): solo difieren las motas, que son aleatorias. Pausa, `aria-pressed`, texto accesible, `localStorage` y enlaces de los botones, iguales.

### Etapa 6: Integración, textos, tests y cierre

- **Objetivo**: textos con la geografía correcta (D10), tests e2e ajustados al hero nuevo, build y auditoría pasando, README del cliente actualizado.
- **Leer antes**: D1, D10. `tests/e2e/layout.spec.ts`, `tests/e2e/motion.spec.ts` y `tests/e2e/accessibility.spec.ts` (buscar selectores `.hero--fullscreen`, `data-hero`), `src/config/site.ts` y `src/content/page.ts` (textos con "Rosario y Roldán"), `README.md`.
- **Archivos**: toca `site.ts`, `page.ts`, los specs que fallen (o agrega `tests/e2e/hero-stage.spec.ts`), `README.md`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`, `npm run build`, `npm run test:e2e`, `npm run check:launch` (solo si la landing ya está en cierre).
- **Modelo sugerido**: Sonnet.
- **Estado**: Pendiente.

## Retoques

Ajustes chicos que aparecen durante las etapas y se aplican juntos al final.

- Header (etapa 2): el botón de contactar va sin el logo de WhatsApp, solo texto subrayado (ya reflejado en D11). Etapa 3: el botón de WhatsApp del hero conserva el ícono (como el artifact); cambiarlo si Camila prefiere solo texto.
- Etapa 2 → etapa 3: el CSS del header (`src/client/header-stage.css`) hace que el texto del header siga el tema también con `header--overlay`. Mientras la home siga con el hero fullscreen viejo (siempre oscuro), en tema claro el texto del header se lee mal sobre la foto; se resuelve solo al reemplazar el hero en la etapa 3 (fondo durazno en claro). Al activar `headerOverlay` en `index.astro`, comprobar que el header (sticky con ocultar al bajar vs. `header--overlay` absoluto) se comporta como se quiere.
- Etapa 6: `npm run check:contrast` (y probablemente `check:launch`) falla porque `scripts/*.ts` importa `site.ts` con node plano y `site.ts` ahora importa `@/assets/images/logo.webp` (etapa 1). Con el import reemplazado a mano el contraste pasa (172 combinaciones). No entró en la etapa 5 (era solo refactor); resolver en la etapa 6 (por ejemplo `site.logo` con ruta en `public/` o un loader en los scripts). También `format:check` avisa de `docs/plans/hero-header-stage/reference.html` (se borra al cerrar el plan).
- Etapa 4: ~~pausa del movimiento~~ resuelto con D12. Falta mirar en el navegador el botón de pausa a 375 y 1280 px en ambos temas, y que al pausar el arco y las motas se queden quietos (la verificación hasta ahora fue `check`, `lint`, `format:check` y `build`).
- Etapa 5: a 1280 px el botón flotante de WhatsApp de la plantilla (abajo a la derecha) queda encima del botón de pausa, que está en el mismo lugar (`.hero-stage__pause` en `HeroStage.css`). Ya pasaba antes del refactor. Mover la pausa (por ejemplo abajo a la izquierda o más arriba) y revisarlo también a 375 px.
