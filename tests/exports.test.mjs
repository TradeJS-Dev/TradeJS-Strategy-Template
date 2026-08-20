import assert from "node:assert/strict";
import test from "node:test";
import plugin, { STRATEGY_NAME, strategyEntries } from "../dist/index.js";

test("exports the TradeJS strategy plugin contract", () => {
  assert.equal(strategyEntries.length, 1);
  assert.equal(strategyEntries[0].manifest.name, STRATEGY_NAME);
  assert.deepEqual(
    strategyEntries[0].parseConfig({}),
    strategyEntries[0].defaults,
  );
  assert.throws(
    () => strategyEntries[0].parseConfig({ TEMPLATE_QYT: 1 }),
    /TemplateStrategy\.TEMPLATE_QYT is not allowed/,
  );
  assert.deepEqual(plugin.strategyEntries, strategyEntries);
});
