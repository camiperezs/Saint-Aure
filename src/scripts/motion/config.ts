/**
 * Duraciones y curvas del movimiento con GSAP. Espejan los tokens de
 * src/styles/tokens/motion.css (GSAP no lee custom properties): si cambia un
 * token, cambia acá. Las curvas son los equivalentes con nombre de GSAP.
 */
export const duration = {
  fast: 0.12,
  normal: 0.2,
  slow: 0.3,
  reveal: 0.6,
  /** Momento destacado de la página (hero, primera entrada). */
  feature: 1.1,
} as const;

export const ease = {
  /** --ease-out-expo: entradas. */
  enter: "expo.out",
  /** --ease-out-strong: respuestas y salidas rápidas. */
  out: "power4.out",
  /** --ease-in-out-strong: movimiento de A a B. */
  move: "power3.inOut",
  /** Scrub: el scroll marca el ritmo. */
  scrub: "none",
} as const;

export const stagger = {
  lines: 0.08,
  items: 0.06,
} as const;

/** Movimiento con preferencia normal. En `reduce` no se registra nada. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
/** Pin y scroll horizontal: solo desktop con puntero fino. */
export const DESKTOP_FINE = "(min-width: 64rem) and (hover: hover)";
