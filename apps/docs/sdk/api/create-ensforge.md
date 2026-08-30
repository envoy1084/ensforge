---
title: createEnsforge
description: Create an ensforge SDK client from an existing Wagmi config.
---

# createEnsforge

Creates an `Ensforge` client from a Wagmi config. Wagmi support is isolated in an optional SDK
entrypoint so viem-only consumers do not need the Wagmi package.

## Import

```ts
import { createEnsforge } from "@ensforge/sdk/wagmi";
```

## Usage

::: code-group

```ts [client.ts]
import { createEnsforge } from "@ensforge/sdk/wagmi";
import { wagmiConfig } from "./wagmi";

export const sdk = createEnsforge({
  network: "mainnet",
  wagmiConfig,
});
```

<<< @/snippets/wagmi/config.ts[wagmi.ts]

:::

```ts [profile.ts]
import { sdk } from "./client";

const owner = await sdk.name.getOwner({ name: "ens.eth" });
```

## Parameters

```ts
import type { CreateWagmiConfigParameters } from "@ensforge/sdk/wagmi";
```

### network

`"mainnet" | "sepolia"`

ENS network selected from the Wagmi config.

### wagmiConfig

`Config`

Existing Wagmi config. Reads use its public client and writes resolve its current wallet connection.

### reads

`ReadOptions | undefined`

Default read execution policy.

### writes

`WriteOptions | undefined`

Default write execution and confirmation policy.

### gateways

`GatewayOptions | undefined`

Default outbound gateway policy.

## Return Type

`Ensforge`

An immutable SDK with the same grouped methods as the viem constructor.

## Error

Throws `ConfigError` when the network is unsupported, the Wagmi public client is unavailable, or a
policy is invalid. Wallet-dependent methods resolve the current connection when called.

## Action

- [`createWagmiConfig`](/core/api/create-wagmi-config)
- [`Ensforge`](/sdk/api/ensforge)
