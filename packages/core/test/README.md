# Core test suites

- `unit/` covers isolated domain logic, configuration, codecs, and internal execution behavior.
- `integration/` starts one shared ENS devnet and verifies public actions against seeded v1, v2,
  and migration state. Integration effects use `@effect/vitest` and `it.effect`.
- `e2e/` is reserved for future consumer-level package and React workflows. It should not duplicate
  contract-backed action coverage from `integration/`.

Run unit tests with `pnpm --filter @ensforge/core test`. Run the devnet suite from the repository
root with `pnpm test:integration`.
