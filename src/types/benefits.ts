import type { IconName } from "@/icons";
import type { Action } from "./action";
import type { Image } from "./image";

export type BenefitVisual =
  | {
      type: "icon";
      name: IconName;
    }
  | {
      type: "image";
      image: Image;
    };

export interface Benefit {
  title: string;
  description: string;
  visual?: BenefitVisual;
}

export interface Benefits {
  type: "benefits";
  variant: "grid" | "horizontal";
  eyebrow?: string;
  title: string;
  description?: string;
  items: Benefit[];
  action?: Action;
}
