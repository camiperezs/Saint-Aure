# Crear una landing nueva

Esta guía describe cómo crear la landing de un cliente a partir de la plantilla.

La regla general: **un proyecto nuevo se configura, no se programa.** Casi todo el trabajo ocurre en dos archivos:

- `src/config/site.ts`: identidad, colores, textos de interfaz, navegación y SEO.
- `src/content/page.ts`: Hero y secciones de la página.

Los componentes, tokens y estilos no deberían modificarse para un cliente. Si algo no se puede resolver por configuración, probablemente sea una mejora para la plantilla.

## 1. Crear el repositorio

1. Creá el repositorio del cliente clonando la plantilla, como se explica en [Actualizar un cliente desde la plantilla](template-updates.md). Así el cliente puede recibir las mejoras futuras de la plantilla.
2. Instalá las dependencias y levantá el servidor de desarrollo:

   ```bash
   npm install
   npm run dev
   ```

## 2. Datos del sitio

En `src/config/site.ts`:

| Campo             | Qué configurar                                                         |
| ----------------- | ---------------------------------------------------------------------- |
| `name`            | Nombre del negocio. Se usa en el header, el footer y Open Graph        |
| `url`             | Dominio de producción, por ejemplo `https://cliente.com`               |
| `locale`          | Idioma y región, por ejemplo `es-AR`. Define el formato de los precios |
| `seo.title`       | Título de la página                                                    |
| `seo.description` | Descripción para buscadores (entre 120 y 160 caracteres)               |
| `seo.robots`      | Dejalo en `"noindex, nofollow"` hasta publicar                         |
| `seo.image`       | Imagen para compartir en redes (1200 × 630 px en `public/`). Opcional  |
| `labels`          | Textos de interfaz: menú, botones, mensajes del formulario             |

Reemplazá también `public/favicon.svg` por el ícono del cliente (un SVG cuadrado). A partir de ese archivo, la build genera el ícono para iOS (`apple-touch-icon.png`), los íconos de 192 y 512 px y el `manifest.webmanifest`.

### Datos del negocio

**Pedíselos siempre al cliente.** `business` es obligatorio: sin él, el proyecto no compila. Con estos datos se genera el JSON-LD que Google usa para mostrar el negocio en los resultados de búsqueda.

| Campo          | Qué configurar                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `type`         | Tipo de negocio de schema.org (`LocalBusiness`, `ProfessionalService`, `Store`…). Usá `Organization` si no atiende en un local |
| `description`  | Descripción breve del negocio                                                                                                  |
| `address`      | Dirección. Obligatoria para negocios con local. `country` va con código ISO (`AR`)                                             |
| `telephone`    | Teléfono en formato internacional                                                                                              |
| `email`        | Email de contacto                                                                                                              |
| `openingHours` | Horarios en formato schema.org: `"Mo-Fr 09:00-18:00"`, `"Sa 10:00-13:00"`                                                      |
| `priceRange`   | Rango de precios, por ejemplo `"$$"`. Opcional                                                                                 |

### Logo (opcional)

`logo` va en la raíz de `site.ts`, junto a `name`. Reemplaza al nombre en el Header y el Footer, y también va al JSON-LD. Sin `logo` se muestra el nombre como texto.

```ts
logo: { src: "/logo.svg", alt: "Nombre del negocio", width: 160, height: 40 },
```

- `src`: ruta en `public/` o un import de `src/assets/images/` (en ese caso sin `width` ni `height`).
- `alt`: el nombre del negocio, porque el logo reemplaza al texto.
- `width` y `height`: las medidas reales del archivo; reservan el espacio y evitan saltos de layout. Se muestra a 2rem de alto (`--brand-logo-height`).
- Un solo archivo para ambos temas: usá un logo que se lea sobre fondo claro y oscuro. En el hero `fullscreen` el header va sobre la imagen, así que conviene un logo claro o neutro.

Las redes de `social` se agregan automáticamente al JSON-LD. Los datos tienen que ser reales y coincidir con lo que se muestra en la página.

## 3. Identidad visual

En `site.appearance`:

- **`colors`**: escalas `primary`, `secondary` y `neutral` con los pasos del 50 al 950. `neutral` incluye además el paso `0` (fondo claro). Los temas usan pasos fijos de cada escala; por ejemplo, la acción principal usa `primary.700` en Light y `primary.300` en Dark.
- **`preset`**: `editorial`, `modern` o `elegant`. Define los valores por defecto de radios, elevación de tarjetas, trazo de íconos, densidad y tipografía. Los ajustes de abajo pisan solo lo que definas.
- **`defaultTheme`**: tema inicial, `light` o `dark`. El visitante puede cambiarlo y su elección se recuerda.
- **`typography`**: tipografía por roles. Copiá los archivos WOFF2 a `public/fonts/` y declaralos en `fonts`.
  - `body`: familia del cuerpo y de la interfaz (botones, badges, formularios).
  - `heading` (opcional): `family` para títulos de sección, Hero y cifras de Stats (por defecto, la de `body`); `weight` (`400` a `700`) para títulos y Display; `tracking` (`normal`, `tight` o `tighter`).
  - `eyebrow` (opcional): `uppercase` o `sentence`.

  Lo que no definas sale del preset: `editorial` usa tracking -0.035em y eyebrow en mayúsculas; `modern`, -0.025em y sentence case; `elegant`, -0.02em y sentence case. Los ajustes de `site.ts` pisan al preset también en `/dev/components`, así que ahí el selector de presets solo muestra diferencias en lo que no ajustaste.

  ```ts
  typography: {
    body: '"Source Sans 3", sans-serif',
    heading: { family: '"Fraunces", serif', weight: 500, tracking: "tight" },
    eyebrow: "sentence",
    fonts: [{ family: "Fraunces", src: "/fonts/fraunces-500.woff2", weight: 500 }],
  },
  ```

