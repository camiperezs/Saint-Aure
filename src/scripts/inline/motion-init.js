(() => {
  const root = document.documentElement;

  if (!matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    return;
  }

  root.classList.add("has-motion");

  // Failsafe: si el módulo de movimiento no arrancó, el contenido se muestra.
  setTimeout(() => {
    if (!("motionReady" in root.dataset)) {
      root.classList.remove("has-motion");
    }
  }, 3000);
})();
