import { expect, test } from "./fixtures";

// La variante catalog se usa en la home recién en la etapa 4 del plan;
// mientras tanto estos tests se saltean si la home no la renderiza.
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  test.skip(
    (await page.locator("[data-service-catalog]").count()) === 0,
    "La home no usa Services catalog",
  );
});

test("shows the first specialty selected on load", async ({ page }) => {
  const tabs = page.locator("[data-catalog-tab]");

  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("[data-catalog-panel]:not([hidden])")).toHaveCount(
    1,
  );
  await expect(page.locator("#services [role=tabpanel]:visible")).toHaveCount(
    1,
  );
});

test("clicking a card swaps the panel", async ({ page }) => {
  const tabs = page.locator("[data-catalog-tab]");
  const panel = page.locator("[data-catalog-panel]:not([hidden])");
  const firstTitle = await panel.locator("h3").textContent();

  await tabs.nth(1).click();

  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(tabs.first()).toHaveAttribute("aria-selected", "false");
  await expect(panel).toHaveCount(1);
  await expect(panel.locator("h3")).not.toHaveText(firstTitle ?? "");
  await expect(panel).toHaveAttribute(
    "aria-labelledby",
    (await tabs.nth(1).getAttribute("id")) ?? "",
  );
});

test("arrow buttons cycle endlessly through the specialties", async ({
  page,
}) => {
  const tabs = page.locator("[data-catalog-tab]");
  const previous = page.locator("[data-catalog-prev]");
  const next = page.locator("[data-catalog-next]");
  const last = (await tabs.count()) - 1;

  await next.click();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

  await previous.click();
  await previous.click();
  await expect(tabs.nth(last)).toHaveAttribute("aria-selected", "true");

  await next.click();
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
});

test("keyboard navigation moves between cards", async ({ page, isMobile }) => {
  test.skip(isMobile, "El teclado se prueba en desktop");
  const tabs = page.locator("[data-catalog-tab]");
  const last = (await tabs.count()) - 1;

  await tabs.first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("End");
  await expect(tabs.nth(last)).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(tabs.first()).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await expect(tabs.nth(last)).toBeFocused();

  await page.keyboard.press("Home");
  await expect(tabs.first()).toBeFocused();

  await expect(tabs.first()).toHaveAttribute("tabindex", "0");
  await expect(tabs.nth(1)).toHaveAttribute("tabindex", "-1");
});

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`catalog does not overflow its section at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const overflow = await page.locator("#services").evaluate((section) => {
      const limit = section.getBoundingClientRect().right;
      const track = section.querySelector("[data-catalog-track]");

      return [...section.querySelectorAll("*")]
        .filter((element) => !track?.contains(element))
        .filter((element) => element.getBoundingClientRect().right > limit + 1)
        .map((element) => element.className || element.tagName);
    });
    const pageOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );

    expect(overflow).toEqual([]);
    expect(pageOverflow).toBe(0);
  });
}

test("on mobile the panel comes first, close to the cards", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Solo mobile");
  const track = await page.locator("[data-catalog-track]").boundingBox();
  const panel = await page
    .locator("[data-catalog-panel]:not([hidden])")
    .boundingBox();

  expect(track && panel && track.y - (panel.y + panel.height)).toBeLessThan(96);
  expect(track && panel && panel.y).toBeLessThan(track?.y ?? 0);
});

test("the panel keeps the same size and CTA position for every service", async ({
  page,
}) => {
  const tabs = page.locator("[data-catalog-tab]");
  const seen = new Set<string>();

  for (let i = 0; i < (await tabs.count()); i++) {
    await tabs.nth(i).click();
    const panel = page.locator("[data-catalog-panel]:not([hidden])");
    const box = await panel.boundingBox();
    const cta = await panel.locator(".button").boundingBox();

    seen.add(
      [box?.height, box?.width, cta && cta.y - (box?.y ?? 0)]
        .map((n) => Math.round(n ?? 0))
        .join("/"),
    );
  }

  expect(seen.size).toBe(1);
});
