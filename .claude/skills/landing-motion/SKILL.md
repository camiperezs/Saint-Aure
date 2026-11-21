---
name: landing-motion
description: Animaciones, transiciones y efectos de scroll para los componentes de esta plantilla de landings (Astro + CSS nativo, sin librerías, CSP con hashes). Usala al agregar o revisar cualquier movimiento, sea hover, entrada del hero, revelado al hacer scroll, contadores, carruseles o transiciones entre páginas, y al auditar animaciones existentes. Primero CSS, luego Web Animations API. GSAP solo con una decisión de arquitectura explícita.
---

# Movimiento en landings ChamDev

Destilado de `emilkowalski/skills` (emil-design-eng, animate, review-animations), `pbakaus/impeccable` (animate), `greensock/gsap-skills` y las Web Interface Guidelines de Vercel, adaptado a este repositorio. Las fuentes y licencias están en [../README.md](../README.md).

Principio central: **un solo momento coreografiado vale más que efectos repartidos por todos lados.** El movimiento explica un cambio de estado, da continuidad o dirige la atención. Si solo está porque "queda lindo", es deuda.

## Restricciones del repositorio

- **Sin librerías de cliente** (registro de decisiones en [overview.md](../../../docs/architecture/overview.md): "Client-side libraries: None"; "Avoid unnecessary animation libraries"). Todo se resuelve con CSS y, si hace falta, un script chico en `src/scripts/`.
- **CSP con hashes:** no hay atributos `style=""` en el markup. Nada de `style="--i: 3"` para escalonar; usá `:nth-child()` o clases.
- **Tokens:** duraciones y curvas salen de `src/styles/tokens/motion.css`. No escribas `cubic-bezier` sueltos en componentes; si falta una curva, agregala como token.
- **Movimiento reducido:** `src/styles/base/global.css` reduce todas las duraciones a 0.01ms con `prefers-reduced-motion: reduce`. Esa regla **no alcanza** para las animaciones atadas al scroll (`animation-timeline`), cuyo avance no depende de la duración. Toda animación de scroll va dentro de `@media (prefers-reduced-motion: no-preference)`.
- **El contenido es visible por defecto.** Sin soporte, sin JavaScript o con movimiento reducido, la página se ve completa y en su estado final. El efecto es una mejora progresiva (`@supports`).
- Los tests e2e corren axe. Un elemento a mitad de una animación de opacidad puede fallar el chequeo de contraste: corré `npm run test:e2e` después de agregar efectos.

## Decidir antes de animar

### 1. ¿Con qué frecuencia lo ve el visitante?

| Frecuencia                                                            | Decisión                                   |
| --------------------------------------------------------------------- | ------------------------------------------ |
| Constante (hover de links, navegación del menú)                       | Mínimo o nada: solo color, 120 a 200ms     |
| Ocasional (abrir menú, lightbox, acordeón FAQ)                        | Animación estándar, 200 a 300ms            |
| Una vez por visita (entrada del hero, primer revelado de una sección) | Acá vive el momento memorable, 500 a 800ms |

### 2. ¿Para qué sirve?

Propósitos válidos: confirmar una acción (presionar un botón), hacer legible un cambio de estado (abrir el FAQ), dar continuidad espacial (lightbox desde la miniatura), dirigir la atención (el CTA del hero) o explicar algo (pasos de `process`). "Se ve moderno" no es un propósito.

### 3. ¿Con qué herramienta? (la más barata que funcione)

| Necesidad                                              | Herramienta                                                                                       |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Hover, active, focus, cambio de clase o de atributo    | `transition` de CSS                                                                               |
| Entrada al aparecer en el DOM (dialog, menú)           | `@starting-style`                                                                                 |
| Secuencia fija al cargar (entrada del hero)            | `@keyframes` con `animation-delay`                                                                |
| Ligada al scroll (revelado, progreso, header)          | `animation-timeline: view()` o `scroll()`                                                         |
| Continuidad entre páginas (home → thank-you)           | View Transitions entre documentos: `@view-transition { navigation: auto; }`                       |
| Valores dinámicos o interrumpibles (contador de Stats) | Web Animations API (`element.animate()`) o `requestAnimationFrame` en un script de `src/scripts/` |
| Pin, scrub complejo, SplitText                         | **GSAP**: solo si se cambia el registro de decisiones (ver más abajo)                             |

### 4. Propiedades

