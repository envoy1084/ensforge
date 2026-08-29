# `@ensforge/core`

Type-safe ENSv2 actions and utilities for names, records, registration, renewals, migration, wrapping,
and reverse resolution. ENSv1 compatibility and protocol routing are handled automatically.

## Installation

```sh
pnpm add @ensforge/core
```

## Usage

```ts
import { createConfig, getAddress, getOwner } from "@ensforge/core";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const config = createConfig({
  network: "mainnet",
  publicClient: createPublicClient({ chain: mainnet, transport: http() }),
});

const owner = await getOwner(config, { name: "ens.eth" });
const address = await getAddress(config, { name: "ens.eth" });
```

A Wagmi config can be used in place of viem clients:

```ts
const config = createConfig({
  network: "mainnet",
  wagmiConfig,
});
```
