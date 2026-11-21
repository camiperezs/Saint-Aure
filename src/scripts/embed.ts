export function initEmbed(container: HTMLElement): void {
  const trigger =
    container.querySelector<HTMLAnchorElement>("[data-embed-load]");
  const { embedSrc, embedTitle, embedAllow } = container.dataset;

  if (!trigger || !embedSrc) {
    return;
  }

  trigger.addEventListener("click", (event) => {
    event.preventDefault();

    const frame = document.createElement("iframe");
    frame.className = "embed__frame";
    frame.src = embedSrc;
    frame.title = embedTitle ?? "";
    frame.loading = "lazy";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.allowFullscreen = true;

    if (embedAllow) {
      frame.allow = embedAllow;
    }

    container.replaceChildren(frame);
    frame.focus();
  });
}
