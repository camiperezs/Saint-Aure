import { gsap } from "gsap";
import { duration, ease, stagger } from "./config";

/**
 * Stats: los filetes se dibujan (`drawRules` sobre cada ítem), las cifras
 * cuentan (`countNumbers`) y el texto de cada ítem sube escalonado. La cifra de
 * texto (`kind: "text"`) no cuenta, solo se revela. El CSS deja ocultos los
 * textos bajo `has-motion`; el failsafe de motion-init.js los muestra.
 */
export function initStats(): void {
  document.querySelectorAll<HTMLElement>(".stats__item").forEach((item) => {
    const parts = item.querySelectorAll<HTMLElement>(
      ".stats__value, .stats__label, .stats__description",
    );

    gsap.fromTo(
      parts,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: duration.reveal,
        ease: ease.enter,
        stagger: stagger.items,
        scrollTrigger: { trigger: item, start: "top 88%", once: true },
      },
    );
  });
}
