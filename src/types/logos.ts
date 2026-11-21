import type { Image } from "./image";

export interface LogoItem {
  name: string;
  image: Image;
  href?: string;
}

export interface Logos {
  type: "logos";
  variant: "row" | "grid";
  eyebrow?: string;
  title: string;
  description?: string;
  items: LogoItem[];
}
