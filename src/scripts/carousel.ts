export function initCarousel(root: HTMLElement): void {
  const track = root.querySelector<HTMLElement>("[data-carousel-track]");
  const controls = root.querySelector<HTMLElement>("[data-carousel-controls]");
  const previous = root.querySelector<HTMLButtonElement>(
    "[data-carousel-prev]",
  );
  const next = root.querySelector<HTMLButtonElement>("[data-carousel-next]");

  if (!track || !controls || !previous || !next) {
    return;
  }

  const stepSize = () => {
    const item = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;

    return item ? item.getBoundingClientRect().width + gap : track.clientWidth;
  };

  const update = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;

    controls.hidden = maxScroll <= 1;
    previous.setAttribute("aria-disabled", String(track.scrollLeft <= 1));
    next.setAttribute(
      "aria-disabled",
      String(track.scrollLeft >= maxScroll - 1),
    );
  };

  const scroll = (button: HTMLButtonElement, direction: 1 | -1) => {
    if (button.getAttribute("aria-disabled") === "true") {
      return;
    }

    track.scrollBy({ left: direction * stepSize() });
  };

  previous.addEventListener("click", () => scroll(previous, -1));
  next.addEventListener("click", () => scroll(next, 1));
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  requestAnimationFrame(update);
}
