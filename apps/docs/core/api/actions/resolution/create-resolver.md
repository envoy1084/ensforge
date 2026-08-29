---
title: createResolver
description: Creates resolver for resolver discovery and Universal Resolver calls.
---

# createResolver

Creates resolver for resolver discovery and Universal Resolver calls.

This action belongs to resolver discovery and Universal Resolver calls. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { createResolver } from "@ensforge/core";
```

## Usage

```ts
import { createResolver } from "@ensforge/core";
import { config } from "./config";

const result = await createResolver(config, {
  salt: 0n,
});
```

## Parameters

```ts
type CreateResolverParameters = Parameters<typeof createResolver>[1];
```

### salt

`bigint`

Deterministic deployment salt.

### admin

`string | undefined`

Value used for `admin` by this action.

### roles

`bigint | undefined`

Role bitmask to read, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Encoded initial resolver setter calls.

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
type CreateResolverResult = Awaited<ReturnType<typeof createResolver>>;
```

`CreateResolverResult`

## Effect

```ts
const effect = createResolver.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = createResolver.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type CreateResolverError = Effect.Effect.Error<ReturnType<typeof createResolver.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
