import type { APIRoute } from "astro";
import { site } from "@/config/site";

export const GET: APIRoute = ({ site: origin }) => {
  const indexable = site.seo.robots === "index, follow";
  const lines = indexable
    ? [
        "User-agent: *",
        "Allow: /",
        `Sitemap: ${new URL("sitemap-index.xml", origin).toString()}`,
      ]
    : ["User-agent: *", "Disallow: /"];

  return new Response(`${lines.join("\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
