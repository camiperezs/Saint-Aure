import type { APIRoute, GetStaticPaths } from "astro";
import { iconSizes, renderIcon } from "@/utils/site-icons";

export const getStaticPaths: GetStaticPaths = () =>
  iconSizes.map((size) => ({ params: { size: String(size) } }));

export const GET: APIRoute = async ({ params }) =>
  new Response(await renderIcon(Number(params.size)), {
    headers: { "Content-Type": "image/png" },
  });
