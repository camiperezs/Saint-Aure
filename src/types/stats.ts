import type { Action } from "./action";

export interface StatItem {
  value: string;
  /** `text` para datos no numéricos (ciudades, nombres): serif itálica y más chica. */
  kind?: "number" | "text";
  label: string;
  description?: string;
}

export interface Stats {
  type: "stats";
  variant: "row" | "cards" | "ruled";
  eyebrow?: string;
  title: string;
  description?: string;
  items: StatItem[];
  action?: Action;
}
