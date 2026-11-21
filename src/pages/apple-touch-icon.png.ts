import type { APIRoute } from "astro";
import { renderIcon } from "@/utils/site-icons";

export const GET: APIRoute = async () =>
  new Response(await renderIcon(180), {
    headers: { "Content-Type": "image/png" },
  });