- Animá **solo** `transform`, `opacity`, `clip-path` y `filter` (blur menor a 20px). Nunca `width`, `height`, `top`, `left`, `margin` ni `padding`.
- Nunca `transition: all`: nombrá cada propiedad.
- Nunca `scale(0)`: entrá desde `scale(0.95)` con `opacity: 0`.
- Usá `translate` en porcentaje (`translateY(100%)`) para mover por el tamaño del propio elemento.
- `transform-origin` en el disparador para popovers y menús; los modales quedan centrados.
- `will-change` solo durante la animación, nunca permanente.

### 5. Curvas y duraciones

| Situación                                | Curva                | Duración           |
| ---------------------------------------- | -------------------- | ------------------ |
| Feedback al presionar                    | ease-out fuerte      | 100 a 160ms        |
| Hover y color                            | `ease`               | 150 a 200ms        |
| Abrir menú, FAQ, dropdown                | ease-out fuerte      | 200 a 300ms        |
| Modal, lightbox                          | ease-out fuerte      | 250 a 400ms        |
| Entrada del hero, revelado destacado     | ease-out exponencial | 500 a 800ms        |
| Movimiento en pantalla (de A a B)        | ease-in-out fuerte   | 300 a 500ms        |
| Movimiento constante (marquee, progreso) | `linear`             | según la distancia |

- **Nunca `ease-in` en la interfaz**: retrasa justo el momento que el visitante mira.
- Las curvas nativas de CSS son débiles para entradas. Los siguientes tokens ya están definidos en `motion.css`:

```css
--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1);
--duration-reveal: 600ms;
--duration-spin: 800ms;
```

- La salida es más rápida que la entrada (60 a 70% de la duración).
- Escalonado de 30 a 80ms entre elementos. Más que eso se siente lento. El escalonado nunca bloquea la interacción.
- Sin rebotes ni curvas elásticas por reflejo.

## Reglas por tipo de efecto

- **Hover:** solo con `@media (hover: hover) and (pointer: fine)`. El elemento con hover no se mueve a sí mismo (se escapa del cursor y parpadea); mové un hijo: `.card:hover .card__media { transform: scale(1.03); }`.
- **Presionar:** `scale(0.97)` en `:active` con 160ms. Aplicable a `.button`.
- **Revelado al hacer scroll:** no lo pongas en todas las secciones con el mismo fade hacia arriba (es la marca número uno de landing hecha por IA). Elegí 1 o 2 secciones donde el revelado comunique algo: los pasos de `process` en orden, la `gallery` abriéndose o las cifras de `stats`.
- **Loops y autoplay:** todo movimiento automático de más de 5 segundos necesita un control de pausa (WCAG 2.2.2), se detiene fuera de pantalla y con movimiento reducido. Los carruseles de esta plantilla no tienen autoplay, y así se quedan.
- **Movimiento reducido:** menos y más suave, no necesariamente cero. Quitá desplazamientos, escalas y parallax; un fundido de opacidad corto puede quedar.

Las recetas listas para copiar están en [references/recipes.md](references/recipes.md).

## GSAP: cuándo y cómo

GSAP es gratis desde 2025 (incluidos ScrollTrigger y SplitText), pero esta plantilla decidió no tener librerías de cliente. Usalo solo si un cliente necesita algo que CSS no resuelve (pin con scrub de varias etapas, texto dividido por líneas con máscara, scroll horizontal) y **después** de:

1. Proponerlo y registrar la decisión en la tabla del punto 15 de `overview.md`.
2. Cargarlo solo en la página que lo usa, como módulo de `src/scripts/` (la CSP ya permite `'self'`).

Si se usa: `gsap.registerPlugin()` una sola vez; todo dentro de `gsap.matchMedia()` con la condición `(prefers-reduced-motion: reduce)`; `autoAlpha` en lugar de `opacity`; ScrollTrigger en el timeline y no en los tweens hijos; nunca `scrub` y `toggleActions` juntos; `ScrollTrigger.refresh()` después de que carguen fuentes e imágenes; SplitText después de `document.fonts.ready`, con `aria: "auto"` y sin `text-wrap: balance` en ese elemento; sin `markers` en producción.

## Modo revisión

Para auditar animaciones existentes, seguí [references/review.md](references/review.md). El resultado es una tabla **Antes / Después / Por qué** con `archivo:línea`, y un veredicto de aprobar o bloquear.
