import { defineStrategyPlugin } from "@tradejs/core/config";
import type {
  CreateStrategyCore,
  Signal,
  StrategyConfig,
  StrategyManifest,
  StrategyRegistryEntry,
} from "@tradejs/types";

export const STRATEGY_NAME = "TemplateStrategy";

export interface TemplateStrategyConfig extends StrategyConfig {
  INTERVAL?: Signal["interval"];
  TEMPLATE_ENTRY_EVERY_BARS?: number;
  TEMPLATE_QTY?: number;
  TEMPLATE_TP_PCT?: number;
  TEMPLATE_SL_PCT?: number;
}

export const defaultConfig: TemplateStrategyConfig = {
  INTERVAL: "15",
  TEMPLATE_ENTRY_EVERY_BARS: 96,
  TEMPLATE_QTY: 1,
  TEMPLATE_TP_PCT: 0.4,
  TEMPLATE_SL_PCT: 1,
};

export const createTemplateStrategyCore: CreateStrategyCore<
  TemplateStrategyConfig
> = async ({ data, config, strategyApi }) => {
  const entryEveryBars = Math.max(
    1,
    Math.floor(Number(config.TEMPLATE_ENTRY_EVERY_BARS ?? 96)),
  );

  return async (candle) => {
    const previousCandle = data[data.length - 2];
    if (!previousCandle || previousCandle.close <= 0) {
      return strategyApi.skip("TEMPLATE_WAIT_PREVIOUS_CANDLE");
    }
    if (await strategyApi.getCurrentPosition()) {
      return strategyApi.skip("TEMPLATE_POSITION_EXISTS");
    }
    if (data.length % entryEveryBars !== 0) {
      return strategyApi.skip("TEMPLATE_WAIT_ENTRY_SLOT");
    }

    const qty = Number(config.TEMPLATE_QTY ?? 1);
    if (!Number.isFinite(qty) || qty <= 0) {
      return strategyApi.skip("TEMPLATE_INVALID_QTY");
    }

    const takeProfitPct = Number(config.TEMPLATE_TP_PCT ?? 0.4);
    const stopLossPct = Number(config.TEMPLATE_SL_PCT ?? 1);
    const { currentPrice, timestamp } =
      await strategyApi.getDecisionPriceContext();

    return strategyApi.entry({
      code: "TEMPLATE_ENTRY",
      direction: "LONG",
      signalId: `template-${timestamp}`,
      indicators: {
        previousClose: previousCandle.close,
        currentClose: candle.close,
      },
      orderPlan: {
        qty,
        stopLossPrice: currentPrice * (1 - stopLossPct / 100),
        takeProfits: [
          {
            price: currentPrice * (1 + takeProfitPct / 100),
            rate: 1,
          },
        ],
      },
    });
  };
};

const manifest: StrategyManifest = {
  name: STRATEGY_NAME,
};

const strategyEntry: StrategyRegistryEntry<TemplateStrategyConfig> = {
  defaults: defaultConfig,
  manifest,
  createCore: createTemplateStrategyCore,
};

export const strategyEntries = defineStrategyPlugin({
  strategyEntries: [strategyEntry],
}).strategyEntries;

export default defineStrategyPlugin({ strategyEntries });
