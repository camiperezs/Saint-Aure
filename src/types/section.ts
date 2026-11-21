import type { About } from "./about";
import type { Services } from "./services";
import type { Benefits } from "./benefits";
import type { Gallery } from "./gallery";
import type { Testimonials } from "./testimonials";
import type { Process } from "./process";
import type { FAQ } from "./faq";
import type { Location } from "./location";
import type { Contact } from "./contact";
import type { CTA } from "./cta";
import type { Logos } from "./logos";
import type { Pricing } from "./pricing";
import type { Stats } from "./stats";
import type { Video } from "./video";

export type Section =
  | About
  | Services
  | Benefits
  | Gallery
  | Testimonials
  | Process
  | FAQ
  | Location
  | Contact
  | CTA
  | Logos
  | Stats
  | Pricing
  | Video;
