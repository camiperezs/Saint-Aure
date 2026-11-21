import { expect, test } from "./fixtures";

test("theme toggle switches, persists and updates theme-color", async ({
  page,
}) => {
  await page.goto("/");

  const root = page.locator("html");
  const initial = await root.getAttribute("data-theme");
  const toggle = page.locator("[data-theme-toggle]");

  await toggle.click();
  const toggled = initial === "dark" ? "light" : "dark";
  await expect(root).toHaveAttribute("data-theme", toggled);
  await expect(toggle).toHaveAttribute(
    "aria-pressed",
    String(toggled === "dark"),
  );

  await page.reload();
  await expect(root).toHaveAttribute("data-theme", toggled);

  const { themeColor, background } = await page.evaluate(() => ({
    themeColor: document
      .querySelector('meta[name="theme-color"]')
      ?.getAttribute("content"),
    background: getComputedStyle(document.documentElement)
      .getPropertyValue("--color-background")
      .trim(),
  }));

  expect(themeColor).toBe(background);
});
