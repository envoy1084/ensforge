---
title: predictResolverAddress
description: predict resolver address for resolver discovery and Universal Resolver calls.
---

# predictResolverAddress

predict resolver address for resolver discovery and Universal Resolver calls.

This action belongs to resolver discovery and Universal Resolver calls. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { predictResolverAddress } from "@ensforge/core";
```

## Usage

```ts
import { predictResolverAddress } from "@ensforge/core";
import { config } from "./config";

const result = await predictResolverAddress(config, {
  salt: 0n,
});
```

## Parameters

```ts
type PredictResolverAddressParameters = Parameters<typeof predictResolverAddress>[1];
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
type PredictResolverAddressResult = Awaited<ReturnType<typeof predictResolverAddress>>;
```

`0x${string}`

## Effect

```ts
const effect = predictResolverAddress.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type PredictResolverAddressError = Effect.Effect.Error<
  ReturnType<typeof predictResolverAddress.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
