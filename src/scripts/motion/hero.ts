import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { duration, ease, stagger } from "./config";

/**
 * Hero fullscreen: entrada coreografiada y compresión al hacer scroll.
 *
 * - Foto: cortina con `clip-path` (sin `opacity`, para no retrasar el LCP) y
 *   asentamiento de escala. La cortina dura 1 s.
 * - Titular: líneas enmascaradas que suben, cuando las fuentes están listas.
 * - Resto del contenido: sube y aparece escalonado. El CSS lo deja oculto bajo
 *   `has-motion`; el failsafe de motion-init.js lo muestra si esto no corre.
 * - Scroll: el marco de la foto se comprime (escala, sube y se redondea) y el
 *   texto sale con parallax suave. Solo `transform`, `opacity` y `clip-path`.
 */
export function initHero(fontsReady: Promise<void>): void {
  const hero = document.querySelector<HTMLElement>("[data-hero]");

  if (!hero) {
    return;
  }

  const frame = hero.querySelector<HTMLElement>("[data-hero-frame]");
  const media = hero.querySelector<HTMLElement>(".background-media");
  const image = hero.querySelector<HTMLElement>(".background-media img");
  const content = hero.querySelector<HTMLElement>("[data-hero-content]");
  const title = hero.querySelector<HTMLElement>("[data-hero-title]");
  const items = gsap.utils.toArray<HTMLElement>("[data-hero-in]", hero);

  const intro = gsap.timeline({ defaults: { ease: ease.enter } });

  if (media) {
    intro.fromTo(
      media,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1 },
      0,
    );
  }

  if (image) {
    intro.fromTo(
      image,
      { scale: 1.12 },
      { scale: 1, duration: duration.feature * 1.4 },
      0,
    );
  }

  // Filete del eyebrow (--rule) y entrada escalonada del resto.
  intro.fromTo(hero, { "--rule": 0 }, { "--rule": 1, duration: 0.9 }, 0.55);
  intro.fromTo(
    items,
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: duration.feature,
      stagger: stagger.items * 2,
    },
    0.7,
  );

  if (title) {
    void fontsReady.then(() => {
      SplitText.create(title, {
        type: "lines",
        mask: "lines",
        linesClass: "motion-line",
        autoSplit: true,
        aria: "auto",
        onSplit(self) {
          title.dataset.revealState = "ready";
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: duration.feature,
            ease: ease.enter,
            stagger: stagger.lines,
            delay: 0.45,
          });
        },
      });
    });
  }

  const scrub = {
    trigger: hero,
    start: "top top",
    end: "bottom top",
    scrub: true,
  };

  if (frame) {
    gsap.to(frame, {
      scale: 0.9,
      yPercent: 6,
      borderRadius: "2rem",
      transformOrigin: "50% 0%",
      ease: ease.scrub,
      scrollTrigger: scrub,
    });
  }

  if (content) {
    gsap.to(content, {
      yPercent: -14,
      opacity: 0,
      ease: ease.scrub,
      scrollTrigger: { ...scrub, end: "bottom 35%" },
    });
  }
}
