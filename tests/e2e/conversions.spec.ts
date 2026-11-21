import type { Page } from "@playwright/test";
import { site } from "../../src/config/site";
import { expect, setStorage, test } from "./fixtures";

async function trackedEvents(page: Page) {
  return page.evaluate(() =>
    (window.dataLayer ?? [])
      .map((entry) => Array.from(entry as ArrayLike<unknown>))
      .filter((entry) => entry[0] === "event")
      .map((entry) => ({ name: entry[1], params: entry[2] })),
  );
}

async function preventNavigation(page: Page) {
  await page.evaluate(() => {
    document.addEventListener("click", (event) => event.preventDefault(), {
      capture: true,
    });
  });
}

test("tracks contact and CTA clicks after consent", async ({ page }) => {
  test.skip(!site.analytics, "Analytics is not configured for this site");

  await setStorage(page, "cookie-consent", "granted");
  await page.goto("/");
  await preventNavigation(page);

  const phone = page.locator('a[href^="tel:"]').first();
  test.skip((await phone.count()) === 0, "No phone link on this page");
  await phone.click();

  const cta = page.locator("main a.button").first();
  const ctaText = (await cta.textContent())?.trim();
  await cta.click();

  const events = await trackedEvents(page);

  expect(events).toContainEqual({
    name: "contact_click",
    params: { method: "phone" },
  });
  expect(events).toContainEqual(
    expect.objectContaining({
      name: "cta_click",
      params: expect.objectContaining({ link_text: ctaText }),
    }),
  );
});

test("does not track anything without consent", async ({ page }) => {
  await setStorage(page, "cookie-consent", "denied");
  await page.goto("/");
  await preventNavigation(page);

  await page.locator("main a.button").first().click();

  expect(await trackedEvents(page)).toEqual([]);
});
