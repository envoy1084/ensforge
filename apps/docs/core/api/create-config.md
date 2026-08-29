---
title: createConfig
description: Create an immutable ensforge Core configuration.
---

# createConfig

Creates an immutable configuration used by every Core action.

## Import

```ts
import { createConfig } from "@ensforge/core";
```

## Usage

### viem

```ts
import { createConfig } from "@ensforge/core";
import { createPublicClient, createWalletClient, http } from "viem";
import { mainnet } from "viem/chains";

const config = createConfig({
  network: "mainnet",
  publicClient: createPublicClient({ chain: mainnet, transport: http() }),
  walletClient: createWalletClient({ chain: mainnet, transport: http() }),
});
```

### Wagmi

```ts
import { createConfig as createEnsforgeConfig } from "@ensforge/core";
import { wagmiConfig } from "./wagmi";

const config = createEnsforgeConfig({
  network: "mainnet",
  wagmiConfig,
});
```

Provide either `wagmiConfig` or viem clients. The two configuration modes cannot be combined.

## Parameters

```ts
import type { CreateConfigParameters } from "@ensforge/core";
```

### network

`"mainnet" | "sepolia"`

Selects the chain and ENS deployment profile. The supplied client must use the same chain.

### publicClient

`PublicClient | undefined`

Viem client used for reads, simulation, receipts, and event queries. Required in viem mode and not
allowed in Wagmi mode.

### walletClient

`WalletClient | undefined`

Default viem wallet client used by writes. It can be omitted for read-only applications or supplied
per action where supported.

### wagmiConfig

`Config | undefined`

Existing Wagmi config. ensforge reads the public client for `network` and resolves the active wallet
client when a write runs.

### reads

`ReadOptions | undefined`

Default concurrency and Multicall sizing. See [`Config`](/core/api/config#reads).

### writes

`WriteOptions | undefined`

Default simulation, confirmation, and status retry policies. See [`Config`](/core/api/config#writes).

### gateways

`GatewayOptions | undefined`

Network policy for HTTP resources reached through avatar, content, metadata, or DNS workflows. See
[`Config`](/core/api/config#gateways).

## Return Type

```ts
import type { EnsforgeConfig } from "@ensforge/core";
```

An immutable `EnsforgeConfig`. It contains the resolved network, clients, policies, deployment
profile, and internal Effect services required by actions.

## Error

Throws `ConfigError` when the network is unsupported, a client uses the wrong chain, both client
modes are supplied, a required client is missing, or an option is invalid.