- **`shape`** (opcional): radios por elemento. `cards` y `media` aceptan `none`, `sm`, `md`, `lg`, `xl` o `2xl`; `buttons`, `none` a `lg` o `pill`; `badges`, `none`, `sm`, `md` o `pill`. Tarjetas e imágenes no aceptan `pill`.
- **`surfaces.cards`** (opcional): `border` (borde, sin sombra), `shadow` (sombra, sin borde) o `flat` (sin borde ni sombra, solo con un fondo distinto). En oscuro, `shadow` también sube el tono de la superficie.
- **`icons.stroke`** (opcional): `thin` (trazo 1.5) o `regular` (trazo 2).
- **`density`** (opcional): `compact`, `normal` o `airy`. Cambia el espacio entre secciones y el gap de las grillas.

  | Preset    | Tarjetas e imágenes | Botones | Badges | Tarjetas | Íconos  | Densidad |
  | --------- | ------------------- | ------- | ------ | -------- | ------- | -------- |
  | editorial | none                | none    | none   | border   | thin    | airy     |
  | modern    | xl                  | pill    | pill   | shadow   | regular | normal   |
  | elegant   | md                  | sm      | sm     | border   | thin    | airy     |

  ```ts
  shape: { cards: "lg", buttons: "pill" },
  surfaces: { cards: "flat" },
  density: "compact",
  ```

Después de cambiar los colores, validá el contraste:

```bash
npm run check:contrast
```

Si alguna combinación falla, el script muestra los colores y el ratio. La corrección es ajustar el paso de la escala del cliente (por ejemplo, oscurecer `primary.700`), nunca los componentes.

## 4. Contenido

En `src/content/page.ts`:

- **`hero`**: variante `fullscreen`, `compact` o `split`. Con `fullscreen`, el header se superpone a la imagen automáticamente.
- **`sections`**: lista ordenada de secciones. Cada una se identifica por `type` y elige su `variant`. TypeScript indica qué campos acepta cada sección y cuáles son obligatorios.

Los contratos completos están en `src/types/`. Para elegir variantes con el cliente, usá el catálogo en `http://localhost:4321/dev/components` (solo con `npm run dev`): muestra todas las secciones en sus variantes y permite comparar los presets y los temas.

Las secciones disponibles son Hero, About, Services, Benefits, Process, Testimonials, Gallery, FAQ, Location, Contact, CTA, Logos, Stats, Pricing y Video.

### Video

La sección `video` acepta videos de YouTube o Vimeo (`provider` e `id`). El reproductor se carga solo cuando el visitante lo pide; hasta entonces no se contacta a YouTube ni a Vimeo. Si querés mostrar una portada, cargala en `poster`: si no, se muestra un placeholder neutro.

### Logos

Usá logos en SVG o PNG con fondo transparente. En el tema oscuro se muestran como siluetas claras para que se lean sobre el fondo.

### Imágenes

| Origen                  | Cómo usarlo                                                     |
| ----------------------- | --------------------------------------------------------------- |
| Local (recomendado)     | Guardala en `src/assets/images/` e importala. Astro la optimiza |
| `public/` o URL externa | Usá la ruta como texto y agregá `width` y `height`              |

Toda imagen necesita un `alt` que describa su contenido. Si es decorativa, usá `alt: ""`.

### Íconos

Copiá el archivo SVG a `src/icons/` y usá su nombre, sin extensión, en `visual: { type: "icon", name: "..." }`. Si el nombre no existe, la build falla con un mensaje claro.

### Testimonios

Usá solo testimonios reales y verificados. La valoración se muestra únicamente si la cargás.

## 5. Navegación y estructura global

En `site.ts`:

- **`navigation`**: links del menú y del footer. Usá rutas como `/#services` para que funcionen desde cualquier página. El `id` de cada sección es su `type` (`services`, `about`, `contact`…).
- **`header`**: variante `standard` (sticky, con menú) o `minimal`, y CTA opcional.
- **`footer`**: variante `compact` o `expanded`, descripción y canales de contacto.
- **`social`**: redes sociales. Si la lista está vacía, no se muestran.

## 6. Contacto

### Formulario

En la sección `contact` de `page.ts`, el campo `form` define:

