import type { Image } from "./image";

export type TestimonialIdentity =
  | {
      type: "photo";
      image: Image;
    }
  | {
      type: "initials";
      value: string;
    }
  | {
      type: "none";
    };

export interface Testimonial {
  name: string;
  quote: string;
  role?: string;
  identity?: TestimonialIdentity;
  rating?: number;
  service?: string;
  date?: string;
  source?: {
    label: string;
    href?: string;
  };
}

export interface TestimonialLabels {
  previous: string;
  next: string;
  rating: string;
}

export interface Testimonials {
  type: "testimonials";
  variant: "cards" | "carousel";
  eyebrow?: string;
  title: string;
  description?: string;
  items: Testimonial[];
}
