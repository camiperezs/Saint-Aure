/**
 * Control de pausa del hero "stage" de Saint Aure (WCAG 2.2.2,
 * docs/plans/hero-header-stage.md, D12). El arco orbital, el brillo del acento,
 * la respiración del fondo y las motas duran más de 5 s, así que el visitante
 * tiene que poder detenerlos. El botón pone `data-paused` en la sección: el CSS
 * congela las animaciones infinitas y `stage-particles.ts` detiene el canvas.
 * La elección se recuerda en este navegador. Sin JS o con movimiento reducido
 * el botón no se muestra (no hay nada que pausar).
 */

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
    // Sin almacenamiento: la pausa vale solo para esta visita.
  }
}

function initStagePause(button: HTMLButtonElement): void {
  const hero = button.closest<HTMLElement>(".hero-stage");
  const label = button.querySelector(".visually-hidden");

  if (!hero) {
    return;
  }

  const apply = (paused: boolean) => {
    hero.toggleAttribute("data-paused", paused);
    button.setAttribute("aria-pressed", String(paused));

    if (label) {
      label.textContent = paused
        ? "Reanudar animaciones"
        : "Pausar animaciones";
    }
  };

  apply(readPaused());
  button.hidden = false;

  button.addEventListener("click", () => {
    const paused = !hero.hasAttribute("data-paused");
    apply(paused);
    savePaused(paused);
  });
}

for (const button of document.querySelectorAll<HTMLButtonElement>(
  "[data-stage-pause]",
)) {
  initStagePause(button);
}
