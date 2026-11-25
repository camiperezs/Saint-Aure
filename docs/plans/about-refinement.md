# About refinamiento visual

Alcance: **plantilla y cliente**. Refina la composición de About ya implementada (ver `git log`, plan cerrado `about-editorial`). No es un rediseño: mejora proporción, jerarquía y relación entre elementos existentes. Se tocan tipos, `SectionTitle`, `About`, un ícono y un ajuste de contenido. Hero, Services, Gallery, Stats, Testimonials, CTA y Contact no se tocan.

Referencia: mockup exploratorio de Camila. Estética de peluquería boutique de alta gama: sobria, editorial, mucho espacio negativo.

---

## Decisiones

**D1 — Contenido.**
El texto no se inventa. Cambios de contenido autorizados por Camila:

- `eyebrow`: "Sobre el profesional" (antes "El profesional — Tomas Mooney").
- El nombre "Tomas Mooney" pasa a un campo nuevo `quoteAuthor`, que alimenta el `figcaption` oculto de `Quote` (hoy recibe el eyebrow). Así el nombre no se pierde para lectores de pantalla.
- `title`, `quote`, `description`, `badge` y `action.label` quedan iguales.

**D2 — Resaltado dentro del título.**
Se destaca «atención personalizada» sin HTML en el contenido (D10 del plan anterior: nada de `set:html`). `AboutStandard` suma `titleAccent?: string`, una subcadena exacta de `title`. `SectionTitle` suma la prop `titleAccent` y `SectionTitle.astro` parte el título en tres tramos por interpolación (antes, `<em class="section-title__em">`, después). Si la subcadena no existe en el título, se ignora y se renderiza el título entero. `em` es semántico correcto (énfasis) y los lectores de pantalla no lo leen distinto. Sin guiones ni `<br>`: el balance de líneas lo da `text-wrap: balance`.

**D3 — Jerarquía tipográfica.**
Cuatro niveles, con las fuentes del cliente (Playfair Display y DM Sans):

| Nivel         | Fuente           | Estilo                                            | Color                                          |
| ------------- | ---------------- | ------------------------------------------------- | ---------------------------------------------- |
| Etiqueta      | body             | versalitas, tracking moderado, línea dorada       | `--color-accent-text`                          |
| Título        | `--font-heading` | liviano, más grande que hoy, `text-wrap: balance` | `--color-text-primary`; `em` cursiva en acento |
| Frase (Quote) | `--font-heading` | cursiva, tamaño menor que el título               | `--color-accent-text`                          |
| Descripción   | `--font-body`    | sans, 60 a 65 ch, interlineado 1,7                | marfil cálido (D4)                             |

La tarea es ordenar el tamaño: título > frase > descripción. Los tamaños salen de los tokens de `typography.css`; si falta un escalón se usa el más cercano, no un valor nuevo.

**D4 — Color.**
Sin colores nuevos. El dorado y el champagne son el mismo token `--color-accent-text` (brand-300 en oscuro, brand-700 en claro): la diferencia entre título resaltado y frase la dan la cursiva, el tamaño y el peso, no un segundo tono. Si en el navegador se ven planos, se anota como retoque. El marfil de la descripción se resuelve con un token existente de la escala neutra (`--color-text-primary` o `--color-text-secondary`, el que se vea cálido); solo si ninguno sirve se agrega un token semántico `--color-text-warm` en ambos temas y entra en `check:contrast`. En tema claro la descripción conserva `--color-text-secondary`.

**D5 — Espacio, sin separadores.**
No se agregan filetes entre bloques. El ritmo vertical sale de `gap` por grupo: título, frase, descripción y acción se separan con escalones distintos de `--space-*` (más aire después del título y antes de la acción que entre frase y descripción). Las únicas líneas decorativas siguen siendo las de la etiqueta y la de la tarjeta.

**D6 — Fotografía y marco.**

- Radio de la foto y del marco: `--preset-media-radius` (en el preset elegant es `--radius-md`; en editorial es recto, a propósito).
- Marco: se mantiene `about__image-wrap::before`, borde de 1 px en el acento al 35 %, desplazado `--space-3` abajo y a la izquierda, con el mismo radio. El desfase actual queda; lo que cambia es el radio, el tono y que la foto se asiente sobre el marco.
- Sombra ambiental muy discreta en la foto con `--shadow-default` o la más suave de `borders.css`, sin valores nuevos.
- Segundo contorno: se prueba como `box-shadow` del propio `::before` (un anillo más tenue, 12 % del acento), sin pseudo-elemento extra. Se decide en el navegador: si no suma profundidad clara, se quita. No habrá más de dos líneas.
- Bajo 22 rem el marco sigue ocultándose.

**D7 — Tarjeta de experiencia.**
Oscura en ambos temas (decisión de Camila, cambia D5 del plan anterior que la hacía seguir al tema).

