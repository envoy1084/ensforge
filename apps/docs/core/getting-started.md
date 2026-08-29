---
title: Getting Started
description: Configure ensforge Core and read your first ENS name.
---

# Getting Started

## Create a public client

ensforge uses a viem `PublicClient` for contract and RPC reads.

```ts
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});
```

For production, pass an authenticated RPC URL to `http`. Public endpoints are useful for local
development but are commonly rate-limited.

## Create the config

Pass the network and public client to `createConfig`.

```ts
import { createConfig } from "@ensforge/core";

export const config = createConfig({
  network: "mainnet",
  publicClient,
});
```

The client chain must match the selected network. ensforge supports `mainnet` and `sepolia`.

## Read a name

Actions accept the config first and an action-specific parameter object second.

```ts
import { getNameState, getOwner } from "@ensforge/core";
import { config } from "./config";

const owner = await getOwner(config, { name: "ens.eth" });
const state = await getNameState(config, { name: "ens.eth" });
```

Names are normalized before they are used. Invalid names fail with a typed `NameError`.

## Use an existing Wagmi config

If your application already uses Wagmi, pass its config instead of creating separate viem clients.

```ts
import { createConfig as createEnsforgeConfig } from "@ensforge/core";
import { wagmiConfig } from "./wagmi";

export const config = createEnsforgeConfig({
  network: "mainnet",
  wagmiConfig,
});
```

Reads use Wagmi's public client. Writes resolve the active wallet client when the action executes, so
account changes do not require recreating the ensforge config.

## Add writes

When using viem directly, include a wallet client.

```ts
import { createWalletClient, custom } from "viem";
import { mainnet } from "viem/chains";

const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

export const config = createConfig({
  network: "mainnet",
  publicClient,
  walletClient,
});
```

You can now call write actions such as `setText`. Writes simulate by default and wait for
confirmation unless the config or action requests submitted-only behavior.

```ts
import { setText } from "@ensforge/core";

const result = await setText(config, {
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});
```

Continue with [Effect](/core/effect), [Error Handling](/core/guides/error-handling), or browse the
[Name Actions](/core/api/actions/name/get-name-state).
