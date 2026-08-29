---
title: transferName
description: Transfers name through the active ownership route.
---

# transferName

Transfers name through the active ownership route.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.ownership.transferName({
  name: "example.eth",
  to: "value",
});
```

## Parameters

```ts
type TransferNameParameters = Parameters<typeof sdk.ownership.transferName>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

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

### resume

`TransferNameProgress | undefined`

Previously returned progress used to continue the workflow.

## Return Type

```ts
type TransferNameResult = Awaited<ReturnType<typeof sdk.ownership.transferName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.ownership.transferName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`transferName`](/core/api/actions/ownership/transfer-name)
