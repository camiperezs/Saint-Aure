import { gsap } from "gsap";
import { duration, ease } from "./config";

/**
 * About (split con imagen): la foto se revela con `clip-path` (helper
 * `revealImages`, marcado en el marco) y además tiene parallax interno con
 * scrub; el badge entra después de la foto y su cifra cuenta (`countNumbers`).
 * El texto del título lo cubre `revealLines`. Solo `transform` y `opacity`.
 */
export function initAbout(): void {
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((frame) => {
    const image = frame.querySelector<HTMLElement>("img");

    if (!image) {
      return;
    }

    gsap.fromTo(
      image,
      { yPercent: -4 },
      {
        yPercent: 4,
        ease: ease.scrub,
        scrollTrigger: {
          trigger: frame,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });

  document
    .querySelectorAll<HTMLElement>("[data-about-badge]")
    .forEach((badge) => {
      gsap.fromTo(
        badge,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: duration.reveal,
          ease: ease.enter,
          delay: 0.5,
          scrollTrigger: {
            trigger: badge,
            start: "top 92%",
            once: true,
          },
        },
      );
    });
}
