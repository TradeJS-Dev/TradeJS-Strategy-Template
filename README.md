# TradeJS Strategy Template

Repository template for one independently versioned TradeJS strategy package.
The package exports `strategyEntries`, which can be registered from
`tradejs.config.ts`.

The checked-in example is intentionally non-publishable. Before the first
release:

1. Replace the package name, description, strategy name, and defaults.
2. Choose the correct license and add its license file.
3. Set `private` to `false`.
4. Keep `strategyEntries` as the stable public plugin export.
5. Define strict config defaults and keep the generated `parseConfig` contract
   test green.
6. Configure the npm trusted publisher for the concrete GitHub repository.

For the standard case, one repository publishes one strategy package. A grouped
repository may export more than one entry only when the architecture catalog
records an explicit exception, as it does for TrendLine and ReverseTrendLine.

## Development

```bash
yarn install --immutable
yarn checks
```

CI and release callers are deliberately thin. The implementation is owned by
`TradeJS-Workflows` and pinned through its stable `v1` ref. Concrete package
repositories publish a verified beta for relevant pushes and promote only the
current verified beta to stable `latest` through the weekly automation.

Keywords: ai, claude, codex.

## Runtime host contract

All `@tradejs/*` runtime packages are peer dependencies. The consuming TradeJS Project owns their exact installed versions and package manifest, so this package never loads a hidden nested engine, types package, indicator package, or Strategy Kit. Repository builds use matching dev dependencies only.
