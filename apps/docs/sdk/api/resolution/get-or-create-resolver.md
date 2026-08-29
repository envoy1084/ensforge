---
title: getOrCreateResolver
description: Returns a compatible resolver or creates one.
---

# getOrCreateResolver

Returns a compatible resolver or creates one.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.resolution.getOrCreateResolver({
  name: "example.eth",
});
```

## Parameters

```ts
type GetOrCreateResolverParameters = Parameters<typeof sdk.resolution.getOrCreateResolver>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### salt

`bigint | undefined`

Value used for `salt` by this method.

### admin

`string | undefined`

Value used for `admin` by this method.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

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
type GetOrCreateResolverResult = Awaited<ReturnType<typeof sdk.resolution.getOrCreateResolver>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.resolution.getOrCreateResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`getOrCreateResolver`](/core/api/actions/resolution/get-or-create-resolver)
