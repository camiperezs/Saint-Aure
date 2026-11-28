# ChamDev Landing Template

Plantilla técnica reutilizable para desarrollar landing pages profesionales para clientes de ChamDev.

Cada proyecto nuevo se crea configurando la identidad visual y el contenido. Los componentes, el Design System, la accesibilidad, el SEO y la seguridad ya están resueltos en la plantilla.

## Saint Aure: pendientes antes del deploy

Este repositorio es la landing de Saint Aure. `npm run check:launch` va a fallar hasta completar lo siguiente con la clienta:

- [ ] **WhatsApp y teléfono reales**: `business.whatsapp` y `business.telephone` en `src/config/site.ts` (hoy `+54 9 341 000-0000`) y el número escrito en la `description` de Contacto en `src/content/page.ts`.
- [ ] **Email real**: `business.email` (hoy `hola@saintaure.com.ar`), que también figura en `src/content/legal/privacy.md` y `terms.md`.
- [ ] **Dirección**: calle, número y código postal (`business.address`, hoy solo "Rosario, Santa Fe" y `S2000`). Si atiende solo a domicilio, confirmarlo y dejar la ciudad.
- [ ] **Dominio**: `url` en `site.ts` (hoy `https://saintaure.com.ar`, sin confirmar).
- [ ] **Texto y foto de About**: la cita, la descripción, el nombre del profesional ("Tomas Mooney"), los "16+ años de experiencia" y la foto `about.webp` son provisorios. Confirmarlos con la clienta.
- [ ] **Fotos**: la galería (hoy `/placeholders/`). Van en `src/assets/images/`, con `alt` descriptivo. El hero ya usa `hero-stage.webp` (ver abajo).
- [ ] **Testimonios reales**: reemplazar los 3 "Clienta de ejemplo", con permiso de cada clienta.
- [ ] **Logo**: SVG cuadrado para `public/favicon.svg`.
- [ ] **Textos legales**: `privacy.md` y `terms.md` tienen los datos de Saint Aure, pero no los revisó un profesional. Hacerlos revisar antes de publicar.
- [ ] **Indexación**: cambiar `seo.robots` a `"index, follow"` recién al publicar.

## Saint Aure: movimiento

La home usa GSAP (`ScrollTrigger` y `SplitText`) empaquetado en un único módulo, `src/scripts/motion/index.ts`, que solo se carga en la home (unos 49 kB gzip; presupuesto: 60 kB). Es una excepción de Saint Aure: hero, About, Stats, Gallery, catálogo de Services, CTA, Header y Button se reescribieron para esto y van a dar conflicto al traer cambios de la plantilla (se resuelven a favor de Saint Aure).

- `has-motion` en `<html>` lo agrega `src/scripts/inline/motion-init.js` solo con `prefers-reduced-motion: no-preference`; los estados iniciales ocultos viven en CSS bajo esa clase. Sin JS, con movimiento reducido o si el módulo no arranca en 3 s, la página se ve completa y estática.
- Pin y recorrido horizontal de la galería solo en desktop con hover.
- `tests/e2e/motion.spec.ts` cubre sin JS, movimiento reducido y movimiento normal. Si se agrega un estado inicial oculto nuevo, sumarlo a `REVEALED` en ese spec.
- Al animar con GSAP un estado que el CSS oculta bajo `has-motion`, no usar `clearProps` sobre esa propiedad: el CSS volvería a ocultarlo.

## Saint Aure: hero y header propios

El hero de la home y el estilo del header son exclusivos de Saint Aure y viven en `src/client/`, una carpeta que la plantilla no tiene.

- **Archivos de la plantilla que se tocaron**: `src/pages/index.astro` (renderiza `HeroStage` en lugar de `Hero` y activa `headerOverlay`) y `src/layouts/BaseLayout.astro` (importa `src/client/header-stage.css`). Al traer cambios de la plantilla, esos dos archivos pueden dar conflicto: se resuelven conservando esas líneas.
- **Componentes**: `HeroStage` arma piezas chicas (`Eyebrow`, `StageTitle`, `StageButton`, `StageOrbit`, `StagePhoto`, `StageDust`, `MotionPause`), cada una en su carpeta con su `.astro`, su `.css` y, si tiene comportamiento, su `.ts`. Cada pieza define su aspecto y su movimiento; `HeroStage.css` solo las ubica. La paleta compartida de ambos temas está en `src/client/stage-tokens.css`. No llevan comentarios: el porqué de cada decisión está acá y en el historial de git.
- **Contenido**: `src/client/hero-stage.ts` (el tipo `Hero` de la plantilla no tiene esta variante). `page.hero` sigue en `page.ts` solo porque el catálogo `/dev/components` lo usa.
- **Movimiento**: todo en CSS dentro de `prefers-reduced-motion: no-preference`, sin `data-hero` ni GSAP, así que la entrada también corre sin JS. Las motas son un canvas (`StageDust/stage-dust.ts`, script bundleado, sin hash de CSP) que se detiene fuera de pantalla y con la pestaña oculta. Como la órbita, el brillo y las motas duran más de 5 s, hay un botón de pausa (WCAG 2.2.2) que pone `data-paused` en el ancestro `[data-motion-scope]` y guarda la elección en `localStorage` (`saint-aure:stage-motion`). Con movimiento reducido o sin JS el botón no aparece. Lo cubre `tests/e2e/hero-stage.spec.ts`.
- **Header**: solo el isotipo, navegación centrada, contacto como texto subrayado (sin ícono ni caja) y una línea inferior con rombo dorado. Se logra con CSS sobre las clases de `Header`, sin editar `Header.astro`.
- **Imágenes**: la foto del hero es `src/assets/images/hero-stage.webp`, hecha a partir de `public/works/hero-v2.png` con un fundido en el borde inferior. El logo es `public/brand/logo.webp` (256 px, con alfa, recortado del PNG con fondo blanco que mandó la clienta). Está en `public/` y no en `src/assets/` porque los scripts `check:contrast` y `check:launch` importan `site.ts` con node plano, y node no puede importar una imagen. Si llega un PNG con transparencia real, conviene volver a generarlo desde ahí.

