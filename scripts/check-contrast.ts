import { readFileSync } from "node:fs";
import { site } from "../src/config/site.ts";

type ThemeName = "light" | "dark";
type Variables = Record<string, string>;

interface ContrastRule {
  foreground: string[];
  background: string[];
  minimum: number;
}

const THEME_FILES: Record<ThemeName, string> = {
  light: "src/styles/themes/light.css",
  dark: "src/styles/themes/dark.css",
};

const TOKEN_FILE = "src/styles/tokens/colors.css";

const BACKGROUNDS = [
  "background",
  "background-alt",
  "surface",
  "surface-raised",
  "surface-sunken",
];

const STATUSES = ["success", "warning", "danger", "info"];

const TEXT = 4.5;
const NON_TEXT = 3;

const RULES: ContrastRule[] = [
  {
    foreground: [
      "text-primary",
      "text-secondary",
      "text-muted",
      "link",
      "link-hover",
    ],
    background: BACKGROUNDS,
    minimum: TEXT,
  },
  {
    foreground: STATUSES.map((status) => `status-${status}`),
    background: BACKGROUNDS,
    minimum: TEXT,
  },
  ...STATUSES.map((status) => ({
    foreground: [`status-${status}`, "text-primary"],
    background: [`status-${status}-bg`],
    minimum: TEXT,
  })),
  {
    foreground: ["text-on-primary"],
    background: [
      "action-primary",
      "action-primary-hover",
      "action-primary-active",
    ],
    minimum: TEXT,
  },
  {
    foreground: ["text-on-secondary"],
    background: [
      "action-secondary",
      "action-secondary-hover",
      "action-secondary-active",
    ],
    minimum: TEXT,
  },
  {
    foreground: ["selection-text"],
    background: ["selection-background"],
    minimum: TEXT,
  },
  {
    foreground: [
      "border-strong",
      "focus",
      "action-primary",
      "action-secondary",
    ],
    background: BACKGROUNDS,
    minimum: NON_TEXT,
  },
  {
    foreground: ["focus-on-primary"],
    background: ["action-primary"],
    minimum: NON_TEXT,
  },
];

function readDeclarations(path: string): Variables {
  const css = readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const variables: Variables = {};

  for (const [, name, value] of css.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
    if (name && value) {
      variables[name] = value.trim();
    }
  }

  return variables;
}

function readPalette(): Variables {
  const { primary, secondary, neutral } = site.appearance.colors;
  const variables: Variables = {};

  const scales: [string, Record<string, string>][] = [
    ["brand", { ...primary }],
    ["secondary", { ...secondary }],
    ["neutral", { ...neutral }],
  ];

  for (const [prefix, scale] of scales) {
    for (const [step, value] of Object.entries(scale)) {
      variables[`color-${prefix}-${step}`] = value;
    }
  }

  return variables;
}

function resolve(name: string, variables: Variables, depth = 0): string {
  const value = variables[name];

  if (value === undefined) {
    throw new Error(`--${name} is not defined`);
  }

  const reference = value.match(/^var\(--([\w-]+)\)$/);

  if (reference?.[1] && depth < 10) {
    return resolve(reference[1], variables, depth + 1);
  }

  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
    throw new Error(`--${name} resolves to an unsupported value: ${value}`);
  }

  return value;
}

function luminance(hex: string): number {
  const digits =
    hex.length === 4
      ? [...hex.slice(1)].map((digit) => digit + digit).join("")
      : hex.slice(1);

  const [red = 0, green = 0, blue = 0] = [0, 2, 4]
    .map((index) => parseInt(digits.slice(index, index + 2), 16) / 255)
    .map((channel) =>
      channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrast(foreground: string, background: string): number {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  );

  return ((lighter ?? 0) + 0.05) / ((darker ?? 0) + 0.05);
}

const palette = readPalette();
const tokens = readDeclarations(TOKEN_FILE);
let checks = 0;
const failures: string[] = [];

for (const [theme, file] of Object.entries(THEME_FILES)) {
  const variables = { ...palette, ...tokens, ...readDeclarations(file) };

  for (const rule of RULES) {
    for (const foreground of rule.foreground) {
      for (const background of rule.background) {
        checks++;

        try {
          const fg = resolve(`color-${foreground}`, variables);
          const bg = resolve(`color-${background}`, variables);
          const ratio = contrast(fg, bg);

          if (ratio < rule.minimum) {
            failures.push(
              `${theme.padEnd(5)}  ${foreground} (${fg}) on ${background} (${bg}): ` +
                `${ratio.toFixed(2)} < ${rule.minimum}`,
            );
          }
        } catch (error) {
          failures.push(`${theme.padEnd(5)}  ${(error as Error).message}`);
        }
      }
    }
  }
}

if (failures.length > 0) {
  console.error(
    `Contrast check failed: ${failures.length} of ${checks} combinations.\n`,
  );
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Contrast check passed: ${checks} combinations meet WCAG 2.2 AA.`);
