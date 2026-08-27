# `@ensforge/test-env`

Private integration-test infrastructure for Ensforge.

The package will manage a pinned combined ENS v1 and ENS v2 Anvil deployment, discover its contract
addresses, seed deterministic names, and isolate tests with EVM snapshots. It is a workspace-only
package and is never published.

The initial scaffold contains only stable source metadata, deployment schemas, and typed errors.
Devnet lifecycle and fixture seeding are implemented in later phases.
