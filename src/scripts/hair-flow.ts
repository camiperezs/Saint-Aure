/**
 * HeroHairFlow: parallax con el cursor. Solo con ratón real y sin
 * `prefers-reduced-motion`. No sigue al cursor: acerca la posición actual a
 * la objetivo con inercia (lerp) y se detiene cuando se estabiliza. Solo
 * escribe --hair-x / --hair-y; el CSS traslada los contenedores y nunca toca
 * la geometría de los paths.
 */
export function initHairFlow(flow: HTMLElement): void {
  const hero = flow.closest<HTMLElement>(".hero");
  const canHover = matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  if (!hero || !canHover.matches || reduced.matches) {
    return;
  }

  const EASING = 0.05;
  const EPSILON = 0.001;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let frame = 0;

  const render = () => {
    currentX += (targetX - currentX) * EASING;
    currentY += (targetY - currentY) * EASING;
    flow.style.setProperty("--hair-x", currentX.toFixed(4));
    flow.style.setProperty("--hair-y", currentY.toFixed(4));

    const settled =
      Math.abs(targetX - currentX) < EPSILON &&
      Math.abs(targetY - currentY) < EPSILON;
    frame = settled ? 0 : requestAnimationFrame(render);
  };

  const schedule = () => {
    if (!frame) {
      frame = requestAnimationFrame(render);
    }
  };

  hero.addEventListener(
    "pointermove",
    (event) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const rect = hero.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      schedule();
    },
    { passive: true },
  );

  hero.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    schedule();
  });
}
