import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/config/site.ts";
import { getHeadStyles } from "./src/utils/appearance.ts";
import { videoOrigins } from "./src/utils/video.ts";
import { googleAnalyticsOrigins } from "./src/integrations/analytics/google-analytics.ts";

const hash = (code) =>
  `sha256-${createHash("sha256").update(code).digest("base64")}`;

const inlineScripts = ["theme-init", "theme-color", "motion-init"].map((name) =>
  readFileSync(
    new URL(`./src/scripts/inline/${name}.js`, import.meta.url),
    "utf8",
  ),
);

const headStyles = getHeadStyles(site.appearance);

const analyticsEnabled = site.analytics?.provider === "google-analytics";

const devCatalog = {
  name: "dev-catalog",
  hooks: {
    "astro:config:setup": ({ command, injectRoute }) => {
      if (command === "dev") {
        injectRoute({
          pattern: "/dev/components",
          entrypoint: "./src/dev/Catalog.astro",
        });
      }
    },
  },
};

export default defineConfig({
  site: site.url,
  output: "static",
  integrations: [
    devCatalog,
    sitemap({
      filter: (page) => !page.includes("/thank-you"),
    }),
  ],
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https:",
        `frame-src https://www.openstreetmap.org https://www.google.com ${videoOrigins.join(" ")}`,
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        ...(analyticsEnabled
          ? [`connect-src 'self' ${googleAnalyticsOrigins.connect.join(" ")}`]
          : []),
      ],
      scriptDirective: {
        resources: [
          "'self'",
          ...(analyticsEnabled ? [googleAnalyticsOrigins.script] : []),
        ],
        hashes: inlineScripts.map(hash),
      },
      styleDirective: {
        hashes: [hash(headStyles)],
      },
    },
  },
});
