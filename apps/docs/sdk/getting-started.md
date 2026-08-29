---
title: Getting Started
description: Create an Ensforge SDK instance and call grouped ENS methods.
---

# Getting Started

Create an `Ensforge` instance with a viem public client.

```ts
import { Ensforge } from "@ensforge/sdk";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export const sdk = new Ensforge({
  network: "mainnet",
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});
```

Call methods through their capability group.

```ts
const state = await sdk.name.getNameState({ name: "ens.eth" });
const resolver = await sdk.resolution.getResolver({ name: "ens.eth" });
const url = await sdk.records.getText({ name: "ens.eth", key: "url" });
```

Use an existing Wagmi config by passing `wagmiConfig` instead of viem clients.

```ts
export const sdk = new Ensforge({
  network: "mainnet",
  wagmiConfig,
});
```

The instance and all action groups are immutable. Create one per network configuration and reuse it.
