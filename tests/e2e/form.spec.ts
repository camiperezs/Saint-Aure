import type { Locator } from "@playwright/test";
import { site } from "../../src/config/site";
import { expect, setStorage, test } from "./fixtures";

const VALID_VALUES: Record<string, string> = {
  email: "test@example.com",
  tel: "+5491112345678",
};

async function fillRequired(form: Locator) {
  const fields = form.locator("[required]");

  for (let index = 0; index < (await fields.count()); index++) {
    const field = fields.nth(index);
    const tag = await field.evaluate((element) => element.tagName);

    if (tag === "SELECT") {
      await field.selectOption({ index: 1 });
    } else {
      const type = (await field.getAttribute("type")) ?? "text";
      await field.fill(VALID_VALUES[type] ?? "Test");
    }
  }
}

test.beforeEach(async ({ page }) => {
  await setStorage(page, "cookie-consent", "denied");
  await page.goto("/");
});

test("shows accessible errors and focuses the first invalid field", async ({
  page,
}) => {
  const form = page.locator("[data-contact-form]").first();
  test.skip((await form.count()) === 0, "No contact form on this page");

  const required = form.locator("[required]");
  const requiredCount = await required.count();
  test.skip(requiredCount === 0, "The form has no required fields");

  await form.locator('[type="submit"]').click();

  await expect(form.locator('[aria-invalid="true"]')).toHaveCount(
    requiredCount,
  );
  await expect(required.first()).toBeFocused();

  const errorId = await required.first().getAttribute("aria-describedby");
  await expect(page.locator(`#${errorId}`)).toBeVisible();

  await fillRequired(form);
  await expect(form.locator('[aria-invalid="true"]')).toHaveCount(0);
});

test("submits to the provider and redirects to the success page", async ({
  page,
}) => {
  const form = page.locator("[data-contact-form]").first();
  test.skip((await form.count()) === 0, "No contact form on this page");

  const action = (await form.getAttribute("action")) ?? "";
  const formName = await form.getAttribute("name");
  let body = "";

  await page.route(`**${action}`, async (route) => {
    if (route.request().method() === "POST") {
      body = route.request().postData() ?? "";
      await route.fulfill({
        status: 303,
        headers: { location: `${action}/` },
      });
    } else {
      await route.continue();
    }
  });

  await fillRequired(form);
  await form.locator('[type="submit"]').click();

  await expect(page).toHaveURL(new RegExp(`${action}/?$`));
  await expect(page.locator("h1")).toHaveText(site.labels.thankYou.title);

  const data = new URLSearchParams(body);
  expect(data.get("form-name")).toBe(formName);
  expect(data.get("bot-field")).toBe("");
});
