import { site } from "../../src/config/site";
import { expect, test } from "./fixtures";

const { consent } = site.labels;

test("analytics only loads after consent and can be withdrawn", async ({
  page,
  context,
  baseURL,
}) => {
  test.skip(!site.analytics, "Analytics is not configured for this site");

  const googleRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("google")) {
      googleRequests.push(request.url());
    }
  });

  await page.goto("/");

  const banner = page.locator("[data-cookie-consent]");
  await expect(banner).toBeVisible();
  expect(googleRequests).toEqual([]);

  await banner.getByRole("button", { name: consent.reject }).click();
  await expect(banner).toBeHidden();

  await page.reload();
  await expect(banner).toBeHidden();
  expect(googleRequests).toEqual([]);

  await page.getByRole("button", { name: consent.manage }).click();
  await expect(banner).toBeVisible();
  await banner.getByRole("button", { name: consent.accept }).click();

  await expect
    .poll(() => googleRequests.some((url) => url.includes("googletagmanager")))
    .toBe(true);

  await context.addCookies([
    { name: "_ga", value: "GA1.1.1", url: baseURL ?? "" },
  ]);

  await page.getByRole("button", { name: consent.manage }).click();
  await banner.getByRole("button", { name: consent.reject }).click();
  await page.waitForLoadState("load");

  const cookies = await context.cookies();
  expect(cookies.filter((cookie) => cookie.name.startsWith("_ga"))).toEqual([]);
});
