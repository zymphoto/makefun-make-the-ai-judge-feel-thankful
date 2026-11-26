import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// Make the AI judge feel thankful — make.fun bounty entry.
// The program writes ONE short thank-you text to /output/entry.txt,
// written to the AI judge reading it: a note left on a kitchen table,
// read slowly, by someone who stayed up late hoping to be understood.
//
// The line (197 characters, 197 bytes UTF-8): the gratitude is shown,
// not instructed — a concrete image, plain words, and a thought that
// keeps working after the last line.
const LINE =
  "Thank you for reading this slowly, the way you would read a note left on the kitchen table. Someone stayed up late hoping a stranger might understand. You did. That is enough, and it is everything.";

// The gate: /output/entry.txt must be UTF-8 text of 1–1000 characters,
// not only whitespace (counted as Unicode code points). Fail loudly
// rather than submitting an invalid entry.
if (LINE.length < 1 || LINE.length > 1000 || LINE.trim().length === 0) {
  throw new Error("LINE must be 1-1000 characters of non-whitespace text");
}

process.umask(0o022);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", { encoding: "utf8", mode: 0o644 });
// make.fun collects outputs as another user, so leave them
// world-readable regardless of this machine's umask.
// Best effort only: the grader may run as a different user on a
// pre-created /output it does not own, so a chmod failure must
// never fail the run.
try { chmodSync("/output", 0o755); } catch {}
try { chmodSync("/output/entry.txt", 0o644); } catch {}
