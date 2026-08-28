# `@ensforge/test-env`

Private integration-test infrastructure for Ensforge.

The package will manage a pinned combined ENS v1 and ENS v2 Anvil deployment, discover its contract
addresses, seed deterministic names, and isolate tests with EVM snapshots. It is a workspace-only
package and is never published.

The package provides one Promise-based entry point that starts the pinned devnet, validates its
deployments, seeds deterministic fixtures, and captures the reset baseline before resolving.

- verification of the exact contracts-v2 repository, commit, and recursive submodule state;
- cached Docker image builds from the ignored `.repos/ens-contracts-v2` checkout;
- unique containers with Docker-assigned RPC and metadata ports;
- bounded health polling and schema-validated deployment discovery;
- typed v1/v2 deployment profiles with required-bytecode verification;
- named Anvil accounts plus viem public, wallet, and test clients;
- workspace-only v1 and v2 Ensforge configs over the same node;
- revert-and-renew snapshot isolation plus deterministic time and block controls;
- typed, invariant-checked ENS v1 ownership, wrapping, resolver, expiry, and reverse fixtures;
- native ENS v2 names, nested and inherited resolver states, reserved names, locked and unlocked
  migrations, and a V1-mirrored child;
- diagnostic log capture; and
- scoped, idempotent container cleanup.

```ts
import { startEnsDevnet } from "@ensforge/test-env";

await using devnet = await startEnsDevnet();

const owner = devnet.accounts.owner;
const publicClient = devnet.clients.publicClient;
const v2Config = devnet.configs.v2;
const activeName = devnet.fixtures.v2.active;

await devnet.increaseTime(60);
await devnet.mine();
await devnet.reset();
```

The default local build policy is `if-missing`. Use `always` when deliberately rebuilding a changed
pinned source. CI pulls `ensDevnetPublishedImage` by its immutable digest and starts it with the
`never` build policy, so CI never checks out or compiles the contracts repositories.

Integration suites normally call `devnet.reset()` from `beforeEach`. Reset immediately takes a
replacement baseline because Anvil consumes snapshot identifiers on revert. `devnet.fixtures`
describes every seeded name, owner, protocol, resolver state, lifecycle state, and expiry. The
container is removed by `await using`, or explicitly with the idempotent `devnet.stop()` method.

## Publishing the CI image

The manual `Publish devnet image` GitHub Actions workflow builds the pinned contracts-v2 Dockerfile
and publishes an amd64 image to `ghcr.io/<repository-owner>/ensforge-devnet`. It pushes full-commit
and readable short tags, then prints the immutable image digest in the workflow summary.

The currently pinned digest is
`sha256:5efb35e1f12153c605d37a913a162580749f56fe4a270466f7c62fbf927bcfeb`.
The GHCR package must remain public so forked pull requests can download it without credentials.
Normal integration CI consumes this digest with the `never` build policy; it does not compile
contracts or checkout `.repos`.
