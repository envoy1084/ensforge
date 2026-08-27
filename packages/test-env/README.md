# `@ensforge/test-env`

Private integration-test infrastructure for Ensforge.

The package will manage a pinned combined ENS v1 and ENS v2 Anvil deployment, discover its contract
addresses, seed deterministic names, and isolate tests with EVM snapshots. It is a workspace-only
package and is never published.

The package currently provides:

- verification of the exact contracts-v2 repository, commit, and recursive submodule state;
- cached Docker image builds from the ignored `.repos/ens-contracts-v2` checkout;
- unique containers with Docker-assigned RPC and metadata ports;
- bounded health polling and schema-validated deployment discovery;
- diagnostic log capture; and
- scoped, idempotent container cleanup.

```ts
import { DockerEngine, startDevnet } from "@ensforge/test-env";
import { Effect } from "effect";

const program = Effect.gen(function* () {
  const devnet = yield* startDevnet();
  return {
    rpcUrl: devnet.rpcUrl,
    deployments: devnet.deployments,
  };
});

const result = await Effect.runPromise(
  Effect.scoped(program).pipe(Effect.provide(DockerEngine.layer)),
);
```

The default build policy is `if-missing`. Use `always` when deliberately rebuilding a changed pinned
source, or `never` when CI has already loaded the image through Docker Buildx.

Fixture seeding, viem clients, and EVM snapshot isolation are implemented in later phases.

## Publishing the CI image

The manual `Publish devnet image` GitHub Actions workflow builds the pinned contracts-v2 Dockerfile
and publishes an amd64 image to `ghcr.io/<repository-owner>/ensforge-devnet`. It pushes full-commit
and readable short tags, then prints the immutable image digest in the workflow summary.

After the first publication, make the GHCR package public so forked pull requests can download it
without credentials. Normal integration CI will consume the image by digest with the `never` build
policy; it will not compile contracts or checkout `.repos`.
