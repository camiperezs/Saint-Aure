import type { Action } from "./action";
import type { FocalPoint, Image, OverlayLevel } from "./image";

interface AboutBase {
  type: "about";
  eyebrow?: string;
  title: string;
  description: string;
  action?: Action;
}

export interface AboutStandard extends AboutBase {
  variant: "split" | "centered";
  image?: Image;
  quote?: string;
  badge?: { value: string; label?: string };
}

export interface AboutImageBackground extends AboutBase {
  variant: "image-background";
  image: Image;
  overlay?: OverlayLevel;
  focalPoint?: FocalPoint;
  contentPosition?: "start" | "center" | "end";
}

export type About = AboutStandard | AboutImageBackground;
