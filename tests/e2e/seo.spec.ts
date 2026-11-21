import { site } from "../../src/config/site";
import { expect, test } from "./fixtures";

test("home page exposes SEO metadata and structured data", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /.+/,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\//,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
  await expect(page.locator('link[rel="manifest"]')).toHaveCount(1);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  const data = JSON.parse(jsonLd ?? "{}") as Record<string, unknown>;

  expect(data["@context"]).toBe("https://schema.org");
  expect(data.name).toBeTruthy();
});

test("robots.txt and sitemap are consistent", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("User-agent: *");

  const sitemap = await (await request.get("/sitemap-0.xml")).text();
  expect(sitemap).toContain("<loc>");
  expect(sitemap).not.toContain("thank-you");
  expect(sitemap).not.toContain("404");
});

test("unknown routes return a 404 page", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText(site.labels.notFound.title);
});

test("site icons and manifest are generated", async ({ request }) => {
  for (const path of [
    "/apple-touch-icon.png",
    "/icon-192.png",
    "/icon-512.png",
  ]) {
    const response = await request.get(path);
    expect(response.headers()["content-type"]).toContain("image/png");
  }

  const manifest = (await (
    await request.get("/manifest.webmanifest")
  ).json()) as { name: string; icons: unknown[] };

  expect(manifest.name).toBeTruthy();
  expect(manifest.icons).toHaveLength(2);
});
