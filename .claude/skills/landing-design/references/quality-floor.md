# Piso de calidad

Checklist que todo componente cumple antes de darse por terminado. Combina el craft floor de Impeccable, las Web Interface Guidelines de Vercel y la referencia rápida de UI UX Pro Max, filtrado por lo que aplica a una landing estática en Astro. Lo que el repositorio ya valida automáticamente está marcado con (auto).

## Accesibilidad (WCAG 2.2 AA, obligatorio)

- [ ] Contraste de texto de 4.5:1 y de texto grande de 3:1, en **ambos temas** (auto: `npm run check:contrast` para la paleta y axe en `test:e2e`).
- [ ] Contraste de 3:1 para íconos con significado, bordes de inputs y anillos de foco.
- [ ] Un solo `h1` (el del Hero) y títulos sin saltos de nivel (auto: axe).
- [ ] Foco visible con `:focus-visible`, nunca `outline: none` sin reemplazo. El foco no queda tapado por el header sticky (usá `scroll-margin-top` en los anchors de sección).
- [ ] `<button>` para acciones y `<a>` para navegación. Nunca `div` con click.
- [ ] Botones de solo ícono con `aria-label`; íconos decorativos con `aria-hidden="true"`.
- [ ] Imágenes con `alt` descriptivo, o `alt=""` si son decorativas.
- [ ] Objetivo táctil de 24×24 CSS px como mínimo (WCAG 2.2); en controles principales, 44px (los botones ya tienen `min-height: 2.75rem`).
- [ ] El color nunca es el único indicador (errores, plan destacado, estado activo).
- [ ] Mensajes asíncronos (envío de formulario) en una región `aria-live="polite"`.

## Formularios (`ContactForm`)

- [ ] Label visible y persistente en cada campo. El placeholder es un ejemplo, no un label.
- [ ] `type`, `inputmode` y `autocomplete` correctos (`email`, `tel`, `name`).
- [ ] Se puede pegar en todos los campos.
- [ ] Validación al salir del campo, no mientras se escribe. Los campos vacíos se reportan al enviar.
- [ ] Error al lado del campo con `aria-describedby`; al enviar con errores, foco en el primer campo inválido.
- [ ] El error se borra apenas el campo es válido. Nunca se borra lo que escribió el visitante.
- [ ] El botón de envío está habilitado hasta que arranca el envío; durante el envío muestra `aria-busy="true"` (el spinner ya existe en `Button.css`).

## Tipografía y contenido

- [ ] Body de 1rem como mínimo; medida de 45 a 75 caracteres.
- [ ] `text-wrap: balance` en títulos y `pretty` en párrafos.
- [ ] Puntos suspensivos "…" (un carácter) en estados de carga: "Enviando…".
- [ ] Espacio duro en unidades y montos: `10&nbsp;km`, `$&nbsp;25.000`.
- [ ] `tabular-nums` en números comparables.
- [ ] Los contenedores de texto aguantan contenido largo: `min-inline-size: 0` en hijos flex y `overflow-wrap: anywhere` en tokens largos (emails, URLs), nunca `word-break: break-all` en prosa.
- [ ] Probado con el texto más largo que podría cargar un cliente.

## Layout y responsive

- [ ] Mobile-first, sin scroll horizontal a 320px (auto: `layout.spec.ts`).
- [ ] Revisado en los breakpoints de referencia: 40, 48, 64 y 80rem.
- [ ] `min-block-size: 100svh` (o `dvh`) en lugar de `100vh` para alturas de viewport.
- [ ] Layouts de borde a borde respetan `env(safe-area-inset-*)`.
- [ ] El orden de lectura y de foco coincide con el orden visual (cuidado con `order` y `grid-area`).
- [ ] No se oculta información esencial en mobile.

## Rendimiento

- [ ] Imágenes con `width`/`height` o `aspect-ratio` (CLS < 0.1).
- [ ] La imagen del hero (LCP) con `priority`; el resto con lazy loading.
- [ ] Imágenes locales por el pipeline de Astro (AVIF/WebP y `srcset`).
- [ ] Sin scripts de terceros innecesarios; mapas y videos se cargan bajo demanda (ya es contrato).
- [ ] Animaciones solo con `transform`, `opacity`, `clip-path` o `filter` (ver landing-motion).

## Estados

- [ ] Hover solo con puntero que lo soporta: `@media (hover: hover) and (pointer: fine)`.
- [ ] Los estados hover, active y focus son más notorios que el reposo.
- [ ] Estados de carga, error y éxito en formularios.
- [ ] Contenido vacío: si una sección opcional no tiene datos, no se renderiza rota.

## Tema y navegador

- [ ] `color-scheme` correcto por tema (inputs y scrollbars nativos).
- [ ] `<meta name="theme-color">` coincide con el fondo.
- [ ] `<select>` nativo con `background-color` y `color` explícitos (modo oscuro de Windows).
- [ ] Selección de texto y anillo de foco con colores del tema (ya definidos en `global.css`).
- [ ] Nada de `user-scalable=no` ni `maximum-scale=1`.

## Verificación final

```bash
npm run check
npm run lint
npm run check:contrast
npm run test:e2e
```
