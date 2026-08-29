---
title: upgradeResolver
description: Upgrades resolver through resolver discovery and Universal Resolver calls.
---

# upgradeResolver

Upgrades resolver through resolver discovery and Universal Resolver calls.

This action belongs to resolver discovery and Universal Resolver calls. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { upgradeResolver } from "@ensforge/core";
```

## Usage

```ts
import { upgradeResolver } from "@ensforge/core";
import { config } from "./config";

const result = await upgradeResolver(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type UpgradeResolverParameters = Parameters<typeof upgradeResolver>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### implementation

`string | undefined`

Resolver implementation used by an upgrade.

### data

`Hex | undefined`

Raw calldata or resolver bytes.

### force

`boolean | undefined`

Allows execution when the normal no-op guard would stop the operation.

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

### confirmation

`ConfirmationPolicy | undefined`

Transaction confirmation policy for this operation.

## Return Type

```ts
type UpgradeResolverResult = Awaited<ReturnType<typeof upgradeResolver>>;
```

`UpgradeResolverResult`

## Effect

```ts
const effect = upgradeResolver.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = upgradeResolver.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type UpgradeResolverError = Effect.Effect.Error<ReturnType<typeof upgradeResolver.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
