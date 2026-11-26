import { gsap } from "gsap";
import { duration, ease } from "./config";

/**
 * Galería `portfolio` (desktop): la sección se fija y las imágenes recorren
 * el ancho con scrub. Se llama dentro de `matchMedia(DESKTOP_FINE)`: en mobile,
 * tablet y movimiento reducido no corre y queda la grilla normal. Devuelve la
 * limpieza que deshace pin, clase y listeners.
 *
 * Teclado (D7): con el recorrido fijado, Tab sobre una imagen que está fuera
 * de vista lleva el scroll vertical hasta el punto donde esa imagen aparece.
 */
export function initGallery(): (() => void) | undefined {
  const section = document.querySelector<HTMLElement>(".gallery--portfolio");
  const viewport = section?.querySelector<HTMLElement>(
    "[data-gallery-viewport]",
  );
  const track = viewport?.querySelector<HTMLElement>(".gallery__items");
  const progress = section?.querySelector<HTMLElement>(
    "[data-gallery-progress]",
  );

  if (!section || !viewport || !track) {
    return undefined;
  }

  section.classList.add("is-horizontal");

  const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

  const travel = gsap.to(track, {
    x: () => -distance(),
    ease: ease.scrub,
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${distance()}`,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  const trigger = travel.scrollTrigger;

  if (progress) {
    gsap.fromTo(
      progress,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: ease.scrub,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    );
  }

  track.querySelectorAll<HTMLElement>(":scope > li").forEach((item) => {
    const inner = item.querySelector<HTMLElement>("img");
    const scrollTrigger = {
      trigger: item,
      containerAnimation: travel,
      start: "left 92%",
      once: true,
    };

    gsap.from(item, {
      clipPath: "inset(0 100% 0 0)",
      duration: duration.feature,
      ease: ease.enter,
      scrollTrigger,
    });

    if (inner) {
      gsap.from(inner, {
        scale: 1.12,
        duration: duration.feature * 1.4,
        ease: ease.enter,
        scrollTrigger,
      });
    }
  });

  const onFocusIn = (event: FocusEvent) => {
    const target = event.target;

    if (
      !trigger ||
      !(target instanceof HTMLElement) ||
      !target.matches(".gallery__trigger:focus-visible")
    ) {
      return;
    }

    const item = target.closest("li") ?? target;
    const max = distance();

    if (max === 0) {
      return;
    }

    const centered =
      item.offsetLeft - (viewport.clientWidth - item.offsetWidth) / 2;
    const ratio = Math.min(1, Math.max(0, centered / max));

    window.scrollTo({
      top: trigger.start + ratio * (trigger.end - trigger.start),
      behavior: "instant",
    });
  };

  section.addEventListener("focusin", onFocusIn);

  return () => {
    section.removeEventListener("focusin", onFocusIn);
    section.classList.remove("is-horizontal");
  };
}