- `provider: "netlify"` y un `name` único para el formulario.
- `action: "/thank-you"`: página a la que se redirige después de enviar.
- `fields`: campos del formulario. Usá `autocomplete` (`name`, `email`, `tel`) para facilitar el llenado.

Netlify detecta el formulario automáticamente al desplegar. Los envíos aparecen en el panel de Netlify, en la sección Forms.

### WhatsApp

Cargá el número en formato internacional, con código de país (por ejemplo, `+54 9 11 1234-5678`). Si el número es inválido, la build falla.

- En la sección `contact`: campo `whatsapp`.
- Botón flotante: `floatingWhatsApp` en `site.ts`. Eliminalo si el cliente no lo quiere.

## 7. Mapa

En la sección `location`, `map.embedUrl` es la URL de embed del proveedor (OpenStreetMap o Google Maps). El mapa se carga solo cuando el visitante lo pide.

Si usás otro proveedor, agregá su dominio a `frame-src` en `astro.config.mjs`. Si no, la Content Security Policy lo bloquea.

## 8. Analítica y cookies

La analítica es opcional. Si el cliente la usa, configurá `analytics` en `site.ts`:

```ts
analytics: {
  provider: "google-analytics",
  measurementId: "G-XXXXXXXXXX",
  privacyPolicyUrl: "/privacidad",
},
```

- Google Analytics **no se carga hasta que el visitante acepta** el aviso de cookies. Antes de eso no hay script ni cookies de Google.
- El aviso ofrece Aceptar y Rechazar con el mismo peso visual. El footer incluye "Preferencias de cookies" para cambiar la decisión; si el visitante la retira, se borran las cookies de Google Analytics.
- Si el cliente tiene política de privacidad, indicá su URL en `privacyPolicyUrl`. El texto del aviso se edita en `labels.consent`.
- Si el cliente no usa analítica, eliminá `analytics`: no aparece el aviso y la Content Security Policy no incluye dominios de Google.

El ID de medición se valida al compilar. Si tiene un formato inválido, la build falla.

Con el consentimiento aceptado, además de las visitas se registran estos eventos, sin configuración adicional:

| Evento          | Cuándo                                                             |
| --------------- | ------------------------------------------------------------------ |
| `contact_click` | Clic en un link de WhatsApp, teléfono o email (parámetro `method`) |
| `cta_click`     | Clic en un botón con link (parámetros `link_text` y `link_url`)    |
| `generate_lead` | Envío válido del formulario de contacto (parámetro `form_name`)    |

En Google Analytics, marcá `generate_lead` y `contact_click` como eventos clave para medir las conversiones de la landing.

### Páginas legales

La política de privacidad y los términos están en `src/content/legal/` como archivos Markdown, y se publican en `/legal/privacy` y `/legal/terms`. Se enlazan desde el footer (`footer.legal` en `site.ts`) y la política, desde el aviso de cookies (`analytics.privacyPolicyUrl`).

Los textos de la plantilla son una estructura orientativa con campos entre corchetes (`[email]`, `[plazo]`). **El contenido final tiene que redactarlo o revisarlo un profesional**, según la normativa aplicable al cliente. `check:launch` falla mientras queden corchetes sin completar o el aviso de texto de ejemplo. Si el cliente no necesita una de estas páginas, eliminá el archivo y su link en `footer.legal`.

## 9. Validar antes de publicar

```bash
npm run format:check
npm run lint
npm run check
npm run check:contrast
npm run build
npm run test:e2e
npm run check:launch
```

`test:e2e` prueba la página en un navegador real, en desktop y mobile: accesibilidad WCAG 2.2 AA en ambos temas, desborde horizontal, menú, carrusel, lightbox, formulario, consentimiento de cookies, SEO y Content Security Policy. Las pruebas no dependen del contenido: si el proyecto no incluye una sección, su prueba se omite.

`check:launch` falla si queda contenido de la plantilla: textos, teléfonos y emails de ejemplo, el dominio `example.com`, el ID de Analytics de ejemplo, imágenes de muestra, el favicon de la plantilla o `noindex` activo. En la plantilla falla siempre, a propósito; en un proyecto listo para publicar tiene que pasar sin errores.

Revisá también:

- [ ] La página en mobile y desktop, en ambos temas.
- [ ] Navegación completa con teclado (Tab, Enter, Escape).
- [ ] Que no quede contenido de ejemplo: textos, teléfonos, emails, imágenes de `public/placeholders/`.
- [ ] Que los datos de `business` sean reales. Podés validarlos con la [prueba de resultados enriquecidos](https://search.google.com/test/rich-results) de Google una vez publicado el sitio.
- [ ] Que las imágenes tengan `alt` descriptivo.

## 10. Publicar en Netlify

1. Conectá el repositorio en Netlify. La configuración de build se toma de `netlify.toml`.
2. Configurá el dominio del cliente.
3. En `site.ts`, cambiá `seo.robots` a `"index, follow"`. Con eso, `robots.txt` habilita el rastreo y apunta al sitemap.
4. Enviá un formulario de prueba y verificá que llegue al panel de Netlify.
