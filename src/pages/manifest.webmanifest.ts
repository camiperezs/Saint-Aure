import type { APIRoute } from "astro";
import { site } from "@/config/site";
import { iconSizes } from "@/utils/site-icons";

export const GET: APIRoute = () => {
  const { colors } = site.appearance;

  const manifest = {
    name: site.name,
    short_name: site.name,
    description: site.seo.description,
    lang: site.locale,
    start_url: "/",
    display: "browser",
    background_color: colors.neutral[0],
    theme_color: colors.primary[700],
    icons: iconSizes.map((size) => ({
      src: `/icon-${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/manifest+json" },
  });
};
