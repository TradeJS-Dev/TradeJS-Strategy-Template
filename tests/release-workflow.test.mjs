import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workflow = fs.readFileSync(
  path.join(root, ".github/workflows/release.yml"),
  "utf8",
);

test("template callers use the beta-first weekly release train", () => {
  assert.match(workflow, /channel: beta/);
  assert.match(workflow, /channel: stable/);
  assert.match(workflow, /cron: "0 4 \* \* 1"/);
  assert.match(workflow, /confirm-promotion/);
  assert.match(workflow, /strategy-publish\.yml@v1/);
  assert.doesNotMatch(workflow, /types: \[published\]/);
});

test("the non-publishable template repository skips release jobs", () => {
  assert.match(workflow, /TradeJS-Dev\/TradeJS-Strategy-Template/);
});
