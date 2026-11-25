# Especialidades — catálogo interactivo

Alcance: **plantilla** (nueva variante `catalog` del componente Services, su script y tipos) más una etapa de **cliente** (`page.ts` y fotos). Referencia visual: mockup opción 1 (carrusel de tarjetas + panel de detalle lateral). El mockup es referencia de composición, no se copia literal.

## Decisiones

- **D1 — Nueva variante, no un componente nuevo.** Se agrega `variant: "catalog"` a `Services` (`grid | list | featured | catalog`). Reutiliza `SectionShell`, `Media`, `ActionButton`, `Icon` y el contrato `Service`. Las variantes existentes no se tocan. Se registra en `src/dev/catalog.ts` y en la tabla del README.
- **D2 — Datos: no se inventa nada.** Se mantienen los 5 servicios y sus títulos reales (Peinados para novias, Balayage, Peinados para eventos, Colorimetría, Alisados). `label` y `featured` **no se muestran** en la variante catalog (sin BRIDAL/GALA/etc.). Datos del panel:
  - Duración y modalidad salen de `specs`. Los `footnote` que hoy dicen "Duración: X" pasan a `specs` con la misma información (`{ icon: "clock", label: "Duración", value: "…" }`). Los footnotes que no son duración ("Diagnóstico previo incluido", "Incluye diagnóstico de tono") se muestran en el panel como línea de nota, sin ícono.
  - Campos opcionales: si un servicio no tiene `specs`, el bloque no se renderiza; si tiene uno solo, ocupa el ancho completo.
  - Presupuesto: `price: { type: "quote", label: "Presupuesto a medida" }` en cada servicio. La frase sale del texto actual de la sección ("Consultá para recibir un presupuesto a medida"), que se elimina del encabezado.
- **D3 — Encabezado.** `eyebrow: "Colección de servicios"` (la clase eyebrow lo pone en mayúsculas) y `title: "Especialidades"`. Se elimina `description` de la sección en `page.ts`. En catalog el `SectionShell` no recibe `description` ni `action`.
- **D4 — Tarjetas = solo navegación.** Foto + nombre del servicio. Sin descripción, specs, precio, badges, flechas decorativas ni categorías. Proporción vertical (aprox. 3:4), `object-fit: cover`, nombre sobre la foto en la parte inferior con un velo mínimo para legibilidad. Radio `md`.
- **D5 — Estado seleccionado.** Borde dorado sutil (`--color-primary-*`, 1 px) y superficie algo más clara; las no seleccionadas con borde hairline y foto algo atenuada. Sin glow ni sombras luminosas. Foco visible con el anillo de foco del sistema, distinto del estado seleccionado.
- **D6 — Semántica y datos en el HTML.** Las tarjetas son un `tablist` (cada una un `button role="tab"` con `aria-selected`, `aria-controls` y roving `tabindex`); el panel es un `role="tabpanel"`. Se renderizan en el servidor **todos** los paneles y se muestra solo el de la selección con `hidden`. Así no hay HTML generado por JS, la primera especialidad aparece seleccionada desde el primer render y sin JS sigue viéndose la primera. Estado inicial: índice 0 (no el `featured`, ya que catalog no reordena).
- **D7 — Flechas.** Dos botones (anterior/siguiente) a los costados del carrusel, que **mueven la selección** y hacen scroll de la tarjeta a la vista (así tarjeta y panel siempre están sincronizados). Se deshabilitan (`aria-disabled`) en los extremos. Teclado: ← → entre tarjetas, Home/End a primera/última. No hay puntos ni contador (evitar indicadores redundantes).
- **D8 — Script.** Nuevo `src/scripts/service-catalog.ts` con el patrón de `carousel.ts` (función `init…(root)` invocada desde el componente por el mecanismo que ya usa Testimonials). Script externo empaquetado por Astro: no requiere hash de CSP inline. Respeta `prefers-reduced-motion` (scroll `auto` en vez de `smooth`).
- **D9 — Transición.** Solo opacidad del panel, ~200 ms, y pasaje de borde/superficie en las tarjetas. Sin desplazamientos, escalas ni parallax. Sin movimiento con `prefers-reduced-motion`.
- **D10 — Panel.** Orden: nombre (serif, protagonista, más grande que cualquier otro texto del panel) → descripción (`max-inline-size` ~ 52ch, color secundario) → specs en 2 columnas con ícono thin (una fila) → nota opcional → presupuesto (bloque con hairline superior y texto pequeño en champagne, no compite con el título) → botón WhatsApp. Botón: `ActionButton` con `whatsapp: { message }`, `variant: "primary"`, ícono `whatsapp` (mismo patrón que el CTA de About). Mensaje: `Hola, quiero consultar por {título}.`, derivado del título real. El panel va sin caja pesada: separado del carrusel por un hairline vertical (desktop), sin tarjeta con sombra.
- **D11 — Layout.**
  - Desktop (≥ 64rem): grilla de dos columnas, carrusel ~ 60 % y panel ~ 40 %, ambas visibles; el carrusel muestra 3 tarjetas completas (la cuarta asoma recortada solo si no compromete el ancho mínimo ~ 11rem por tarjeta).
  - Tablet (48–64rem): una columna, carrusel arriba con ~ 3 tarjetas, panel debajo a ancho completo con specs en 2 columnas.
  - Mobile (< 48rem): una columna. Carrusel horizontal con `scroll-snap` y ~ 2,3 tarjetas visibles (tarjeta ~ 40 vw), panel inmediatamente debajo. Selección y panel visibles sin scroll vertical largo; sin comprimir en dos columnas.
