import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

/**
 * Contrato de accesibilidad del movimiento (README, Saint Aure: movimiento):
 * `has-motion` solo existe con `prefers-reduced-motion: no-preference` y con JS;
 * en cualquier otro caso la home se ve completa y estática.
 */

const REVEALED = [
  "h1",
  ".section-title__heading",
  ".stats__value",
  ".stats__label",
  ".service-catalog__cards > li",
  ".about__image",
  ".about__badge",
  ".cta__panel",
  ".background-media",
  "[data-hero-in]",
];

/** Elementos del contenido que quedan invisibles (opacidad, visibilidad o clip-path). */
async function hiddenContent(page: Page) {
  return page.evaluate((selectors) => {
    const hidden: string[] = [];

    for (const selector of selectors) {
      for (const element of document.querySelectorAll(selector)) {
        for (
          let node: Element | null = element;
          node;
          node = node.parentElement
        ) {
          const style = getComputedStyle(node);
          const inset = /^inset\((.*)\)$/.exec(style.clipPath);
          const clipped =
            inset !== null &&
            (inset[1].match(/[\d.]+/g) ?? []).some((n) => Number(n) !== 0);

          if (
            Number(style.opacity) < 0.99 ||
            style.visibility === "hidden" ||
            clipped
          ) {
            hidden.push(`${selector} (${node.className || node.tagName})`);
            break;
          }
        }
      }
    }

    return hidden;
  }, REVEALED);
}

async function stats(page: Page) {
  return page.locator(".stats__value").allTextContents();
}

test.describe("sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("la home muestra todo el contenido", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("html")).not.toHaveClass(/has-motion/);
    expect(await hiddenContent(page)).toEqual([]);
    expect((await stats(page)).map((value) => value.trim())).toEqual(
      expect.arrayContaining(["16+", "5", "Rosario & Roldán"]),
    );
  });
});

test.describe("movimiento reducido", () => {
  test.use({ reducedMotion: "reduce" });

  test("la home queda en su estado final y no registra movimiento", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("load");

    await expect(page.locator("html")).not.toHaveClass(/has-motion/);
    expect(await hiddenContent(page)).toEqual([]);
    expect((await stats(page)).map((value) => value.trim())).toEqual(
      expect.arrayContaining(["16+", "5", "Rosario & Roldán"]),
    );

    // Sin pin ni scrub: ningún ScrollTrigger deja un espaciador en el DOM.
    await expect(page.locator(".pin-spacer")).toHaveCount(0);
    await expect(page.locator(".gallery.is-horizontal")).toHaveCount(0);
  });

  test("el panel del catálogo cambia sin animaciones de desplazamiento", async ({
    page,
  }) => {
    await page.goto("/");

    const tabs = page.getByRole("tab");
    await tabs.nth(1).scrollIntoViewIfNeeded();
    await tabs.nth(1).click();

    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    const running = await page.evaluate(
      () =>
        document.getAnimations().filter(
          (animation) =>
            // `visibility` es una transición discreta, no se desplaza nada.
            !(
              animation instanceof CSSTransition &&
              animation.transitionProperty === "visibility"
            ) &&
            animation.effect instanceof KeyframeEffect &&
            animation.effect.target?.closest("[role=tabpanel]") &&
            animation.playState === "running",
        ).length,
    );
    expect(running).toBe(0);
  });
});

test.describe("movimiento normal", () => {
  test.use({ reducedMotion: "no-preference" });

  test("la home activa el movimiento y termina con todo visible", async ({
    page,
  }) => {
    await page.goto("/");

    const root = page.locator("html");
    await expect(root).toHaveClass(/has-motion/);
    await expect(root).toHaveAttribute("data-motion-ready", "");

    // Recorre la página para disparar todos los reveals.
    await page.evaluate(async () => {
      const step = Math.max(300, window.innerHeight / 2);
      const total = document.documentElement.scrollHeight;

      for (let y = 0; y <= total; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 120));
      }
    });
    await page.waitForTimeout(1500);

    // Al volver arriba el hero (que se comprime con el scroll) se descomprime:
    // todo el contenido tiene que quedar visible.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);

    await expect(root).toHaveClass(/has-motion/);
    const hidden = await hiddenContent(page);
    expect(hidden).toEqual([]);
  });

  test("las cifras terminan en su valor exacto", async ({ page }) => {
    await page.goto("/");
    await page.locator(".stats").scrollIntoViewIfNeeded();
    await page.waitForTimeout(3000);

    expect((await stats(page)).map((value) => value.trim())).toEqual(
      expect.arrayContaining(["16+", "5", "Rosario & Roldán"]),
    );
  });

  test("las páginas sin movimiento no cargan el módulo", async ({ page }) => {
    await page.goto("/thank-you/");

    const root = page.locator("html");
    await expect(root).not.toHaveClass(/has-motion/);
    await expect(root).not.toHaveAttribute("data-motion-ready", "");
  });
});
