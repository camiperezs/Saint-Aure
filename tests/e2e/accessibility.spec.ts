import AxeBuilder from "@axe-core/playwright";
import { expect, setStorage, test } from "./fixtures";

const pages = ["/", "/thank-you/", "/404", "/legal/privacy/"];
const themes = ["light", "dark"] as const;

for (const theme of themes) {
  for (const path of pages) {
    test(`${path} has no WCAG 2.2 AA violations (${theme})`, async ({
      page,
    }) => {
      await setStorage(page, "site-theme", theme);
      await page.goto(path);
      // Axe mide contraste con el color pintado: esperar a que terminen las
      // animaciones de entrada (p. ej. las del hero) para no leer opacidades a medias.
      await page.evaluate(() =>
        Promise.all(
          document
            .getAnimations()
            .filter(
              (a) =>
                a.timeline instanceof DocumentTimeline &&
                a.effect?.getComputedTiming().iterations !== Infinity,
            )
            .map((a) => a.finished),
        ),
      );

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      const violations = results.violations.map(
        (violation) =>
          `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`,
      );

      expect(violations).toEqual([]);
    });
  }

  test(`#about has no WCAG 2.2 AA violations and a named landmark (${theme})`, async ({
    page,
  }) => {
    await setStorage(page, "site-theme", theme);
    await page.goto("/");

    const about = page.locator("#about");
    await about.scrollIntoViewIfNeeded();
    // Las animaciones por scroll (cita y card) no terminan solas: se espera a las de tiempo.
    await page.evaluate(() =>
      Promise.all(
        document
          .getAnimations()
          .filter(
            (a) =>
              a.timeline instanceof DocumentTimeline &&
              a.effect?.getComputedTiming().iterations !== Infinity,
          )
          .map((a) => a.finished),
      ),
    );

    const heading = about.getByRole("heading", { level: 2 });
    await expect(heading).toHaveCount(1);
    const headingId = await heading.getAttribute("id");
    await expect(about).toHaveAttribute("aria-labelledby", headingId ?? "");
    await expect(about.locator("figure blockquote")).toHaveCount(1);

    const results = await new AxeBuilder({ page })
      .include("#about")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(
      results.violations.map(
        (violation) =>
          `${violation.id}: ${violation.nodes.map((node) => node.target.join(" ")).join(", ")}`,
      ),
    ).toEqual([]);
  });
}
