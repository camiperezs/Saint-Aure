import type { Action } from "./action";
import type { Price } from "./services";

export interface PricingPlan {
  name: string;
  description?: string;
  price: Price;
  period?: string;
  features: string[];
  featured?: boolean;
  action: Action;
}

export interface PricingLabels {
  featured: string;
  features: string;
}

export interface Pricing {
  type: "pricing";
  eyebrow?: string;
  title: string;
  description?: string;
  plans: PricingPlan[];
  note?: string;
}
