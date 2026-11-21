# Recetas de movimiento

Todas respetan la CSP (sin `style=""`), van en el CSS del componente dentro de `@layer components` y usan los tokens de `motion.css`. Los tokens `--ease-out-strong`, `--ease-out-expo`, `--ease-in-out-strong` y `--duration-reveal` todavía no existen: agregalos a `src/styles/tokens/motion.css` la primera vez que una receta los necesite (valores en la SKILL.md).

## 1. Feedback al presionar (Button)

```css
.button {
  transition:
    var(--transition-colors),
    transform var(--duration-fast) var(--ease-out-strong);
}

.button:active:not(:disabled) {
  transform: scale(0.97);
}
```

## 2. Hover de tarjeta con media (Services, Gallery)

Se mueve el hijo, no la tarjeta, y solo con un puntero que soporta hover.

```css
.service-card {
  overflow: hidden;
}

.service-card__image {
  transition: transform var(--duration-slow) var(--ease-out-strong);
}

@media (hover: hover) and (pointer: fine) {
  .service-card:hover .service-card__image {
    transform: scale(1.03);
  }
}
```

Si la tarjeta tiene radio y la imagen está arriba, el `overflow: hidden` va en el contenedor que recorta la imagen, para que la escala no pise el contenido.

## 3. Entrada coreografiada del hero (el momento memorable)

Una sola secuencia al cargar: el titular, la descripción y las acciones, en ese orden. No se aplica a la imagen del hero, porque es el LCP y tiene que pintarse de inmediato.

```css
@media (prefers-reduced-motion: no-preference) {
  .hero__title,
  .hero__description,
  .hero__actions {
    animation: hero-rise var(--duration-reveal) var(--ease-out-expo) both;
  }

  .hero__description {
    animation-delay: 80ms;
  }

  .hero__actions {
    animation-delay: 160ms;
  }
}

@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(0.75rem);
  }
}
```

El desplazamiento es chico (0.75rem). Un titular que viaja 40px se siente como un template.

## 4. Revelado al hacer scroll (una o dos secciones como máximo)

CSS puro con un timeline de vista. Sin soporte o con movimiento reducido, el contenido se ve normal.

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .process__step {
      animation: reveal linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 60%;
    }
  }
}

@keyframes reveal {
  from {
    opacity: 0.2;
    transform: translateY(1rem);
  }
}
```

- La curva es `linear` porque la "duración" la pone el scroll. Para suavizar, ajustá `animation-range`, no la curva.
- La opacidad arranca en 0.2, no en 0: el contenido nunca está invisible del todo y se reducen los falsos positivos de contraste en axe.

## 5. Escalonado sin `style=""`

La CSP no permite `style="--i: 2"`. Usá `:nth-child()` hasta un tope razonable; los elementos que pasan el tope entran juntos.

```css
.benefit-card:nth-child(2) {
  animation-delay: 50ms;
}
.benefit-card:nth-child(3) {
  animation-delay: 90ms;
}
.benefit-card:nth-child(4) {
  animation-delay: 120ms;
}
.benefit-card:nth-child(n + 5) {
  animation-delay: 140ms;
}
```

Con `animation-timeline: view()`, cada elemento ya entra cuando aparece, así que en general no hace falta escalonar: el scroll genera el escalonado solo.

## 6. Revelado de imagen con `clip-path` (Gallery, About)

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .about__image {
      animation: clip-reveal linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 40%;
    }
  }
}

@keyframes clip-reveal {
  from {
    clip-path: inset(0 0 100% 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

No lo uses en imágenes que pueden ser el LCP (hero).

## 7. Header que se compacta al hacer scroll

```css
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .header--standard {
      animation: header-compact linear both;
      animation-timeline: scroll(root);
      animation-range: 0 8rem;
    }
  }
}

@keyframes header-compact {
  to {
    background-color: var(--color-surface);
    box-shadow: var(--shadow-subtle);
  }
}
```

Animá colores y sombra, no la altura: cambiar la altura mueve el layout.

## 8. Entrada de dialog y menú con `@starting-style`

Para el lightbox (`<dialog>`) y el menú móvil, sin JavaScript extra:

```css
.lightbox[open] {
  opacity: 1;
  transform: scale(1);
  transition:
    opacity var(--duration-slow) var(--ease-out-strong),
    transform var(--duration-slow) var(--ease-out-strong),
    overlay var(--duration-slow) allow-discrete,
    display var(--duration-slow) allow-discrete;

  @starting-style {
    opacity: 0;
    transform: scale(0.96);
  }
}
```

## 9. Acordeón del FAQ (`details`)

Animar la altura es la excepción aceptada para acordeones. Con `interpolate-size` como mejora progresiva:

```css
@supports (interpolate-size: allow-keywords) {
  .faq__item {
    interpolate-size: allow-keywords;
  }

  .faq__item::details-content {
    block-size: 0;
    overflow: clip;
    transition:
      block-size var(--duration-slow) var(--ease-out-strong),
      content-visibility var(--duration-slow) allow-discrete;
  }

  .faq__item[open]::details-content {
    block-size: auto;
  }
}
```

## 10. Contador en Stats (Web Animations o rAF)

`StatItem.value` es texto ("+500", "98%"). El HTML generado ya trae el valor final; el script solo anima visualmente si se cumple todo esto:

- el valor empieza con un número parseable;
- no hay `prefers-reduced-motion: reduce`;
- el elemento entra en pantalla (`IntersectionObserver`, una sola vez).

Esquema en `src/scripts/`, inicializado como el resto de los scripts del proyecto. El atributo `data-stat-value` se agrega en `.stats__value` dentro de `Stats.astro`:

```ts
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

export function initStatCounters(root: ParentNode = document): void {
  if (reduce.matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        countUp(entry.target as HTMLElement);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );

  root.querySelectorAll<HTMLElement>("[data-stat-value]").forEach((el) => {
    observer.observe(el);
  });
}
```

`countUp` lee el número, conserva el prefijo y el sufijo, y actualiza el texto con `requestAnimationFrame` durante unos 1200ms con una curva ease-out. Para accesibilidad: el número animado va en un `span` con `aria-hidden="true"` y el valor final queda en un texto con la utilidad `.visually-hidden` (`src/styles/utilities/accessibility.css`), así el lector de pantalla no lee los valores intermedios. Usá `tabular-nums` para que el ancho no salte.

## 11. Transición entre páginas (home → thank-you, legales)

View Transitions entre documentos, sin el router de Astro (que agrega JavaScript):

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
}
```

Va en un CSS global (`src/styles/base/global.css`). Por defecto hace un fundido cruzado. Para morphing de un elemento, asigná el mismo `view-transition-name` en ambas páginas (por ejemplo, el logo del header).

## 12. Marquee de Logos (solo si el cliente lo pide)

El movimiento automático infinito necesita un control de pausa visible (WCAG 2.2.2). Si no se implementa ese control, no hay marquee: la variante `row` estática ya resuelve la prueba social. Si se implementa:

- el contenido se duplica una vez, con la copia en `aria-hidden="true"`;
- la curva es `linear` y se pausa con `:hover`, `:focus-within` y el botón de pausa;
- con movimiento reducido no hay animación y se muestra la fila estática.
