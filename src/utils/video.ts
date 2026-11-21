import type { VideoSource } from "@/types/video";

export const videoOrigins = [
  "https://www.youtube-nocookie.com",
  "https://player.vimeo.com",
];

export function getVideoEmbed({ provider, id }: VideoSource): {
  src: string;
  href: string;
} {
  if (!/^[\w-]+$/.test(id)) {
    throw new Error(`Invalid ${provider} video ID "${id}".`);
  }

  switch (provider) {
    case "youtube":
      return {
        src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`,
        href: `https://www.youtube.com/watch?v=${id}`,
      };
    case "vimeo":
      return {
        src: `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1`,
        href: `https://vimeo.com/${id}`,
      };
  }
}
