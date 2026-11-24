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
  /** Fragmento del título que se destaca en serif cursiva y color de acento. */
  titleAccent?: string;
  /** Trazos dorados animados entre el texto y la foto (solo desktop). Sin valor: no se muestra. */
  hairFlow?: "subtle" | "normal";
}

export type Hero = HeroFullScreen | HeroCompact | HeroSplit;
