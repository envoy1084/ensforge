# `@ensforge/core`

Effect-native ENS actions and workflows for JavaScript and TypeScript, with Promise APIs for
applications that do not use Effect directly.

The package is framework-independent and works in Node.js and browser bundlers. It owns ENS name
state, V1/V2 routing, typed failures, reads, writes, batching, and workflows while delegating
Ethereum clients, transports, ABI encoding, contract simulation, and wallet actions to viem.

`@ensforge/contracts` provides the versioned ENS ABIs and deployment metadata consumed by this
package. React providers and hooks belong in the future `@ensforge/react` package.

The package is private while its initial configuration and action APIs are being implemented.

## Configuration

One config targets one authoritative ENS network. Mainnet currently selects ENSv1; Sepolia selects
the ENSv2 beta deployment with ENSv1 compatibility for transition-state operations.

```ts
import { createConfig } from "@ensforge/core";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

const config = createConfig({
  network: "sepolia",
  publicClient: createPublicClient({
    chain: sepolia,
    transport: http(),
  }),
});
```

An optional chain-matched wallet client may be supplied for scripts. React integrations pass the
currently connected wallet as a write-action override so changing connections does not rebuild the
core config. `createConfig` performs no RPC requests and preserves the supplied client identities.

## API convention

Finite asynchronous actions expose one Promise-callable symbol with the canonical Effect on a
readonly `.effect` property:

```ts
const owner = await getOwner(config, { name: "example.eth" });
const ownerEffect = yield * getOwner.effect(config, { name: "example.eth" });
```

Batchable reads expose pure `.request(parameters)` descriptors, and explicitly batchable writes
expose pure `.call(parameters)` intents. Constructing either value performs no I/O.

## Commands

```sh
pnpm --filter @ensforge/core lint
pnpm --filter @ensforge/core typecheck
pnpm --filter @ensforge/core test
pnpm --filter @ensforge/core build
pnpm --filter @ensforge/core pack:check
```
