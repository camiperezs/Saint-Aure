import { test as base, expect, type Page } from "@playwright/test";

declare global {
  interface Window {
    __cspViolations?: string[];
  }
}

const IGNORED_CONSOLE_ERRORS = /Failed to load resource|net::ERR_/;

export const test = base.extend({
  page: async ({ page }, use) => {
    const errors: string[] = [];

    await page.route(
      (url) => url.hostname !== "localhost",
      (route) => route.abort(),
    );

    await page.addInitScript(() => {
      window.__cspViolations = [];
      document.addEventListener("securitypolicyviolation", (event) => {
        window.__cspViolations?.push(
          `${event.violatedDirective} ${event.blockedURI}`,
        );
      });
    });

    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        !IGNORED_CONSOLE_ERRORS.test(message.text())
      ) {
        errors.push(message.text());
      }
    });

    await use(page);

    const violations = await page
      .evaluate(() => window.__cspViolations ?? [])
      .catch(() => []);

    expect(errors, "console errors").toEqual([]);
    expect(violations, "CSP violations").toEqual([]);
  },
});

export async function setStorage(page: Page, key: string, value: string) {
  await page.addInitScript(
    ([storageKey, storageValue]) => {
      if (window === window.top) {
        localStorage.setItem(storageKey, storageValue);
      }
    },
    [key, value] as const,
  );
}

export { expect };
