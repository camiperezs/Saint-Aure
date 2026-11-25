import type { Action } from "./action";
import type { IconName } from "@/icons";
import type { Image } from "./image";

export interface CTADetail {
  icon: IconName;
  title: string;
  description: string;
}

export interface CTA {
  type: "cta";
  variant: "simple" | "split" | "badge";
  eyebrow?: string;
  title: string;
  description?: string;
  image?: Image;
  details?: CTADetail[];
  primaryAction: Action;
  secondaryAction?: Action;
}
