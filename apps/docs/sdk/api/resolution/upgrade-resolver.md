---
title: upgradeResolver
description: upgrade resolver for resolution and resolver lifecycle.
---

# upgradeResolver

upgrade resolver for resolution and resolver lifecycle.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.resolution.upgradeResolver({
  name: "example.eth",
});
```

## Parameters

```ts
type UpgradeResolverParameters = Parameters<typeof sdk.resolution.upgradeResolver>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### implementation

`string | undefined`

Value used for `implementation` by this method.

### data

`Hex | undefined`

Raw calldata or record bytes.

### force

`boolean | undefined`

Value used for `force` by this method.

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
type UpgradeResolverResult = Awaited<ReturnType<typeof sdk.resolution.upgradeResolver>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.resolution.upgradeResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.resolution.upgradeResolver.call(parameters);
```

## Action

- [`upgradeResolver`](/core/api/actions/resolution/upgrade-resolver)
