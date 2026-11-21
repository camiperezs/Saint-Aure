import { readFileSync } from "node:fs";
import sharp from "sharp";

export const iconSizes = [192, 512] as const;

const source = () => readFileSync("public/favicon.svg");

export async function renderIcon(
  size: number,
): Promise<Uint8Array<ArrayBuffer>> {
  const png = await sharp(source(), { density: 384 })
    .resize(size, size)
    .png()
    .toBuffer();

  return new Uint8Array(png);
}
