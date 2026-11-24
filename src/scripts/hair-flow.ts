/**
 * HeroHairFlow: control del movimiento.
 *
 * - La deformación ambiental de los trazos es SMIL (<animate>) declarada en el
 *   markup; acá solo se pausa con `prefers-reduced-motion`.
 * - Parallax con el cursor: solo con ratón real y sin reduced-motion. No sigue
 *   al cursor: acerca la posición actual a la objetivo con inercia (lerp) y
 *   se detiene cuando se estabiliza.
 */
export function initHairFlow(flow: HTMLElement): void {
  const svg = flow.querySelector<SVGSVGElement>("svg");
  const hero = flow.closest<HTMLElement>(".hero");
  const canHover = matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");

  const syncReducedMotion = () => {
    if (!svg) {
      return;
    }

    if (reduced.matches) {
      svg.pauseAnimations();
      svg.setCurrentTime(0);
    } else {
      svg.unpauseAnimations();
    }
  };

  syncReducedMotion();
  reduced.addEventListener("change", syncReducedMotion);

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
