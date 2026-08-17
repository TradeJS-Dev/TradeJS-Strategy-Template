import assert from "node:assert/strict";
import test from "node:test";
import plugin, { STRATEGY_NAME, strategyEntries } from "../dist/index.js";

test("exports the TradeJS strategy plugin contract", () => {
  assert.equal(strategyEntries.length, 1);
  assert.equal(strategyEntries[0].manifest.name, STRATEGY_NAME);
  assert.deepEqual(plugin.strategyEntries, strategyEntries);
});
