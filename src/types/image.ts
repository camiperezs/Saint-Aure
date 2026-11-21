import type { ImageMetadata } from "astro";

export type Image =
  | {
      src: ImageMetadata;
      alt: string;
    }
  | {
      src: string;
      alt: string;
      width: number;
      height: number;
    };

export type OverlayLevel = "none" | "subtle" | "medium" | "strong";

export type FocalPoint = "center" | "top" | "bottom" | "left" | "right";
