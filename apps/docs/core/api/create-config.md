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

<<< @/snippets/core/config.ts

### Wagmi

::: code-group

```ts [config.ts]
import { createWagmiConfig } from "@ensforge/core/wagmi";
import { wagmiConfig } from "./wagmi";

const config = createWagmiConfig({
  network: "mainnet",
  wagmiConfig,
});
```

<<< @/snippets/wagmi/config.ts

:::

The scoped adapter keeps Wagmi out of viem-only dependency graphs. Install `wagmi` only when using
`@ensforge/core/wagmi`.

## Parameters

```ts
import type { CreateConfigParameters } from "@ensforge/core";
```

### network

`"mainnet" | "sepolia"`

Selects the chain and ENS deployment profile. The supplied client must use the same chain.

### publicClient

`PublicClient | undefined`

Viem client used for reads, simulation, receipts, and event queries.

### walletClient

`WalletClient | undefined`

Default viem wallet client used by writes. It can be omitted for read-only applications or supplied
per action where supported.

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

Throws `ConfigError` when the network is unsupported, a client uses the wrong chain, a required
client is missing, or an option is invalid.
