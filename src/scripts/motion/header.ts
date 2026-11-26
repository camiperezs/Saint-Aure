import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Header sticky: se oculta al bajar y vuelve al subir (atributo
 * `data-header-hidden`, el CSS hace la transición). Nunca se oculta con el
 * menú móvil abierto ni con el foco dentro; el foco en cualquier enlace del
 * header lo vuelve a mostrar. Devuelve la limpieza.
 */
export function initHeader(): (() => void) | undefined {
  const header = document.querySelector<HTMLElement>(
    ".header--standard[data-header]",
  );

  if (!header) {
    return undefined;
  }

  const setHidden = (hidden: boolean) =>
    header.toggleAttribute("data-header-hidden", hidden);
  const pinned = () =>
    header.hasAttribute("data-menu-open") || header.matches(":focus-within");

  const trigger = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      if (pinned() || self.scroll() < header.offsetHeight * 2) {
        setHidden(false);
        return;
      }

      setHidden(self.direction === 1);
    },
  });

  const show = () => setHidden(false);
  header.addEventListener("focusin", show);

  return () => {
    trigger.kill();
    header.removeEventListener("focusin", show);
    setHidden(false);
  };
}
