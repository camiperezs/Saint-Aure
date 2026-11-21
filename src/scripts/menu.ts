export function initMenu(container: HTMLElement): void {
  const button =
    container.querySelector<HTMLButtonElement>("[data-menu-button]");
  const menu = container.querySelector<HTMLElement>("[data-menu]");

  if (!button || !menu) {
    return;
  }

  const isOpen = () => button.getAttribute("aria-expanded") === "true";

  const setOpen = (open: boolean) => {
    button.setAttribute("aria-expanded", String(open));
    container.toggleAttribute("data-menu-open", open);
  };

  button.hidden = false;
  container.setAttribute("data-menu-ready", "");

  button.addEventListener("click", () => setOpen(!isOpen()));

  menu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      setOpen(false);
    }
  });

  container.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });
}