## Requisitos

- Node.js 24
- npm

## Inicio rápido

```bash
npm install
npm run dev
```

Para crear la landing de un cliente, seguí la guía [Crear una landing nueva](docs/guides/new-landing.md).

## Scripts

| Script                   | Qué hace                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| `npm run dev`            | Servidor de desarrollo                                                                     |
| `npm run build`          | Build de producción en `dist/`                                                             |
| `npm run preview`        | Sirve la build de producción localmente                                                    |
| `npm run check`          | Verificación de tipos (TypeScript strict)                                                  |
| `npm run lint`           | ESLint                                                                                     |
| `npm run format`         | Formatea el código con Prettier                                                            |
| `npm run format:check`   | Verifica el formato sin modificar archivos                                                 |
| `npm run check:contrast` | Valida el contraste WCAG 2.2 AA de la paleta en ambos temas                                |
| `npm run test:e2e`       | Pruebas en navegador (Playwright y axe-core). Requiere `npm run build` antes               |
| `npm run check:launch`   | Falla si queda contenido de ejemplo de la plantilla. Se corre antes de publicar un cliente |

## Qué incluye

**Secciones**, cada una con variantes:

| Sección      | Variantes                               |
| ------------ | --------------------------------------- |
| Hero         | FullScreen, Compact, Split              |
| About        | Split, Centered, ImageBackground        |
| Services     | Grid, List, Featured, Catalog           |
| Benefits     | Grid, Horizontal                        |
| Process      | Steps, Timeline                         |
| Testimonials | Cards, Carousel                         |
| Gallery      | Grid, Masonry (con lightbox)            |
| FAQ          | Accordion, Grid                         |
| Location     | Map, Information                        |
| Contact      | Split, Centered, Form                   |
| CTA Banner   | Simple, Split, Badge                    |
| Logos        | Row, Grid                               |
| Stats        | Row, Cards, Ruled                       |
| Pricing      | Planes con plan destacado               |
| Video        | YouTube o Vimeo, con carga bajo demanda |

**Base técnica:**

- Design System con tokens, temas Light y Dark y presets visuales (Editorial, Modern y Elegant).
- Header con menú mobile, Footer, botón flotante de WhatsApp y página de agradecimiento.
- Formularios con validación accesible e integración con Netlify Forms.
- Sistema de íconos SVG locales.
- SEO técnico: metadatos, Open Graph, URL canónica, `sitemap.xml` y `robots.txt`.
- Seguridad: Content Security Policy con hashes y encabezados HTTP en Netlify.
- WCAG 2.2 AA como estándar: contraste validado, navegación por teclado y lectores de pantalla.

## Estructura

```text
src/
├── components/
│   ├── forms/        Formularios (presentación)
│   ├── layout/       Header, Footer y metadatos SEO
│   ├── sections/     Secciones de página
│   └── ui/           Componentes base (Button, Card, Icon, Media…)
├── config/site.ts    Configuración del proyecto: marca, colores, textos, navegación
├── content/page.ts   Contenido de la página: Hero y secciones
├── icons/            Íconos SVG
├── integrations/     Proveedores externos (formularios)
├── layouts/          BaseLayout
├── pages/            Rutas
├── scripts/          Interacción en el navegador (tema, menú, carrusel, lightbox…)
├── styles/           Tokens, temas, utilidades y presets
├── types/            Contratos de contenido y configuración
└── utils/            Lógica compartida (apariencia, precios, WhatsApp)
```

## Catálogo de componentes

Con `npm run dev`, la ruta [`/dev/components`](http://localhost:4321/dev/components) muestra todas las secciones y sus variantes con el contenido de ejemplo. Permite cambiar de preset (Editorial, Modern, Elegant) y de tema en vivo. Solo existe en desarrollo: no forma parte de la build de producción.

## Documentación

- [Crear una landing nueva](docs/guides/new-landing.md)
- [Actualizar un cliente desde la plantilla](docs/guides/template-updates.md)
- [Arquitectura](docs/architecture/overview.md)

## Despliegue

El sitio se despliega en Netlify. La configuración de build, la versión de Node y los encabezados de seguridad están en [netlify.toml](netlify.toml).
