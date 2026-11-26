/**
 * Entrada del movimiento de Saint Aure (GSAP). Solo se carga en la home.
 * Todo vive dentro de `gsap.matchMedia()`: con movimiento reducido no se
 * registra nada y la página queda en su estado final. Ver docs/plans/motion-moderno.md.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MOTION_OK } from "./config";
import { initAbout } from "./about";
import { initHero } from "./hero";
import { initServices } from "./services";
import { initStats } from "./stats";
import {
  countNumbers,
  drawRules,
  revealImages,
  revealLines,
  whenFontsReady,
} from "./helpers";

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;

// Avisa al failsafe del script inline de que el módulo arrancó.
root.dataset.motionReady = "";

const mm = gsap.matchMedia();

mm.add(MOTION_OK, () => {
  root.classList.add("has-motion");
  let cancelled = false;
  const fontsReady = whenFontsReady();

  // La cortina de la foto (LCP) arranca ya; el titular espera a las fuentes.
  initHero(fontsReady);

  void fontsReady.then(() => {
    if (cancelled) {
      return;
    }

    revealLines();
    drawRules();
    revealImages();
    countNumbers();
    initAbout();
    initStats();
    initServices();
    ScrollTrigger.refresh();
  });

  return () => {
    cancelled = true;
    root.classList.remove("has-motion");
  };
});
