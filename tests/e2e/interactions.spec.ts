import { expect, setStorage, test } from "./fixtures";

test.beforeEach(async ({ page }) => {
  await setStorage(page, "cookie-consent", "denied");
  await page.goto("/");
});

test("carousel controls reflect the scroll position", async ({ page }) => {
  const controls = page.locator("[data-carousel-controls]");
  test.skip((await controls.count()) === 0, "No carousel on this page");
  test.skip(await controls.isHidden(), "Carousel items fit without scrolling");

  const previous = page.locator("[data-carousel-prev]");
  const next = page.locator("[data-carousel-next]");

  await expect(previous).toHaveAttribute("aria-disabled", "true");
  await expect(next).toHaveAttribute("aria-disabled", "false");

  await next.click();
  await expect(previous).toHaveAttribute("aria-disabled", "false");
  await expect(next).toBeFocused();
});

test("lightbox opens, navigates, closes and restores focus", async ({
  page,
}) => {
  const triggers = page.locator(".gallery__trigger");
  test.skip((await triggers.count()) < 2, "No gallery lightbox on this page");

  const altOf = (index: number) =>
    triggers.nth(index).locator("img").getAttribute("alt");
  const dialog = page.locator("[data-lightbox]");
  const image = page.locator("[data-lightbox-image]");

  await triggers.first().click();
  await expect(dialog).toBeVisible();
  await expect(image).toHaveAttribute("alt", (await altOf(0)) ?? "");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).overflow,
    ),
  ).toBe("hidden");

  await page.keyboard.press("ArrowRight");
  await expect(image).toHaveAttribute("alt", (await altOf(1)) ?? "");

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(triggers.first()).toBeFocused();
});

test("FAQ allows several answers open at once", async ({ page }) => {
  const questions = page.locator(".faq__item summary");
  test.skip((await questions.count()) < 2, "No FAQ accordion on this page");

  await questions.nth(0).click();
  await questions.nth(1).click();

  await expect(page.locator(".faq__item[open]")).toHaveCount(2);
});

test("embeds load only after an explicit request", async ({ page }) => {
  const embeds = page.locator("[data-embed]");
  const count = await embeds.count();
  test.skip(count === 0, "No embeds on this page");

  await expect(page.locator("main iframe")).toHaveCount(0);

  for (let index = 0; index < count; index++) {
    const embed = embeds.nth(index);
    await embed.locator("[data-embed-load]").click();
    await expect(embed.locator("iframe")).toHaveAttribute("title", /.+/);
  }
});
