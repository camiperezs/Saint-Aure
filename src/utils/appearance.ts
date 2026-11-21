import type { SiteAppearance } from "@/types/site";
import type {
  FontFace,
  ColorScale,
  EyebrowStyle,
  HeadingTracking,
  CardSurface,
  IconStroke,
} from "@/types/appearance";

const headingTracking: Record<HeadingTracking, string> = {
  normal: "normal",
  tight: "-0.02em",
  tighter: "-0.035em",
};

const eyebrowStyles: Record<EyebrowStyle, Record<string, string>> = {
  uppercase: {
    "--eyebrow-transform": "uppercase",
    "--eyebrow-tracking": "0.08em",
  },
  sentence: { "--eyebrow-transform": "none", "--eyebrow-tracking": "normal" },
};

const cardSurfaces: Record<CardSurface, Record<string, string>> = {
  border: {
    "--preset-card-background": "var(--color-surface)",
    "--preset-card-border-width": "var(--border-width-default)",
    "--preset-card-shadow": "var(--shadow-none)",
  },
  shadow: {
    "--preset-card-background": "var(--color-surface-raised)",
    "--preset-card-border-width": "0",
    "--preset-card-shadow": "var(--shadow-default)",
  },
  flat: {
    "--preset-card-background": "var(--color-surface-sunken)",
    "--preset-card-border-width": "0",
    "--preset-card-shadow": "var(--shadow-none)",
  },
};

const iconStrokes: Record<IconStroke, string> = {
  thin: "1.5",
  regular: "2",
};

export function getAppearanceStyles(appearance: SiteAppearance): string {
  const { colors, typography, shape, surfaces, icons, density } = appearance;

  const variables: Record<string, string> = {};

  const addScale = (prefix: string, scale: ColorScale) => {
    for (const [key, value] of Object.entries(scale)) {
      variables[`--color-${prefix}-${key}`] = value;
    }
  };

  // Brand colors
  addScale("brand", colors.primary);
  addScale("secondary", colors.secondary);
  addScale("neutral", colors.neutral);

  // Typography: only what the client set, so the preset keeps the rest
  variables["--font-body"] = typography.body;

  const { heading, eyebrow } = typography;

  if (heading?.family) {
    variables["--font-heading"] = heading.family;
  }

  if (heading?.weight) {
    variables["--text-heading-weight"] = String(heading.weight);
    variables["--text-display-weight"] = String(heading.weight);
  }

  if (heading?.tracking) {
    variables["--text-heading-tracking"] = headingTracking[heading.tracking];
  }

  if (eyebrow) {
    Object.assign(variables, eyebrowStyles[eyebrow]);
  }

  const radii = {
    "--preset-card-radius": shape?.cards,
    "--preset-media-radius": shape?.media,
    "--preset-button-radius": shape?.buttons,
    "--preset-badge-radius": shape?.badges,
  };

  for (const [property, radius] of Object.entries(radii)) {
    if (radius) {
      variables[property] = `var(--radius-${radius})`;
    }
  }

  if (surfaces?.cards) {
    Object.assign(variables, cardSurfaces[surfaces.cards]);
  }

  if (icons?.stroke) {
    variables["--preset-icon-stroke"] = iconStrokes[icons.stroke];
  }

  if (density) {
    variables["--preset-section-spacing"] = `var(--section-spacing-${density})`;
    variables["--preset-grid-gap"] = `var(--grid-gap-${density})`;
  }

  return Object.entries(variables)
    .map(([property, value]) => `${property}: ${value};`)
    .join(" ");
}

export function getFontFaceStyles(fonts: FontFace[]): string {
  return fonts
    .map((font) => {
      const family = font.family.replace(/["\\]/g, "");
      const src = font.src.replace(/["\\]/g, "");

      return `
        @font-face {
          font-family: "${family}";
          src: url("${src}") format("woff2");
          font-weight: ${font.weight};
          font-style: ${font.style ?? "normal"};
          font-display: swap;
        }
      `;
    })
    .join("\n");
}

export function getHeadStyles(appearance: SiteAppearance): string {
  const variables = `:root { ${getAppearanceStyles(appearance)} }`;
  const fontFaces = getFontFaceStyles(appearance.typography.fonts);

  return fontFaces
    ? `${variables}
${fontFaces}`
    : variables;
}
