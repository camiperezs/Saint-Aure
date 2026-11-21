# ChamDev Landing Template

Plantilla técnica reutilizable para desarrollar landing pages profesionales para clientes de ChamDev.

Cada proyecto nuevo se crea configurando la identidad visual y el contenido. Los componentes, el Design System, la accesibilidad, el SEO y la seguridad ya están resueltos en la plantilla.

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
| Services     | Grid, List, Featured                    |
| Benefits     | Grid, Horizontal                        |
| Process      | Steps, Timeline                         |
| Testimonials | Cards, Carousel                         |
| Gallery      | Grid, Masonry (con lightbox)            |
| FAQ          | Accordion, Grid                         |
| Location     | Map, Information                        |
| Contact      | Split, Centered, Form                   |
| CTA Banner   | Simple, Split, Highlight                |
| Logos        | Row, Grid                               |
| Stats        | Row, Cards                              |
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
