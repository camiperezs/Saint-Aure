import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { duration, ease, stagger } from "./config";

const SCOPE_DEFAULT: ParentNode = document;

/**
 * Títulos: líneas enmascaradas que suben. Marcado: `data-reveal="lines"`.
 * El CSS oculta el título (`visibility`) hasta que `data-reveal-state="ready"`.
 * SplitText agrega `aria-label` y esconde los tramos a los lectores.
 */
export function revealLines(scope: ParentNode = SCOPE_DEFAULT): void {
  scope
    .querySelectorAll<HTMLElement>('[data-reveal="lines"]')
    .forEach((element) => {
      SplitText.create(element, {
        type: "lines",
        mask: "lines",
        linesClass: "motion-line",
        autoSplit: true,
        aria: "auto",
        onSplit(self) {
          element.dataset.revealState = "ready";
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: duration.feature,
            ease: ease.enter,
            stagger: stagger.lines,
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        },
      });
    });
}

/**
 * Filetes y líneas doradas: se dibujan. Marcado: `data-reveal-rule` en el
 * contenedor; el CSS escala los filetes con `--rule` (0 a 1), así que sirve
 * también para pseudo-elementos.
 */
export function drawRules(scope: ParentNode = SCOPE_DEFAULT): void {
  scope
    .querySelectorAll<HTMLElement>("[data-reveal-rule]")
    .forEach((element) => {
      gsap.fromTo(
        element,
        { "--rule": 0 },
        {
          "--rule": 1,
          duration: duration.feature,
          ease: ease.enter,
          delay: 0.1,
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        },
      );
    });
}

/**
 * Imágenes: revelado con `clip-path` y asentamiento de escala. Marcado:
 * `data-reveal="image"` en el marco; la primera `img` o `picture` hija escala.
 * Nunca toca `opacity`, para no retrasar el LCP.
 */
export function revealImages(scope: ParentNode = SCOPE_DEFAULT): void {
  scope
    .querySelectorAll<HTMLElement>('[data-reveal="image"]')
    .forEach((frame) => {
      const inner = frame.querySelector<HTMLElement>("img, picture");
      const trigger = { trigger: frame, start: "top 88%", once: true };

      gsap.from(frame, {
        clipPath: "inset(0 0 100% 0)",
        duration: duration.feature,
        ease: ease.enter,
        scrollTrigger: trigger,
      });

      if (inner) {
        gsap.from(inner, {
          scale: 1.12,
          duration: duration.feature * 1.4,
          ease: ease.enter,
          scrollTrigger: trigger,
        });
      }
    });
}

/** Espera las fuentes (SplitText mide líneas), sin colgarse si tardan. */
export function whenFontsReady(timeoutMs = 1500): Promise<void> {
  return Promise.race([
    document.fonts.ready.then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}

/**
 * Cifras: cuentan hasta el valor. Marcado: `data-count` en el elemento cuyo
 * texto es el valor final (`16+`, `5`). Solo cuenta si el texto es prefijo +
 * entero + sufijo; cualquier otro texto se deja intacto. Al terminar se
 * restaura el texto original exacto.
 */
export function countNumbers(scope: ParentNode = SCOPE_DEFAULT): void {
  scope.querySelectorAll<HTMLElement>("[data-count]").forEach((element) => {
    const final = element.textContent ?? "";
    const match = final.match(/^(\D*)(\d+)(\D*)$/);

    if (!match) {
      return;
    }

    const [, prefix, digits, suffix] = match;
    const state = { value: 0 };
    element.textContent = `${prefix}0${suffix}`;

    gsap.to(state, {
      value: Number(digits),
      duration: duration.feature * 1.2,
      ease: "power2.out",
      snap: { value: 1 },
      scrollTrigger: { trigger: element, start: "top 90%", once: true },
      onUpdate() {
        element.textContent = `${prefix}${state.value}${suffix}`;
      },
      onComplete() {
        element.textContent = final;
      },
    });
  });
}
