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
}
