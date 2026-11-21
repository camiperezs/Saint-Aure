export type Theme = "light" | "dark";

export type Preset = "editorial" | "modern" | "elegant";

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface NeutralScale extends ColorScale {
  0: string;
}

export interface BrandPalette {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: NeutralScale;
}

export type FontWeight = 400 | 500 | 600 | 700;

export interface FontFace {
  family: string;
  src: string;
  weight: FontWeight;
  style?: "normal" | "italic";
}

export type HeadingTracking = "normal" | "tight" | "tighter";

export type EyebrowStyle = "uppercase" | "sentence";

export interface HeadingTypography {
  family?: string;
  weight?: FontWeight;
  tracking?: HeadingTracking;
}

export interface TypographyConfig {
  body: string;
  heading?: HeadingTypography;
  eyebrow?: EyebrowStyle;
  fonts: FontFace[];
}

export type SurfaceRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ButtonRadius = "none" | "sm" | "md" | "lg" | "pill";

export type BadgeRadius = "none" | "sm" | "md" | "pill";

export interface ShapeConfig {
  cards?: SurfaceRadius;
  media?: SurfaceRadius;
  buttons?: ButtonRadius;
  badges?: BadgeRadius;
}

export type CardSurface = "border" | "shadow" | "flat";

export interface SurfaceConfig {
  cards?: CardSurface;
}

export type IconStroke = "thin" | "regular";

export interface IconConfig {
  stroke?: IconStroke;
}

export type Density = "compact" | "normal" | "airy";
