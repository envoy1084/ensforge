---
title: transferName
description: Transfers name through the active ENS ownership route.
---

# transferName

Transfers name through the active ENS ownership route.

This action belongs to name ownership and registry management. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { transferName } from "@ensforge/core";
```

## Usage

```ts
import { transferName } from "@ensforge/core";
import { config } from "./config";

const result = await transferName(config, {
  name: "example.eth",
  to: "value",
});
```

## Parameters

```ts
type TransferNameParameters = Parameters<typeof transferName>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### to

`string`

Value used for `to` by this action.

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` uses wallet capabilities and falls back safely.

### confirmation

`ConfirmationPolicy | undefined`

Transaction confirmation policy for this operation.

### resume

`TransferNameProgress | undefined`

Previously returned progress used to continue an incomplete workflow.

## Return Type

```ts
type TransferNameResult = Awaited<ReturnType<typeof transferName>>;
```

`TransferNameProgress`

## Effect

```ts
const effect = transferName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type TransferNameError = Effect.Effect.Error<ReturnType<typeof transferName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
