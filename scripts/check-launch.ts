import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";

interface Marker {
  pattern: RegExp;
  reason: string;
  onlyIn?: RegExp;
}

const LEGAL_DIRECTORY = "src/content/legal";

const CONTENT_FILES = [
  "src/config/site.ts",
  "src/content/page.ts",
  ...readdirSync(LEGAL_DIRECTORY)
    .filter((file) => file.endsWith(".md"))
    .map((file) => `${LEGAL_DIRECTORY}/${file}`),
];

const MARKERS: Marker[] = [
  { pattern: /example\.com/, reason: "example domain or email" },
  { pattern: /\bde ejemplo\b|@ejemplo\./i, reason: "example content" },
  { pattern: /0000-0000/, reason: "placeholder phone number" },
  { pattern: /G-XXXXXXXXXX/, reason: "placeholder Google Analytics ID" },
  {
    pattern: /My Website|Website description/,
    reason: "template site name or description",
  },
  { pattern: /\/placeholders\//, reason: "placeholder image" },
  { pattern: /sample\.(jpg|webp)/, reason: "sample image" },
  { pattern: /aqz-KE-bpKQ/, reason: "sample video" },
  { pattern: /Nombre del cliente/, reason: "placeholder testimonial" },
  {
    pattern: /\[[^\]]+\]/,
    reason: "unfilled legal placeholder",
    onlyIn: /\.md$/,
  },
  {
    pattern: /robots:\s*"noindex/,
    reason: "search engines are blocked (robots noindex)",
  },
];

const TEMPLATE_FAVICON_SHA256 =
  "f00692db82a489294dde1c65e9f1d5c0871c1d59ba6d15c4ab0023cd7aa93a4b";

const problems: string[] = [];

for (const file of CONTENT_FILES) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, index) => {
      for (const marker of MARKERS) {
        if (marker.onlyIn && !marker.onlyIn.test(file)) {
          continue;
        }

        if (marker.pattern.test(line)) {
          problems.push(
            `${file}:${index + 1}  ${marker.reason}\n    ${line.trim()}`,
          );
        }
      }
    });
}

const favicon = readFileSync("public/favicon.svg");
const faviconHash = createHash("sha256").update(favicon).digest("hex");

if (faviconHash === TEMPLATE_FAVICON_SHA256) {
  problems.push("public/favicon.svg  the template favicon is still in use");
}

if (problems.length > 0) {
  console.error(
    `Launch check failed: ${problems.length} items still need client data.\n`,
  );
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log("Launch check passed: no template placeholders found.");
