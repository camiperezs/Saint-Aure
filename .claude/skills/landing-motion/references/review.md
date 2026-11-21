# Revisión de animaciones

Basado en review-animations e improve-animations de Emil Kowalski, adaptado a este repositorio.

## Recorrido

1. **Reconocimiento:** leé `src/styles/tokens/motion.css` y buscá movimiento en el código.

   ```bash
   grep -rnE "transition|animation|@keyframes|animation-timeline|\.animate\(|requestAnimationFrame" src
   ```

2. **Mapa de frecuencia:** clasificá cada animación como constante, ocasional o única por visita (tabla de la SKILL.md).
3. **Auditoría en 8 categorías:**
   1. Propósito y frecuencia.
   2. Curva y duración.
   3. Origen y física (`transform-origin`, escala inicial).
   4. Interrupción: transiciones para estados que cambian rápido, no keyframes.
   5. Rendimiento (propiedades animadas, `will-change`).
   6. Accesibilidad (movimiento reducido, pausa de loops, hover protegido).
   7. Coherencia con los tokens (curvas y duraciones de `motion.css`).
   8. Oportunidades perdidas: el momento memorable que falta.
4. **Verificación:** cada hallazgo con `archivo:línea` y comprobado en el código, no supuesto.

## Bloquean (se corrigen siempre)

| Nunca                                                                                                | En su lugar                                               |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `transition: all`                                                                                    | Propiedades explícitas                                    |
| Entrada con `scale(0)`                                                                               | `scale(0.95)` + `opacity: 0`                              |
| `ease-in` en la interfaz                                                                             | ease-out fuerte (`--ease-out-strong`)                     |
| Animar `width`, `height`, `top`, `left`, `margin` o `padding` (salvo el acordeón)                    | `transform`, `opacity` o `clip-path`                      |
| Animación de scroll sin `@media (prefers-reduced-motion: no-preference)`                             | Envolverla                                                |
| Contenido invisible si la animación no corre (`opacity: 0` fuera de `@supports` o de la media query) | Estado final como base y el efecto como mejora progresiva |
| Hover con movimiento sin `@media (hover: hover) and (pointer: fine)`                                 | Protegerlo                                                |
| Loop o autoplay de más de 5s sin pausa                                                               | Control de pausa o eliminarlo                             |
| Atributo `style=""` para escalonar                                                                   | `:nth-child()` o clases (lo exige la CSP)                 |
| Animar la imagen LCP del hero                                                                        | Dejarla estática                                          |
| Curva o duración escrita a mano en el componente                                                     | Token de `motion.css`                                     |
| La misma entrada animada en todas las secciones                                                      | Un momento coreografiado; el resto, quieto                |

## Ajustan (se corrigen si no hay una razón)

- Una duración de más de 300ms en un elemento de interfaz que no es modal, lightbox ni momento único: bajala a 150 a 250ms.
- Escalonado de más de 80ms por elemento.
- Desplazamiento de entrada de más de 1.5rem.
- Bounce o elastic sin una personalidad de marca que lo justifique.
- Salida igual o más lenta que la entrada.
- `will-change` permanente.
- Blur de más de 20px (es caro en Safari).

## Orden de corrección

1. Borrar lo que no tiene propósito.
2. Reducir lo excesivo.
3. Corregir curvas.
4. Corregir origen y física.
5. Hacerlo interrumpible.
6. Pasarlo a GPU.
7. Tiempos asimétricos (la salida más rápida).
8. Pulido.
9. Accesibilidad y coherencia.

## Formato del resultado

Una tabla por archivo, una fila por hallazgo (la fila de abajo es solo un ejemplo de formato):

| Severidad | Ubicación           | Antes                   | Después                                                                                       | Por qué                                                          |
| --------- | ------------------- | ----------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Alta      | `Componente.css:24` | `transition: all 300ms` | `transition: var(--transition-colors), transform var(--duration-fast) var(--ease-out-strong)` | `all` anima propiedades de layout y 300ms es lento para feedback |

- **Alta:** rompe la sensación, la accesibilidad o el rendimiento.
- **Media:** se nota que está mal.
- **Baja:** pulido.

Cerrá con un veredicto: **Bloquear** si hay al menos un hallazgo de la tabla "Bloquean", o **Aprobar**.

## Comprobación manual

- Bajá la velocidad de las animaciones a 10% en el panel Animations de Chrome DevTools: los colores tienen que cruzarse limpio, la curva no frena de golpe y el origen es el correcto.
- Emulá `prefers-reduced-motion: reduce` en DevTools (Rendering) y verificá que todo el contenido se ve.
- Probá en un celular real los gestos del carrusel y del lightbox.