- Superficie: una superficie oscura existente (escala neutra o `--color-surface-*` del tema oscuro) ligeramente distinta del fondo oscuro de la página; texto claro y número en `--color-accent-text` del tema oscuro. Como en modo claro el token semántico es otro, la tarjeta fija sus tokens con una clase de contexto (`about__badge` redefine `--color-text-*` y `--color-accent-text` localmente con los valores del tema oscuro), no con hex. Si no hay forma limpia, se agrega un token semántico `--color-surface-overlay-dark` y se valida.
- Posición: esquina inferior derecha de la foto, **dentro** del borde de la imagen (inset `--space-4`), sin sobresalir. Así se lee como detalle de la foto y no como tarjeta flotante, y desaparece el riesgo de desborde horizontal.
- Número serif liviano, hairline fina, descripción en versalitas más delicadas (menor peso y tracking que hoy). Borde sutil y sombra discreta. Sin `backdrop-filter`: la superficie es opaca al 92 % o más, así que el contraste no depende de la foto.
- La animación de entrada existente no cambia (D8 anterior); no se agregan animaciones nuevas.

**D8 — Botón de contacto.**
`action` pasa de `variant: "link"` con flecha a `variant: "primary"` con ícono de WhatsApp al inicio. El texto no cambia.

- Ícono: `src/icons/whatsapp.svg` (trazo de `currentColor`, cuadrado, 24 px, como el resto) y registro en `src/icons/index.ts`.
- Sin brillos: dentro de About se anulan el gradiente metálico y el glow del primary (`.about .button--primary` con `background-image: none`, `box-shadow: none`, hover = `--color-action-primary-hover`). Hero, CTA y demás conservan su primary. `Button.css` no se modifica.
- Contraste: `--color-text-on-primary` sobre `--color-action-primary` ya está validado en ambos temas.
- Radio: `--preset-button-radius`. Hover: solo cambio de fondo con la transición existente.
- La variante `link` y `iconPosition` quedan en la plantilla aunque About ya no los use.

**D9 — Accesibilidad y modos.**
Se conservan `aria-labelledby`, `figure/blockquote`, foco visible y área táctil. `prefers-contrast: more` y `forced-colors: active` se revisan para la tarjeta y el marco nuevos (borde `CanvasText`/`ButtonText`). El `em` del título no cambia el nombre accesible.

**D10 — OWASP y CSP.**
Sin `set:html`, sin `style=`, sin scripts ni fuentes nuevas, sin dependencias. `titleAccent` es un `string` plano que solo se compara con `title`. Un SVG nuevo en `src/icons/` entra por `?raw` como los demás, controlado por el repo.

**D11 — Qué no se toca.**
Fondo de página, navegación, otras secciones, `Button.css`, animaciones. Sin curvas, texturas, mármol ni luces. Las variantes `centered` e `image-background` de About siguen funcionando: `titleAccent` y `quoteAuthor` son opcionales y los estilos nuevos de foto y tarjeta solo aplican a `split`.

---

## Plan por etapas

Cada etapa se implementa en una sesión nueva con `/etapas docs/plans/about-refinement.md <número>`.

### Etapa 1: Contrato y contenido

- **Objetivo**: el contenido nuevo existe y se renderiza sin cambio visual todavía: etiqueta "Sobre el profesional", autor de la cita separado, y el título puede resaltar una subcadena en `em`.
- **Leer antes**: D1, D2, D10, D11; `src/types/about.ts`; `src/components/ui/SectionTitle/SectionTitle.astro` y `.css`; `About.astro`; `src/content/page.ts` (solo la sección about).
- **Archivos**:
  - `src/types/about.ts`: `titleAccent?: string` y `quoteAuthor?: string` en `AboutStandard`.
  - `SectionTitle.astro`: prop `titleAccent` y partición del título en tres tramos con `<em class="section-title__em">`.
  - `About.astro`: pasar `titleAccent` a `SectionTitle` y `quoteAuthor ?? eyebrow` a `Quote`.
  - `src/content/page.ts`: `eyebrow: "Sobre el profesional"`, `quoteAuthor: "Tomas Mooney"`, `titleAccent: "atención personalizada"`.
  - `src/dev/` (catálogo): una entrada de `SectionTitle` con `titleAccent`, si ya hay una de `accent`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`; `npm run build`; en el HTML generado el `em` envuelve exactamente "atención personalizada" y el `figcaption` dice "Tomas Mooney".
- **Modelo sugerido**: Sonnet (contrato chico y patrón ya existente).
- **Estado**: Implementada.

### Etapa 2: Ícono de WhatsApp y botón plano

- **Objetivo**: el CTA de About es un botón dorado liso con ícono de WhatsApp, sin gradiente ni glow, y el resto de la landing no cambia.
- **Leer antes**: D8, D10, D11; `src/icons/index.ts` y un SVG existente (por ejemplo `message.svg`); `src/components/ui/Icon/Icon.astro`; `src/components/ui/Button/Button.css` (solo `.button--primary` y el bloque del gradiente); `src/utils/action.ts` si el nombre del ícono está tipado.
- **Archivos**:
  - `src/icons/whatsapp.svg` (nuevo) y `src/icons/index.ts`.
  - `src/components/sections/About/About.css`: override de `.about .button--primary` (sin gradiente, sin glow, hover plano).
  - `src/content/page.ts`: `action` con `variant: "primary"`, `icon: "whatsapp"`, sin `iconPosition`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`; catálogo y home a 375 y 1280 px en ambos temas: el botón de About es liso y el del Hero conserva su gradiente; foco visible; `npm run build`.
