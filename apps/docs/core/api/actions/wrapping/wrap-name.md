---
title: wrapName
description: Wraps an ENS name and returns resumable write progress.
---

# wrapName

Wraps an ENS name and returns resumable write progress.

This action belongs to wrapped names, expiries, and fuses. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { wrapName } from "@ensforge/core";
```

## Usage

```ts
import { wrapName } from "@ensforge/core";
import { config } from "./config";

const result = await wrapName(config, {
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type WrapNameParameters = Parameters<typeof wrapName>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### owner

`string`

Address that should own the resulting name or resource.

### resolver

`string | undefined`

Resolver address used by the operation.

### fuses

`number | ReadonlyArray<NameWrapperFuseName> | undefined`

Value used for `fuses` by this action.

### mode

`WriteMode | undefined`

Execution mode. `auto` uses wallet capabilities and falls back safely.

### confirmation

`ConfirmationPolicy | undefined`

Transaction confirmation policy for this operation.

### resume

`WrapNameResult | undefined`

Previously returned progress used to continue an incomplete workflow.

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

## Return Type

```ts
type WrapNameResult = Awaited<ReturnType<typeof wrapName>>;
```

`WrapNameResult`

## Effect

```ts
const effect = wrapName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type WrapNameError = Effect.Effect.Error<ReturnType<typeof wrapName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
