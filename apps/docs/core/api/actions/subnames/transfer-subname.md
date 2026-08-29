---
title: transferSubname
description: Transfers subname through the active ENS ownership route.
---

# transferSubname

Transfers subname through the active ENS ownership route.

This action belongs to subname management. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { transferSubname } from "@ensforge/core";
```

## Usage

```ts
import { transferSubname } from "@ensforge/core";
import { config } from "./config";

const result = await transferSubname(config, {
  to: "value",
  name: "example.eth",
});
```

## Parameters

```ts
type TransferSubnameParameters = Parameters<typeof transferSubname>[1];
```

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

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

## Return Type

```ts
type TransferSubnameResult = Awaited<ReturnType<typeof transferSubname>>;
```

`TransferNameProgress`

## Effect

```ts
const effect = transferSubname.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type TransferSubnameError = Effect.Effect.Error<ReturnType<typeof transferSubname.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
