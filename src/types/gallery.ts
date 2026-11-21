import type { Action } from "./action";
import type { Image } from "./image";

export interface GalleryItem {
  image: Image;
  title?: string;
  description?: string;
  aspectRatio?: "1/1" | "4/3" | "3/4" | "16/9";
}

export interface GalleryLabels {
  open: string;
  close: string;
  previous: string;
  next: string;
}

export interface Gallery {
  type: "gallery";
  variant: "grid" | "masonry";
  eyebrow?: string;
  title: string;
  description?: string;
  images: GalleryItem[];
  lightbox?: boolean;
  action?: Action;
}
