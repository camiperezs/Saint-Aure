const STORAGE_KEY = "saint-aure:stage-motion";

function readPaused(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "paused";
  } catch {
    return false;
  }
}

function savePaused(paused: boolean): void {
  try {
    if (paused) {
      localStorage.setItem(STORAGE_KEY, "paused");
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    return;
  }
}

function initMotionPause(button: HTMLButtonElement): void {
  const scope = button.closest<HTMLElement>("[data-motion-scope]");
  const label = button.querySelector(".visually-hidden");
  const { labelPause = "", labelResume = "" } = button.dataset;

  if (!scope) {
    return;
  }

  const apply = (paused: boolean) => {
    scope.toggleAttribute("data-paused", paused);
    button.setAttribute("aria-pressed", String(paused));

    if (label) {
      label.textContent = paused ? labelResume : labelPause;
    }
  };

  apply(readPaused());
  button.hidden = false;

  button.addEventListener("click", () => {
    const paused = !scope.hasAttribute("data-paused");
    apply(paused);
    savePaused(paused);
  });
}

for (const button of document.querySelectorAll<HTMLButtonElement>(
  "[data-motion-pause]",
)) {
  initMotionPause(button);
}
