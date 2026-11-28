import { expect, setStorage, test } from "./fixtures";

const STORAGE_KEY = "saint-aure:stage-motion";

test("el hero tiene un único h1 con el acento y sus dos acciones", async ({
  page,
}) => {
  await page.goto("/");

  const hero = page.locator(".hero-stage");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(hero.locator("h1")).toHaveId("hero-stage-title");
  await expect(hero).toHaveAttribute("aria-labelledby", "hero-stage-title");
  await expect(hero.locator("h1 em")).toHaveText("imaginaste,");
  await expect(hero.locator(".hero-stage__lead")).toContainText(
    "Rosario, Roldán y Baigorria",
  );

  const whatsapp = hero.getByRole("link", { name: "Consultar por WhatsApp" });
  await expect(whatsapp).toHaveAttribute("href", /^https:\/\/wa\.me\//);
  await expect(
    hero.getByRole("link", { name: "Ver trabajos" }),
  ).toHaveAttribute("href", "#gallery");
});

test.describe("movimiento normal", () => {
  test.use({ reducedMotion: "no-preference" });

  test("el botón pausa y reanuda las animaciones y recuerda la elección", async ({
    page,
  }) => {
    await page.goto("/");

    const hero = page.locator(".hero-stage");
    const button = page.locator("[data-motion-pause]");

    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("aria-pressed", "false");
    await expect(button).toHaveAccessibleName("Pausar animaciones");

    await button.click();
    await expect(hero).toHaveAttribute("data-paused", "");
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(button).toHaveAccessibleName("Reanudar animaciones");
    expect(
      await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY),
    ).toBe("paused");

    const running = await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter(
            (animation) =>
              animation.effect instanceof KeyframeEffect &&
              animation.effect.target?.closest(".hero-stage") &&
              animation.effect.getComputedTiming().iterations === Infinity &&
              animation.playState === "running",
          ).length,
    );
    expect(running).toBe(0);

    await page.reload();
    await expect(hero).toHaveAttribute("data-paused", "");
    await expect(button).toHaveAttribute("aria-pressed", "true");

    await button.click();
    await expect(hero).not.toHaveAttribute("data-paused", "");
    expect(
      await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY),
    ).toBeNull();
  });

  test("con la pausa guardada el hero arranca quieto", async ({ page }) => {
    await setStorage(page, STORAGE_KEY, "paused");
    await page.goto("/");

    await expect(page.locator(".hero-stage")).toHaveAttribute(
      "data-paused",
      "",
    );
  });
});

test.describe("movimiento reducido", () => {
  test.use({ reducedMotion: "reduce" });

  test("no muestra el botón de pausa", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-motion-pause]")).toBeHidden();
  });
});

test.describe("sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("no muestra el botón de pausa", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-motion-pause]")).toBeHidden();
  });
});
