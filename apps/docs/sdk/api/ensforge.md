---
title: ensforge
description: Create an immutable, config-bound ENS client.
---

# Ensforge

Creates an SDK instance with grouped ENS methods.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
const sdk = new Ensforge({
  network: "mainnet",
  publicClient,
  walletClient,
});
```

Or provide a Wagmi config:

```ts
const sdk = new Ensforge({ network: "mainnet", wagmiConfig });
```

## Parameters

The constructor accepts the same `CreateConfigParameters` union as Core `createConfig`. Provide
either `publicClient` with an optional `walletClient`, or `wagmiConfig`.

See [`createConfig`](/core/api/create-config) for every option.

## Properties

`config` contains the resolved immutable Core configuration. Action groups are available as `batch`,
`capabilities`, `dns`, `events`, `migration`, `name`, `ownership`, `permissions`, `records`,
`registration`, `resolution`, `reverse`, `subnames`, and `wrapping`.

## Return Type

`Ensforge`

The instance and every action group are frozen after construction.
