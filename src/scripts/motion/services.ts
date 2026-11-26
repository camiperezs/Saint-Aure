import { gsap } from "gsap";
import { duration, ease, stagger } from "./config";

/**
 * Catálogo de servicios: las tarjetas entran escalonadas. El cruce del panel
 * de detalle vive en src/scripts/service-catalog.ts (CSS y Web Animations).
 * El CSS deja ocultos los `li` bajo `has-motion`; el failsafe de
 * motion-init.js los muestra.
 */
export function initServices(): void {
  document
    .querySelectorAll<HTMLElement>("[data-catalog-track]")
    .forEach((track) => {
      gsap.fromTo(
        track.children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: duration.reveal,
          ease: ease.enter,
          stagger: stagger.items * 1.5,
          clearProps: "transform",
          scrollTrigger: { trigger: track, start: "top 88%", once: true },
        },
      );
    });
}
