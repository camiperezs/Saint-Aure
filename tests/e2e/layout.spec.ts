import { expect, test } from "./fixtures";

for (const width of [320, 360, 412, 768, 1024, 1440]) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );

    expect(overflow).toBe(0);
  });
}

for (const width of [320, 360, 768, 1024, 1440]) {
  test(`About does not overflow its section at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const overflow = await page.locator("#about").evaluate((section) => {
      const limit = section.getBoundingClientRect().right;
      return [...section.querySelectorAll("*")]
        .filter((element) => element.getBoundingClientRect().right > limit + 1)
        .map((element) => element.className || element.tagName);
    });

    expect(overflow).toEqual([]);
  });
}

test("skip link moves focus to the main content", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Keyboard navigation is tested on desktop");
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.locator(".skip-link");
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeInViewport();

  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("mobile menu opens, closes with Escape and on navigation", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "The collapsible menu only exists on small screens");
  await page.goto("/");

  const button = page.locator("[data-menu-button]");
  const navigation = page.locator(".header__nav");

  await expect(navigation).toBeHidden();
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(navigation).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toBeFocused();

  await button.click();
  await navigation.getByRole("link").first().click();
  await expect(button).toHaveAttribute("aria-expanded", "false");
});

test("desktop navigation is visible without a menu button", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Desktop layout only");
  await page.goto("/");

  await expect(page.locator(".header__nav")).toBeVisible();
  await expect(page.locator("[data-menu-button]")).toBeHidden();
});
