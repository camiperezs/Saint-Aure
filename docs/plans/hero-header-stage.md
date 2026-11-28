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
- **D9 — Tarjeta.** Contenido: "16" (serif, dorado) y "años de experiencia". En escritorio queda a la altura del brazo derecho, solapando el borde derecho de la foto; en móvil, sobre el borde derecho de la foto al 20 % de su alto. Opaca (sin blur, para no ver el brazo detrás).
- **D10 — Geografía.** La información correcta es Rosario, Roldán y Baigorria. Se corrige en la descripción del hero y se busca el resto (`site.ts` descripción y título SEO, `page.ts` secciones que dicen "Rosario y Roldán"); esa revisión se hace en la etapa 5.
- **D11 — Header.** Solo el isotipo (sin nombre al lado), navegación centrada (Servicios, Sobre mí, Trabajos, Contacto), botón de contacto/WhatsApp **solo texto con subrayado, sin ícono de WhatsApp ni caja** (decisión de Camila, etapa 1; ver también Retoques), selector de tema, línea fina bajo el header con rombo dorado alineado al borde del texto, y en móvil menú con el botón existente de la plantilla. Se logra con CSS del cliente sobre las clases de `Header` (no se edita `Header.astro`).

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
- **Estado**: Pendiente.

### Etapa 5: Integración, textos, tests y cierre

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
- Etapa 5: `npm run check:contrast` (y probablemente `check:launch`) falla porque `scripts/*.ts` importa `site.ts` con node plano y `site.ts` ahora importa `@/assets/images/logo.webp` (etapa 1). Con el import reemplazado a mano el contraste pasa (172 combinaciones). Resolver en la etapa 5 (por ejemplo `site.logo` con ruta en `public/` o un loader en los scripts). También `format:check` avisa de `docs/plans/hero-header-stage/reference.html` (se borra al cerrar el plan).
