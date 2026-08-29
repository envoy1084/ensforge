---
title: createResolver
description: Creates resolver for resolution and resolver lifecycle.
---

# createResolver

Creates resolver for resolution and resolver lifecycle.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.resolution.createResolver({
  salt: 1n,
});
```

## Parameters

```ts
type CreateResolverParameters = Parameters<typeof sdk.resolution.createResolver>[0];
```

### salt

`bigint`

Value used for `salt` by this method.

### admin

`string | undefined`

Value used for `admin` by this method.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Value used for `setters` by this method.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

## Return Type

```ts
type CreateResolverResult = Awaited<ReturnType<typeof sdk.resolution.createResolver>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.resolution.createResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.resolution.createResolver.call(parameters);
```

## Action

- [`createResolver`](/core/api/actions/resolution/create-resolver)
