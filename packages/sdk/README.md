# `@ensforge/sdk`

Config-bound ENSv1 and ENSv2 actions with Promise and Effect APIs.

## Installation

```sh
pnpm add @ensforge/sdk effect viem wagmi
```

## Viem

```ts
import { Ensforge } from "@ensforge/sdk";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const sdk = new Ensforge({
  network: "mainnet",
  publicClient: createPublicClient({ chain: mainnet, transport: http() }),
  walletClient,
});
```

## Wagmi

```ts
const sdk = new Ensforge({
  network: "mainnet",
  wagmiConfig,
});
```

The Promise and Effect forms share the same implementation:

```ts
const owner = await sdk.name.getOwner({ name: "ens.eth" });

const ownerEffect = sdk.name.getOwner.effect({ name: "ens.eth" });
```

Read requests and write intents remain composable:

```ts
const profile = await sdk.batch.readBatch({
  owner: sdk.name.getOwner.request({ name: "ens.eth" }),
  resolver: sdk.resolution.getResolver.request({ name: "ens.eth" }),
});

const text = sdk.records.setText.call({
  name: "ens.eth",
  key: "url",
  value: "https://ens.domains",
});
```
