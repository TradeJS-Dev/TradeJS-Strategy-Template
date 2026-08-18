# AGENTS.md

## Scope

These rules apply to an independent TradeJS strategy repository.

## Workspace Routing

- Start from `~/dev/tradejs/AGENTS.md`; do not scan sibling repositories.
- Change this repository when the reusable scaffold or package contract for
  future strategies changes. Change an existing strategy in its own
  `tradejs-strategy-*` repository instead.
- Run template tests here. Run generated-project backtests and research from
  `tradejs-project`; do not store research artifacts in the template.

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
