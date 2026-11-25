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

  const select = (index: number, focus = false) => {
    // Carrusel sin fin: pasado el último vuelve al primero y al revés.
    current = (index + tabs.length) % tabs.length;

    tabs.forEach((tab, i) => {
      const isSelected = i === current;

      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      tab.toggleAttribute("data-selected", isSelected);
    });
    panels.forEach((panel, i) => {
      panel.hidden = i !== current;
    });

    // En mobile las cards se desplazan: la elegida queda siempre a la vista.
    const track = tabs[current].closest<HTMLElement>("[data-catalog-track]");
    if (track && track.scrollWidth > track.clientWidth) {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  tabs.forEach((tab, i) => tab.addEventListener("click", () => select(i)));

  tabs.forEach((tab) =>
    tab.addEventListener("keydown", (event) => {
      const keys: Record<string, number> = {
        ArrowLeft: current - 1,
        ArrowRight: current + 1,
        Home: 0,
        End: tabs.length - 1,
      };

      if (event.key in keys) {
        event.preventDefault();
        select(keys[event.key], true);
      }
    }),
  );

  previous?.addEventListener("click", () => select(current - 1));
  next?.addEventListener("click", () => select(current + 1));

  select(current);
}