- **Modelo sugerido**: Sonnet (sigue el patrón de iconos y variantes).
- **Estado**: Implementada.

### Etapa 3: Foto, marco y tarjeta 16+

- **Objetivo**: la foto tiene radio del preset, marco fino dorado desplazado, sombra ambiental y la tarjeta oscura integrada en su esquina inferior derecha.
- **Leer antes**: D6, D7, D9, D11; skill `landing-design`; `About.css` (bloques de imagen y badge); `src/styles/tokens/borders.css` (sombras y radios); `src/styles/themes/dark.css` y `light.css` (superficies y escala neutra).
- **Archivos**:
  - `About.css`: radio y sombra de `.about__image-wrap`, ajuste de `::before` (radio, 35 %, anillo opcional), `.about__badge` reposicionada dentro de la foto, superficie oscura fija, hairline y tipografía más delicada, sin `backdrop-filter`, ajustes de `prefers-contrast` y `forced-colors`.
  - Un token semántico en los dos temas solo si D7 lo exige (más `scripts/check-contrast.ts`).
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`; catálogo y home a 375, 768 y 1280 px, ambos temas, presets elegant, modern y editorial; zoom 200 %; sin desborde horizontal.
- **Modelo sugerido**: Opus (composición visual y contraste de la tarjeta en dos temas).
- **Estado**: Pendiente.

### Etapa 4: Jerarquía tipográfica y ritmo

- **Objetivo**: título protagonista con «atención personalizada» en cursiva dorada, etiqueta con línea, frase en cursiva, descripción sans marfil con medida cómoda, y espacio vertical distinto entre los cuatro grupos.
- **Leer antes**: D3, D4, D5, D9; skill `landing-design`; `SectionTitle.css`; `Quote.css`; `About.css` (bloque de contenido y descripción); `src/styles/tokens/typography.css`.
- **Archivos**:
  - `SectionTitle.css`: título más grande y liviano con `text-wrap: balance`, `.section-title__em` (cursiva, serif, `--color-accent-text`), tracking moderado en la etiqueta. Solo bajo `.section-title--accent`, para no tocar otras secciones.
  - `Quote.css`: ajustar tamaño para que quede por debajo del título.
  - `About.css`: `gap` por grupo en `.about__content`, medida y color de `.about__description`.
  - Token `--color-text-warm` solo si D4 lo exige.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`; home a 375, 768 y 1280 px, ambos temas, los tres presets: el título no se corta con guiones ni queda con una palabra suelta; Hero, Services y demás sin cambios visibles.
- **Modelo sugerido**: Opus (jerarquía visual y contraste).
- **Estado**: Pendiente.

### Etapa 5: Revisión responsive, tests y cierre

- **Objetivo**: About revisada en tablet y mobile, tests al día con el contenido nuevo y el plan cerrado.
- **Leer antes**: este plan; `tests/e2e/accessibility.spec.ts`, `layout.spec.ts`, `interactions.spec.ts`; `docs/architecture/overview.md` §4.2 y §4.4.
- **Archivos**:
  - `tests/e2e/accessibility.spec.ts`: el test de `#about` también comprueba el `em` del título y el autor de la cita.
  - `tests/e2e/interactions.spec.ts`: el link de WhatsApp de About sigue cumpliendo `wa.me`, `target`, `rel` (ahora como botón primary).
  - `docs/architecture/overview.md`: `titleAccent`, `quoteAuthor`, tarjeta dentro de la foto y botón con ícono de WhatsApp.
  - `README.md`: nada, salvo que cambie el pendiente de About.
- **Verificación**: `npm run build`, `npm run test:e2e` completo, `npm run check:contrast`, `npm run check`, `npm run lint`, `npm run format:check`; revisión final en el navegador a 320, 375, 768 y 1280 px, ambos temas. Aplicar los retoques acumulados.
- **Cierre del plan**: llevar a `overview.md` lo indicado, borrar `docs/plans/about-refinement.md` y commitear `docs: close about-refinement plan`.
- **Modelo sugerido**: Sonnet (tests y documentación).
- **Estado**: Pendiente.

---

## Retoques

_Lista vacía._ Candidatos a revisar en el navegador: si dorado y champagne se ven iguales (D4), si el segundo contorno del marco suma (D6).
