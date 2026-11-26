// The Internet in One Word — make.fun entry.
// One word for the whole internet, written to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt), where the gate scorer reads it.
// The gate wants UTF-8 text of 1 to 30 characters, not only white space.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const word = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), "entry.txt"),
  "utf8",
).trim();

// A phrase, a sentence or a list loses to any single word, so refuse
// anything that is not exactly one word of 1-30 characters, loudly,
// instead of shipping an entry the judge never sees.
if (word.length < 1 || word.length > 30 || /\s/.test(word)) {
  throw new Error(
    `entry must be a single word of 1-30 characters, got ${JSON.stringify(word)}`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), word, "utf8");
console.log(word);
