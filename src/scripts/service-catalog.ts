export function initServiceCatalog(root: HTMLElement): void {
  const tabs = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-catalog-tab]"),
  );
  const panels = Array.from(
    root.querySelectorAll<HTMLElement>("[data-catalog-panel]"),
  );
  const track = root.querySelector<HTMLElement>("[data-catalog-track]");
  const previous = root.querySelector<HTMLButtonElement>("[data-catalog-prev]");
  const next = root.querySelector<HTMLButtonElement>("[data-catalog-next]");

  if (tabs.length === 0 || tabs.length !== panels.length) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = Math.max(
    0,
    tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"),
  );

  const select = (index: number, focus = false) => {
    current = Math.min(Math.max(index, 0), tabs.length - 1);

    tabs.forEach((tab, i) => {
      const isSelected = i === current;

      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      tab.toggleAttribute("data-selected", isSelected);
    });
    panels.forEach((panel, i) => {
      panel.hidden = i !== current;
    });

    previous?.setAttribute("aria-disabled", String(current === 0));
    next?.setAttribute("aria-disabled", String(current === tabs.length - 1));

    const tab = tabs[current];

    if (track) {
      const left =
        tab.offsetLeft - (track.clientWidth - tab.offsetWidth) / 2 || 0;

      track.scrollTo({
        left: Math.max(0, left),
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }

    if (focus) {
      tab.focus();
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
