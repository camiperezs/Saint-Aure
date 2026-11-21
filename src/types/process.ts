import type { IconName } from "@/icons";
import type { Action } from "./action";
import type { Image } from "./image";

export type ProcessVisual =
  | {
      type: "icon";
      name: IconName;
    }
  | {
      type: "image";
      image: Image;
    };

export interface ProcessStep {
  title: string;
  description: string;
  visual?: ProcessVisual;
  label?: string;
}

export interface Process {
  type: "process";
  variant: "steps" | "timeline";
  eyebrow?: string;
  title: string;
  description?: string;
  steps: ProcessStep[];
  action?: Action;
}
