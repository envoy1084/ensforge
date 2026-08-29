---
title: transferSubname
description: Transfers subname through the active ownership route.
---

# transferSubname

Transfers subname through the active ownership route.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.subnames.transferSubname({
  to: "value",
  name: "example.eth",
});
```

## Parameters

```ts
type TransferSubnameParameters = Parameters<typeof sdk.subnames.transferSubname>[0];
```

### to

`string`

Value used for `to` by this method.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

## Return Type

```ts
type TransferSubnameResult = Awaited<ReturnType<typeof sdk.subnames.transferSubname>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.subnames.transferSubname.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`transferSubname`](/core/api/actions/subnames/transfer-subname)
