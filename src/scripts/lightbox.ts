export function initLightbox(root: HTMLElement): void {
  const dialog = root.querySelector<HTMLDialogElement>("[data-lightbox]");
  const image = dialog?.querySelector<HTMLImageElement>(
    "[data-lightbox-image]",
  );
  const caption = dialog?.querySelector<HTMLElement>("[data-lightbox-caption]");
  const triggers = [
    ...root.querySelectorAll<HTMLAnchorElement>("[data-lightbox-index]"),
  ];

  if (!dialog || !image || !caption || triggers.length === 0) {
    return;
  }

  let current = 0;

  const show = (index: number) => {
    current = (index + triggers.length) % triggers.length;

    const trigger = triggers[current];
    const thumbnail = trigger?.querySelector("img");

    if (!trigger || !thumbnail) {
      return;
    }

    image.src = trigger.href;
    image.alt = thumbnail.alt;
    caption.textContent = trigger.dataset.caption ?? "";
    caption.hidden = caption.textContent === "";
  };

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      show(index);
      dialog.showModal();
    });
  });

  dialog
    .querySelector("[data-lightbox-close]")
    ?.addEventListener("click", () => dialog.close());
  dialog
    .querySelector("[data-lightbox-prev]")
    ?.addEventListener("click", () => show(current - 1));
  dialog
    .querySelector("[data-lightbox-next]")
    ?.addEventListener("click", () => show(current + 1));

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      show(current - 1);
    } else if (event.key === "ArrowRight") {
      show(current + 1);
    }
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
  });
}
