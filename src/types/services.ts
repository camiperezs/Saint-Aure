import type { IconName } from "@/icons";
import type { Action } from "./action";
import type { Image } from "./image";

export type Price =
  | {
      type: "fixed";
      amount: number;
      currency: string;
    }
  | {
      type: "starting-at";
      amount: number;
      currency: string;
    }
  | {
      type: "range";
      min: number;
      max: number;
      currency: string;
    }
  | {
      type: "quote";
      label?: string;
    }
  | {
      type: "custom";
      label: string;
    };

export type ServiceVisual =
  | {
      type: "image";
      image: Image;
    }
  | {
      type: "icon";
      name: IconName;
    };

export interface Service {
  title: string;
  description: string;
  visual?: ServiceVisual;
  price?: Price;
  featured?: boolean;
  label?: string;
  action?: Action;
}

export interface ServiceLabels {
  featured: string;
  priceFrom: string;
  priceOnRequest: string;
}

export interface Services {
  type: "services";
  variant: "grid" | "list" | "featured";
  title: string;
  eyebrow?: string;
  description?: string;
  services: Service[];
  action?: Action;
}