- **D12 — Fotos.** Las define Camila **antes de la etapa 4**. Solo se usan imágenes ya existentes en `public/works/` o `src/assets/images/`. El PNG sin fondo sin trackear en `public/works/` no se commitea en este plan; se decide en la etapa 4. Hasta tener el mapeo, la etapa 4 no se puede cerrar con fotos reales (placeholder `landscape.svg` queda como fallback).
- **D13 — Restricciones.** No se tocan otras secciones, tokens globales de color ni tipografía. Todos los colores con custom properties (nada de hex nuevo). `Services` con variantes grid/list/featured debe renderizar igual que antes.

## Plan por etapas

Cada etapa se implementa en una sesión nueva con `/etapas docs/plans/especialidades-catalogo.md <número>`.

### Etapa 1: Contrato y estructura estática (desktop)

- **Objetivo**: la variante `catalog` existe y se ve en el catálogo `/dev/components`: encabezado reducido, fila de tarjetas (foto + nombre), panel con todos los datos de la primera especialidad. Todavía sin interacción: se ve la primera seleccionada. Variantes anteriores intactas.
- **Leer antes**: D1–D6, D10, D11, D13; `src/types/services.ts`; `Services.astro`, `ServiceCard.astro`, `Services.css`; `src/dev/catalog.ts` (cómo se registran variantes y su contenido de ejemplo); `src/components/sections/About/About.astro` (patrón de botón WhatsApp con ícono); skill `landing-design`.
- **Archivos**: `src/types/services.ts` (variante `catalog`); `src/components/sections/Services/Services.astro` (rama catalog); nuevo `ServiceCatalog.astro` (y `ServiceCatalog.css` si Services.css ya es grande); `src/dev/catalog.ts`.
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`; `npm run dev` → `/dev/components` a 1280 px, dark y light, los tres presets: título protagonista, descripción legible, specs en 2 columnas, presupuesto diferenciado, un solo servicio sin specs no rompe; variantes grid/list/featured idénticas a antes.
- **Modelo sugerido**: Opus (diseño visual, contrato nuevo, jerarquía).
- **Estado**: Implementada. Notas: todos los paneles se renderizan ya con `hidden` (D6); las tarjetas son `li` estáticos con `data-selected` (la etapa 2 las pasa a `button role="tab"`). El ejemplo de `/dev/components` arma los datos de D2 en `src/dev/catalog.ts` (sin tocar `page.ts`). CSS mobile/tablet pendiente de etapa 3.

### Etapa 2: Interacción (selección, flechas, teclado)

- **Objetivo**: clic y flechas cambian la especialidad; tarjeta y panel siempre sincronizados; navegación completa por teclado con foco visible; sin JS se ve la primera especialidad.
- **Leer antes**: D5–D9; `src/scripts/carousel.ts`; cómo `Testimonials.astro` carga su script; el `ServiceCatalog.astro` de la etapa 1; skill `landing-motion`.
- **Archivos**: nuevo `src/scripts/service-catalog.ts`; `ServiceCatalog.astro` (atributos `data-*`, roles ARIA, botones de flecha); su CSS (estados selected/focus/disabled, transición de opacidad del panel).
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`; en `/dev/components`: clic cambia panel, flechas ← → y botones, Home/End, extremos deshabilitados, Tab entra a las tarjetas como un solo grupo (roving), foco visible distinto de la selección, `prefers-reduced-motion` sin movimiento; consola sin errores ni violaciones de CSP.
- **Modelo sugerido**: Opus (accesibilidad no trivial, script nuevo).
- **Estado**: Implementada. Notas: `ServiceLabels` ganó `previous` y `next` (obligatorios; valores en `site.ts`). Tarjetas son `li role="presentation"` con `button role="tab"`; el script va inline-bundled desde `ServiceCatalog.astro`. Verificado con Playwright en `/dev/components` (clic, flechas, Home/End, extremos, roving tabindex, sin errores de consola).

