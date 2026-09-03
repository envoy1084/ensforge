---
title: Ensforge
description: Create a configured ensforge SDK client.
---

# Ensforge

Creates an immutable SDK client with domain-grouped ENS methods.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

Create the client once and export it from a module used by the rest of your application.

```ts [client.ts]
import { Ensforge } from "@ensforge/sdk";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const publicClient = createPublicClient({ chain: mainnet, transport: http() });

export const ens = new Ensforge({ network: "mainnet", publicClient });
```

```ts [index.ts]
import { sdk } from "./client";

const owner = await sdk.name.getOwner({ name: "example.eth" });
const avatar = await sdk.records.getAvatar({ name: "example.eth" });
```

## Parameters

```ts
import type { CreateConfigParameters } from "@ensforge/sdk";
```

### network

`"mainnet" | "sepolia"`

Selects the ENS deployment. The public and wallet client chains must match this network.

```ts
const ens = new Ensforge({ network: "sepolia", publicClient });
```

### publicClient

`PublicClient`

Viem client used for RPC reads, contract simulation, receipts, and event queries.

```ts
const ens = new Ensforge({ network: "mainnet", publicClient });
```

### walletClient

`WalletClient | undefined`

Default viem wallet client used by write methods. Omit it for a read-only SDK.

```ts
const ens = new Ensforge({ network: "mainnet", publicClient, walletClient });
```

### indexer

`IndexerConfig | false | undefined`

Configures the V1 and V2 indexer sources used by `sdk.indexer`. You can override endpoints and
headers or disable indexed queries entirely. See [Core Config](/core/api/config#indexer) for every
policy option.

```ts
const ens = new Ensforge({
  network: "mainnet",
  publicClient,
  indexer: {
    endpoints: { v1: process.env.ENS_V1_INDEXER_URL },
    failureMode: "partial",
  },
});
```

## Wagmi

`Config | undefined`

Use the optional adapter to construct an SDK from a Wagmi config.

```ts [client.ts]
import { createEnsforge } from "@ensforge/sdk/wagmi";
import { wagmiConfig } from "./wagmi";

export const ens = createEnsforge({ network: "mainnet", wagmiConfig });
```

<<< @/snippets/wagmi/config.ts

## Properties

### config

`EnsforgeConfig`

The validated Core configuration shared by every method.

### Action groups

| Property       | Purpose                                                |
| -------------- | ------------------------------------------------------ |
| `batch`        | Read batching, wallet capabilities, and call execution |
| `capabilities` | Authorization, roles, approvals, and write routing     |
| `dns`          | DNS records and DNS namespace imports                  |
| `events`       | Event queries, history, and streams                    |
| `indexer`      | Indexed names, records, registrations, and discovery   |
| `migration`    | ENS migration planning and execution                   |
| `name`         | Name state, ownership, status, and protocol reads      |
| `ownership`    | Managers, registrants, transfers, and TTL              |
| `permissions`  | Operator, token, resolver, and role permissions        |
| `records`      | Resolver record reads and writes                       |
| `registration` | Registration, renewal, pricing, and commitments        |
| `resolution`   | Resolver selection, creation, and raw resolution       |
| `reverse`      | Primary-name reads and writes                          |
| `subnames`     | Subname lifecycle operations                           |
| `wrapping`     | Name Wrapper ownership, fuses, and expiry              |

## Return Type

```ts
const ens: Ensforge = new Ensforge(parameters);
```

The instance is frozen after construction. Each grouped method retains its Promise API and its
`.effect`, `.request`, `.call`, or `.stream` extension when supported by the underlying Core action.

## Error

Construction can throw `ConfigError` for a missing client, unsupported network, or chain mismatch.
Runtime methods expose their action-specific typed errors.

See [Error Handling](/sdk/guides/error-handling).
