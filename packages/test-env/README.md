# `@ensforge/test-env`

Private integration-test infrastructure for Ensforge.

The package manages a pinned combined ENS v1 and ENS v2 Anvil deployment, discovers its contract
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
- v1 and v2 available, active, expiring, grace, expired, no-resolver, different-owner, subname, and
  write-ready names;
- native v2 names, own and inherited resolvers, reserved migration states, controller approvals,
  locked and unlocked migrations, and a V1-mirrored child;
- complete resolver-profile records for v1 and migrated-v2 names: ETH and coin-type addresses,
  text/avatar, contenthash, ABI, pubkey, interface, name, data, DNS TXT, and zonehash;
- registry, wrapper, token, resolver-delegate, and scoped-role permission cases;
- verified v1/v2, unverified, missing, and contract reverse-resolution cases;
- real v1/v2 commitments plus funded and approved mock USDC/DAI payment tokens;
- DNS routing contract addresses, local DNS record data, and bounded event scan ranges;
- one final invariant pass before the reset baseline is captured;
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

The Promise API defaults to the published immutable image and the `never` build policy, so normal
local and CI runs never compile contracts. Pass `build: "if-missing"` or `build: "always"` with a
local image when deliberately developing the pinned contracts checkout.

Integration suites normally call `devnet.reset()` from `beforeEach`. Reset immediately takes a
replacement baseline because Anvil consumes snapshot identifiers on revert. `devnet.fixtures`
describes every seeded name, owner, protocol, resolver state, lifecycle state, and expiry. The
container is removed by `await using`, or explicitly with the idempotent `devnet.stop()` method.

The local image deploys DNSSEC and CCIP routing contracts, but its proof gateways intentionally use
external DNS state. `fixtures.dns.externalProofs` marks those cases as non-deterministic; the local
fixture matrix does not fake DNSSEC proofs or run a bespoke gateway.

## Publishing the CI image

The manual `Publish devnet image` GitHub Actions workflow builds the pinned contracts-v2 Dockerfile
and publishes an amd64 image to `ghcr.io/<repository-owner>/ensforge-devnet`. It pushes full-commit
and readable short tags, then prints the immutable image digest in the workflow summary.

The currently pinned digest is
`sha256:5efb35e1f12153c605d37a913a162580749f56fe4a270466f7c62fbf927bcfeb`.
The GHCR package must remain public so forked pull requests can download it without credentials.
Normal integration CI consumes this digest with the `never` build policy; it does not compile
contracts or checkout `.repos`.
