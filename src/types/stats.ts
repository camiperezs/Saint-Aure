import type { Action } from "./action";

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

export interface Stats {
  type: "stats";
  variant: "row" | "cards";
  eyebrow?: string;
  title: string;
  description?: string;
  items: StatItem[];
  action?: Action;
}
