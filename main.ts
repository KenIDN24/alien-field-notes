// Alien Field Notes: The Two Day Earth Review — one-line entry.
// Writes the alien tourist's review of Earth to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace, one line.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "★★★★☆ Lovely oceans, but the locals carry their dogs' droppings home in little bags, like souvenirs. Would visit again.";

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Round-trip check: what was written must be byte-for-byte the entry.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("round-trip check failed: entry.txt does not match ENTRY");
}
console.log(`wrote ${outPath} (${chars.length} chars)`);
