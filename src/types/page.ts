import type { Hero } from "./hero";
import type { Section } from "./section";

export interface Page {
  hero?: Hero;
  sections: Section[];
}
