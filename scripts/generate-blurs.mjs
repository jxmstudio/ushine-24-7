/**
 * Regenerates data/blur-placeholders.ts.
 *
 * Scans data/images.ts for Unsplash photo IDs, fetches each at 16px wide, and
 * writes the base64 JPEG map used for next/image blur-up placeholders. Run it
 * after adding or changing any image ID:
 *
 *   node scripts/generate-blurs.mjs
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = await readFile(path.join(root, "data", "images.ts"), "utf8");

const ids = [...new Set(source.match(/photo-\d+-[0-9a-f]+/g) ?? [])];
if (ids.length === 0) throw new Error("No Unsplash photo IDs found in data/images.ts");

console.log(`Fetching ${ids.length} blur placeholders…`);

const entries = [];
for (const id of ids) {
  // cs=tinysrgb strips the embedded colour profile, which is most of the
  // payload at this size — the placeholder drops from ~3.4KB to a few hundred
  // bytes and nobody can tell on a 16px preview.
  const url = `https://images.unsplash.com/${id}?fit=crop&fm=jpg&cs=tinysrgb&w=16&q=20&sat=-12&bri=4&con=-3`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} for ${id}`);
  const b64 = Buffer.from(await res.arrayBuffer()).toString("base64");
  entries.push(`  "${id}":\n    "data:image/jpeg;base64,${b64}",`);
  console.log(`  ${id} (${b64.length} chars)`);
}

const out = `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Tiny 16px JPEG previews for next/image blur-up placeholders, keyed by
 * Unsplash photo ID. Regenerate with \`node scripts/generate-blurs.mjs\`
 * after changing any image in data/images.ts.
 */
export const blurs: Record<string, string> = {
${entries.join("\n")}
};
`;

await writeFile(path.join(root, "data", "blur-placeholders.ts"), out);
console.log(`Wrote data/blur-placeholders.ts (${ids.length} entries)`);
