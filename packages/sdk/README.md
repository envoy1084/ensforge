# `@ensforge/sdk`

A type-safe client for building ENS applications.

## Features

- Config-bound actions with no repeated client arguments
- Unified behavior across supported ENS deployments
- Grouped APIs for names, records, registration, migration, wrapping, DNS, and reverse records
- Batched reads and wallet-aware write workflows
- Compatible with viem clients and Wagmi configs

## Installation

```sh
pnpm add @ensforge/sdk
```

## Overview

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

Actions are grouped by ENS capability:

```ts
const duration = 365n * 24n * 60n * 60n;

const state = await sdk.name.getNameState({ name: "ens.eth" });
const resolver = await sdk.resolution.getResolver({ name: "ens.eth" });
const text = await sdk.records.getText({ name: "ens.eth", key: "url" });
const price = await sdk.registration.getRegistrationPrice({ name: "example.eth", duration });
```

Compatible reads can be executed together:

```ts
const profile = await sdk.batch.readBatch({
  owner: sdk.name.getOwner.request({ name: "ens.eth" }),
  avatar: sdk.records.getAvatar.request({ name: "ens.eth" }),
  url: sdk.records.getText.request({ name: "ens.eth", key: "url" }),
});
```

Use an existing Wagmi config instead of supplying viem clients:

```ts
const sdk = new Ensforge({
  network: "mainnet",
  wagmiConfig,
});
```

Add a wallet client—or use a Wagmi config with an active connection—to execute write actions.

## License

Apache-2.0
