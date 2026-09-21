/**
 * Regenerates app/favicon.ico from the live mark in lib/brand-mark.ts.
 *
 * app/icon.tsx covers modern browsers, but plenty of things still ask for
 * /favicon.ico by name — crawlers, RSS readers, link unfurlers, old browsers —
 * so it has to be the real mark rather than the create-next-app placeholder.
 * Run after changing the mark or its colours:
 *
 *   npm run favicon
 *
 * (The script imports a .ts file, so it needs node's --experimental-strip-types
 * flag; the npm script passes it.)
 */
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

import { gleamMark } from "../lib/brand-mark.ts";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Keep in step with app/icon.tsx.
const TILE = "#06373C";
const PRIMARY = "#17C3B2";
const SIZES = [16, 32, 48];

const pngs = await Promise.all(
  SIZES.map(async (size) => {
    const uri = gleamMark({ size, tile: TILE, primary: PRIMARY });
    const svg = Buffer.from(uri.split(",")[1], "base64");
    // Rasterise the vector at the target size rather than downscaling one big
    // render — the sparkle's points stay sharper at 16px.
    return sharp(svg, { density: 72 * (size / 48) * 4 })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer();
  }),
);

// ICO container: 6-byte header, one 16-byte directory entry per image, then the
// PNG payloads back to back. PNG-in-ICO is supported everywhere that matters.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4);

let offset = header.length + 16 * pngs.length;
const entries = pngs.map((png, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(SIZES[i], 0); // width
  entry.writeUInt8(SIZES[i], 1); // height
  entry.writeUInt8(0, 2); // palette size
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += png.length;
  return entry;
});

const ico = Buffer.concat([header, ...entries, ...pngs]);
await writeFile(path.join(root, "app", "favicon.ico"), ico);
console.log(`Wrote app/favicon.ico (${SIZES.join(", ")}px — ${ico.length} bytes)`);