### Etapa 3: Responsive y tests e2e

- **Objetivo**: tablet y mobile resueltos según D11, sin desbordes, y un spec e2e que cubre el comportamiento.
- **Leer antes**: D7, D9, D11; el CSS de las etapas 1–2; un spec e2e existente de carrusel en `tests/` (para copiar el patrón); skill `landing-design`.
- **Archivos**: CSS de `ServiceCatalog`; nuevo spec en `tests/` (p. ej. `service-catalog.spec.ts`).
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`, `npm run check:contrast`; catálogo a 375, 768 y 1280 px (dark/light): scroll horizontal con snap en mobile, panel visible justo debajo, sin overflow horizontal de página; `npm run build` y `npm run test:e2e` solo el spec nuevo más el de desborde/axe que ya exista.
- **Modelo sugerido**: Opus (responsive fino) o Sonnet si la etapa 1 ya dejó el CSS mobile-first prolijo.
- **Estado**: Implementada. Notas: CSS mobile-first (cards `max(40%, 9rem)`, flechas ocultas bajo 48rem; ≥ 48rem flechas y 3 cards; ≥ 64rem dos columnas). `tests/e2e/service-catalog.spec.ts` se saltea mientras la home no use `variant: "catalog"` (la ruta `/dev/components` solo existe en dev); se verificó cambiando temporalmente `page.ts` a catalog (42 tests OK) y revirtiéndolo. En la etapa 4 el spec corre de verdad: confirmar que pasa.

### Etapa 4: Contenido de Saint Aure (cliente)

- **Objetivo**: la home usa `variant: "catalog"` con los 5 servicios, los datos de D2 y las fotos elegidas.
- **Leer antes**: D2, D3, D12; `src/content/page.ts` (sección services y el array `services`); `public/works/`. **Requiere el mapeo de fotos de Camila**: si no lo trajo, pedirlo antes de tocar nada.
- **Archivos**: `src/content/page.ts`; imágenes en `public/works/` o `src/assets/images/` (según D12); `README.md` (pendiente de fotos de servicios, tabla de variantes de Services con `Catalog`).
- **Verificación**: `npm run check`, `npm run lint`, `npm run format:check`; `npm run build`, `npm run test:e2e` completo; revisión de la home a 375 y 1280 px en ambos temas; el select del formulario sigue tomando los títulos de `services`.
- **Modelo sugerido**: Sonnet (contenido).
- **Estado**: Implementada. Retoque posterior (pedido de Camila): sección a pantalla completa, 5 tarjetas siempre visibles sin scroll (miniaturas sin nombre en mobile), flechas compactas con carrusel sin fin (también ← → en teclado), tarjeta elegida enmarcada y elevada, panel en superficie elevada con dos columnas en desktop; reemplaza lo de D7 (extremos deshabilitados) y D9 (sin desplazamientos). Notas: fotos desde `public/works/` (novia, balayage-02, peinado, corte, corte-02); `label`, `featured` y `availabilityBadges` se quitaron de `page.ts` (catalog no los muestra); duración de Eventos y Alisados pasó de `footnote` a `specs`. Falta decidir el PNG sin fondo (sin commitear).

## Retoques

_Lista vacía._

## Cierre del plan

Al terminar la última etapa: llevar a `docs/architecture/overview.md` el contrato de `catalog` (campos usados de `Service`, roles ARIA, script), actualizar la tabla del README, borrar este plan y commitear `docs: close especialidades-catalogo plan`.
