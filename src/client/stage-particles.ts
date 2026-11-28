/**
 * Motas de luz del hero "stage" de Saint Aure (docs/plans/hero-header-stage.md, D7).
 * Canvas bundleado (sin inline, sin hash de CSP). Densidad por área, ascenso
 * lento, color desde `--stage-dust` / `--stage-dust-k` del tema. Con movimiento
 * reducido se dibuja un solo cuadro estático; fuera de pantalla, con la
 * pestaña oculta o con el hero en pausa (`data-paused`) el bucle se detiene.
 */

interface Mote {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
  phase: number;
}

/** ~48 motas en 1440×900 (D7). */
const DENSITY = 48 / (1440 * 900);
const MIN_MOTES = 18;
const MAX_MOTES = 72;

function createMote(y = Math.random()): Mote {
  return {
    x: Math.random(),
    y,
    r: Math.random() * 1.5 + 0.45,
    speed: Math.random() * 0.00022 + 0.00005,
    alpha: Math.random() * 0.55 + 0.2,
    phase: Math.random() * 6,
  };
}

function initStageDust(canvas: HTMLCanvasElement): void {
  const hero = canvas.parentElement;
  const ctx = canvas.getContext("2d");

  if (!hero || !ctx) {
    return;
  }

  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const motes: Mote[] = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let rgb = "242, 217, 178";
  let strength = 1;
  let frame = 0;
  let visible = true;
  let last = 0;

  const readColor = () => {
    const styles = getComputedStyle(hero);
    rgb = styles.getPropertyValue("--stage-dust").trim() || rgb;
    strength =
      Number.parseFloat(styles.getPropertyValue("--stage-dust-k")) || 1;
  };

  const fitCount = () => {
    const target = Math.round(
      Math.min(
        MAX_MOTES,
        Math.max(MIN_MOTES, hero.clientWidth * hero.clientHeight * DENSITY),
      ),
    );

    while (motes.length < target) {
      motes.push(createMote());
    }

    motes.length = target;
  };

  const draw = (time: number, step: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = `rgb(${rgb})`;

    for (const mote of motes) {
      if (step > 0) {
        mote.y -= mote.speed * step;
        mote.x += Math.sin(time / 2200 + mote.phase) * 0.00014;

        if (mote.y < -0.02) {
          Object.assign(mote, createMote(1.02));
        }
      }

      const alpha =
        step > 0
          ? mote.alpha * (0.55 + 0.45 * Math.sin(time / 950 + mote.phase))
          : mote.alpha * 0.7;

      ctx.globalAlpha = alpha * strength;
      ctx.beginPath();
      ctx.arc(mote.x * width, mote.y * height, mote.r * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  };

  const tick = (time: number) => {
    // Paso normalizado a 60 fps (16 ms), acotado para no saltar al volver.
    const step = last ? Math.min(time - last, 48) : 16;
    last = time;
    draw(time, step);
    frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
  };

  const update = () => {
    const running =
      !reduced.matches &&
      visible &&
      !hero.hasAttribute("data-paused") &&
      document.visibilityState === "visible";

    if (running && !frame) {
      frame = requestAnimationFrame(tick);
    } else if (!running) {
      stop();
      draw(0, 0);
    }
  };

  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    width = canvas.width = Math.round(hero.clientWidth * dpr);
    height = canvas.height = Math.round(hero.clientHeight * dpr);
    fitCount();

    if (!frame) {
      draw(0, 0);
    }
  };

  new ResizeObserver(resize).observe(hero);

  new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    update();
  }).observe(hero);

  // El tema cambia `data-theme` en <html>: se relee el color de las motas.
  new MutationObserver(() => {
    readColor();

    if (!frame) {
      draw(0, 0);
    }
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  // El botón de pausa (stage-motion.ts) pone o quita `data-paused` en el hero.
  new MutationObserver(update).observe(hero, {
    attributes: true,
    attributeFilter: ["data-paused"],
  });

  document.addEventListener("visibilitychange", update);
  reduced.addEventListener("change", update);

  readColor();
  resize();
  update();
}

for (const canvas of document.querySelectorAll<HTMLCanvasElement>(
  "canvas[data-stage-dust]",
)) {
  initStageDust(canvas);
}
