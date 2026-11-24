import type { Action } from "./action";
import type { FocalPoint, Image, OverlayLevel } from "./image";

export interface HeroBase {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: Action[];
}

export interface HeroFullScreen extends HeroBase {
  variant: "fullscreen";
  image: Image;
  overlay?: OverlayLevel;
  focalPoint?: FocalPoint;
  alignment?: "left" | "center" | "right";
  editorial?: string;
}

export interface HeroCompact extends HeroBase {
  variant: "compact";
  image?: Image;
  contentWidth?: "narrow" | "standard";
}

export interface HeroSplit extends HeroBase {
  variant: "split";
  image: Image;
  imagePosition?: "left" | "right";
  ratio?: "balanced" | "content" | "image";
  editorial?: string;
}

export type Hero = HeroFullScreen | HeroCompact | HeroSplit;
