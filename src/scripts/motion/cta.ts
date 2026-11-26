import { gsap } from "gsap";
import { duration, ease } from "./config";

/**
 * CTA `badge`: el panel se descubre con `clip-path` y el logo entra con un
 * asentamiento de escala. El CSS deja ambos en su estado inicial bajo
 * `has-motion`; el failsafe de motion-init.js los muestra. Solo `clip-path`,
 * `scale` y `opacity` del logo (no es LCP).
 */
export function initCta(): void {
  document
    .querySelectorAll<HTMLElement>(".cta--badge .cta__panel")
    .forEach((panel) => {
      const badge = panel.querySelector<HTMLElement>(".cta__badge");
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: panel, start: "top 85%", once: true },
      });

      // Valores finales explícitos y sin `clearProps`: al limpiar, el CSS de
      // `has-motion` (estado inicial oculto) volvería a aplicarse.
      timeline.fromTo(
        panel,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: duration.feature,
          ease: ease.enter,
        },
      );

      if (badge) {
        timeline.fromTo(
          badge,
          { opacity: 0, scale: 0.6 },
          {
            opacity: 1,
            scale: 1,
            duration: duration.reveal,
            ease: ease.enter,
          },
          0.45,
        );
      }
    });
}

/**
 * Efecto magnético en los botones primarios de hero y CTA. Solo con puntero
 * fino (se registra dentro de `matchMedia`). El botón se acerca un poco al
 * cursor cuando está cerca, vía `--mx` / `--my` (el CSS aplica `translate`),
 * así no pisa el `scale` de `:active`. Devuelve la limpieza.
 */
export function initMagnetic(): () => void {
  const reach = 56;
  const pull = 0.3;
  const max = 10;

  const items = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".hero .button--primary, .cta .button--primary",
    ),
  ).map((element) => {
    element.dataset.magnetic = "";
    return {
      element,
      x: gsap.quickTo(element, "--mx", {
        duration: duration.reveal,
        ease: ease.out,
      }),
      y: gsap.quickTo(element, "--my", {
        duration: duration.reveal,
        ease: ease.out,
      }),
      offsetX: 0,
      offsetY: 0,
    };
  });

  const clamp = (value: number) => Math.max(-max, Math.min(max, value));

  const onMove = (event: PointerEvent) => {
    for (const item of items) {
      const rect = item.element.getBoundingClientRect();
      // El rect incluye el desplazamiento actual: se resta para medir contra
      // el centro de reposo y evitar el temblor.
      const cx = rect.left + rect.width / 2 - item.offsetX;
      const cy = rect.top + rect.height / 2 - item.offsetY;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const near =
        Math.abs(dx) < rect.width / 2 + reach &&
        Math.abs(dy) < rect.height / 2 + reach;

      item.offsetX = near ? clamp(dx * pull) : 0;
      item.offsetY = near ? clamp(dy * pull) : 0;
      item.x(item.offsetX);
      item.y(item.offsetY);
    }
  };

  const onLeave = () => {
    for (const item of items) {
      item.offsetX = 0;
      item.offsetY = 0;
      item.x(0);
      item.y(0);
    }
  };

  document.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);

  return () => {
    document.removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    for (const item of items) {
      delete item.element.dataset.magnetic;
      gsap.set(item.element, { clearProps: "--mx,--my" });
    }
  };
}
