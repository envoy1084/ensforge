---
title: getOrCreateResolver
description: Returns a compatible resolver or deploys one when required.
---

# getOrCreateResolver

Returns a compatible resolver or deploys one when required.

This action belongs to resolver discovery and Universal Resolver calls. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getOrCreateResolver } from "@ensforge/core";
```

## Usage

```ts
import { getOrCreateResolver } from "@ensforge/core";
import { config } from "./config";

const result = await getOrCreateResolver(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetOrCreateResolverParameters = Parameters<typeof getOrCreateResolver>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### salt

`bigint | undefined`

Deterministic deployment salt.

### admin

`string | undefined`

Value used for `admin` by this action.

### roles

`bigint | undefined`

Role bitmask to read, grant, or revoke.

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
type GetOrCreateResolverResult = Awaited<ReturnType<typeof getOrCreateResolver>>;
```

`GetOrCreateResolverResult`

## Effect

```ts
const effect = getOrCreateResolver.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type GetOrCreateResolverError = Effect.Effect.Error<ReturnType<typeof getOrCreateResolver.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
