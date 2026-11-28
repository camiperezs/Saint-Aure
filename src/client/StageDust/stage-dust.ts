interface Mote {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
  phase: number;
}

const DENSITY = 48 / (1440 * 900);
const MIN_MOTES = 18;
const MAX_MOTES = 72;
const FRAME_MS = 16;
const MAX_STEP_MS = 48;

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
  const area = canvas.parentElement;
  const ctx = canvas.getContext("2d");

  if (!area || !ctx) {
    return;
  }

  const scope = canvas.closest<HTMLElement>("[data-motion-scope]") ?? area;
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
    const styles = getComputedStyle(canvas);
    rgb = styles.getPropertyValue("--stage-dust").trim() || rgb;
    strength =
      Number.parseFloat(styles.getPropertyValue("--stage-dust-k")) || 1;
  };

  const fitCount = () => {
    const target = Math.round(
      Math.min(
        MAX_MOTES,
        Math.max(MIN_MOTES, area.clientWidth * area.clientHeight * DENSITY),
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

  const drawStill = () => {
    if (!frame) {
      draw(0, 0);
    }
  };

  const tick = (time: number) => {
    const step = last ? Math.min(time - last, MAX_STEP_MS) : FRAME_MS;
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
      !scope.hasAttribute("data-paused") &&
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
    width = canvas.width = Math.round(area.clientWidth * dpr);
    height = canvas.height = Math.round(area.clientHeight * dpr);
    fitCount();
    drawStill();
  };

  new ResizeObserver(resize).observe(area);

  new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    update();
  }).observe(area);

  new MutationObserver(() => {
    readColor();
    drawStill();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  new MutationObserver(update).observe(scope, {
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
