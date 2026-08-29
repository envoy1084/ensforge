# `@ensforge/core`

Framework-independent, Effect-native ENS actions with Promise facades. The package handles ENSv1,
ENSv2, transition routing, resolver records, CCIP-Read, and typed read composition using viem clients.

## Installation

```sh
pnpm add @ensforge/core effect viem wagmi
```

## Usage

```ts
import { createConfig, getAddress, getOwner, readBatch } from "@ensforge/core";
import { Effect } from "effect";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const config = createConfig({
  network: "mainnet",
  publicClient: createPublicClient({ chain: mainnet, transport: http() }),
});

const owner = await getOwner(config, { name: "ens.eth" });
const address = await Effect.runPromise(getAddress.effect(config, { name: "ens.eth" }));

const profile = await readBatch(config, {
  owner: getOwner.request({ name: "ens.eth" }),
  address: getAddress.request({ name: "ens.eth" }),
});
```

A Wagmi config can provide both clients instead:

```ts
const config = createConfig({
  network: "mainnet",
  wagmiConfig,
});
```

Pure helpers such as `normalizeName`, `namehash`, DNS encoding, and record codecs are also exported
from the package root.

## Development

```sh
pnpm --filter @ensforge/core typecheck
pnpm --filter @ensforge/core test
pnpm --filter @ensforge/core build
```
