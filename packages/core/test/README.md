# Core test suites

- `unit/` covers isolated domain logic, configuration, codecs, and internal execution behavior.
- `integration/` starts one shared ENS devnet and verifies public actions against seeded v1, v2,
  and migration state. Integration effects use `@effect/vitest` and `it.effect`.
- `live/` contains explicit, read-only release smoke suites against public deployments. Live tests
  are excluded from normal unit and CI runs and require their documented RPC environment variable.
- `e2e/` is reserved for future consumer-level package and React workflows. It should not duplicate
  contract-backed action coverage from `integration/`.

Run unit tests with `pnpm --filter @ensforge/core test`. Run the devnet suite from the repository
root with `pnpm test:integration`.

Run the Mainnet release smoke suite with an explicit Ethereum Mainnet RPC URL:

```sh
ENSFORGE_MAINNET_RPC_URL="https://…" pnpm test:live:mainnet
```

The suite verifies provider freshness, deployed bytecode, ENS resolution canaries, CCIP-Read,
multichain and DNS records, reverse resolution, ENSv1 state, registration quotes, and semantic
batching. It never signs or submits a transaction.
