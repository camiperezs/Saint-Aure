import type { Action } from "./action";
import type { Image } from "./image";

export interface CTA {
  type: "cta";
  variant: "simple" | "split" | "badge";
  eyebrow?: string;
  title: string;
  description?: string;
  image?: Image;
  primaryAction: Action;
  secondaryAction?: Action;
}
