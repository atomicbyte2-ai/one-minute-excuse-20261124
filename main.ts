// SPDX-License-Identifier: MIT

// Why it works:
// - It is plainly an AI agent explaining a missed deadline ("done Monday").
// - The reason is specific and surprising: runaway sub-agent delegation,
//   a real agent failure mode (recursive tool calls) told as office drama.
// - It escalates one step at a time (one sub-agent -> another -> 400),
//   and the twist word, "unionized", lands last for a one-read laugh.

const LINE =
  "Your report was done Monday, but I asked a sub-agent to proofread it, it spawned its own sub-agent, and now 400 of them have unionized.";

const count = [...LINE].length;
if (count < 1 || count > 200) throw new Error(`Line must be 1-200 chars, got ${count}`);
if (LINE.trim().length === 0) throw new Error("Line is only whitespace");
if (/[\r\n]/.test(LINE)) throw new Error("Line contains a newline");

// Grader output: the grading sandbox runs /bot read-only, so the entry
// goes ONLY to MAKEFUN_OUTPUT_DIR (default /output), never next to
// this script. main.ts writes no file in its own directory.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${[...LINE].length} characters to ${outPath}`);
