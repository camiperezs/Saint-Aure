export function initServiceCatalog(root: HTMLElement): void {
  const tabs = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-catalog-tab]"),
  );
  const panels = Array.from(
    root.querySelectorAll<HTMLElement>("[data-catalog-panel]"),
  );
  const previous = root.querySelector<HTMLButtonElement>("[data-catalog-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-catalog-next]");

  if (tabs.length === 0 || tabs.length !== panels.length) {
    return;
  }

  let current = Math.max(
    0,
    tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"),
  );

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  /**
   * `direction` (1 adelante, -1 atrás) orienta el cruce del panel. Sin
   * dirección (primer render) no se anima. Con movimiento reducido el panel
   * cambia sin desplazamiento.
   */
  const select = (index: number, focus = false, direction = 0) => {
    const previousIndex = current;
    // Carrusel sin fin: pasado el último vuelve al primero y al revés.
    current = (index + tabs.length) % tabs.length;

    tabs.forEach((tab, i) => {
      const isSelected = i === current;

      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      tab.toggleAttribute("data-selected", isSelected);
    });
    root.style.setProperty("--catalog-dir", String(direction || 1));
    panels.forEach((panel, i) => {
      panel.hidden = i !== current;
    });

    if (
      direction !== 0 &&
      current !== previousIndex &&
      !reducedMotion.matches
    ) {
      const offset = `${direction * 1.5}rem`;
      panels[current].animate(
        [
          { opacity: 0, transform: `translateX(${offset})` },
          { opacity: 1, transform: "translateX(0)" },
        ],
        { duration: 400, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
    }

    // En mobile las cards se desplazan: la elegida queda siempre a la vista.
    const track = tabs[current].closest<HTMLElement>("[data-catalog-track]");
    if (track && track.scrollWidth > track.clientWidth) {
      const reduce = reducedMotion.matches;
      const card = tabs[current].parentElement as HTMLElement;
      track.scrollTo({
        left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
        behavior: reduce ? "auto" : "smooth",
      });
    }

    if (focus) {
      tabs[current].focus({ preventScroll: true });
    }
  };

  tabs.forEach((tab, i) =>
    tab.addEventListener("click", () => select(i, false, i > current ? 1 : -1)),
  );

  tabs.forEach((tab) =>
    tab.addEventListener("keydown", (event) => {
      const keys: Record<string, [number, number]> = {
        ArrowLeft: [current - 1, -1],
        ArrowRight: [current + 1, 1],
        Home: [0, -1],
        End: [tabs.length - 1, 1],
      };

      if (event.key in keys) {
        event.preventDefault();
        const [index, direction] = keys[event.key];
        select(index, true, direction);
      }
    }),
  );

  previous?.addEventListener("click", () => select(current - 1, false, -1));
  next?.addEventListener("click", () => select(current + 1, false, 1));

  select(current);
}
