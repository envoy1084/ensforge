# `@ensforge/sdk`

A high-level ENSv2 client with grouped actions for names, records, registration, migration, wrapping,
and reverse resolution. It supports viem clients or an existing Wagmi config.

## Installation

```sh
pnpm add @ensforge/sdk
```

## Usage

```ts
import { Ensforge } from "@ensforge/sdk";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const sdk = new Ensforge({
  network: "mainnet",
  publicClient: createPublicClient({ chain: mainnet, transport: http() }),
});

const owner = await sdk.name.getOwner({ name: "ens.eth" });
const avatar = await sdk.records.getAvatar({ name: "ens.eth" });
```

Pass `wagmiConfig` instead of `publicClient` to use an existing Wagmi setup. Add a wallet client when
using write actions.
