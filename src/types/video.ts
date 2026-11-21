import type { Action } from "./action";
import type { Image } from "./image";

export interface VideoSource {
  provider: "youtube" | "vimeo";
  id: string;
  title: string;
  poster?: Image;
}

export interface VideoLabels {
  play: string;
}

export interface Video {
  type: "video";
  eyebrow?: string;
  title: string;
  description?: string;
  video: VideoSource;
  action?: Action;
}
