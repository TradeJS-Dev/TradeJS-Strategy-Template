# AGENTS.md

## Scope

These rules apply to an independent TradeJS strategy repository.

## Package contract

- Export `strategyEntries` from the package root.
- Keep detector state replayable and bounded.
- Keep StrategyAPI side effects in strategy core code, outside pure engines.
- Import TradeJS APIs only through public package exports.
- Put strategy tests in this repository.
- Do not add Redis, exchange clients, deployment logic, production containers,
  credentials, or user configuration.
- Add `@tradejs/strategy-kit` only when the strategy consumes one of its public
  subpaths.
- A repository exports one strategy unless the central architecture catalog
  records a grouped exception.

## Verification

Run `yarn checks` before every commit.
