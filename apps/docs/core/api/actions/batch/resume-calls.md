---
title: resumeCalls
description: Continues a partially completed wallet or sequential call execution.
---

# resumeCalls

Continues a partially completed wallet or sequential call execution.

This action belongs to typed read and wallet-aware write batching. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { resumeCalls } from "@ensforge/core";
```

## Usage

```ts
import { resumeCalls } from "@ensforge/core";
import { config } from "./config";

const result = await resumeCalls(config, {
  batch: {},
});
```

## Parameters

```ts
type ResumeCallsParameters = Parameters<typeof resumeCalls>[1];
```

### batch

`NativeBatchResult`

Previously submitted native wallet batch.

### confirmation

`ConfirmationPolicy | undefined`

Transaction confirmation policy for this operation.

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

## Return Type

```ts
type ResumeCallsResult = Awaited<ReturnType<typeof resumeCalls>>;
```

`NativeBatchResult`

## Effect

```ts
const effect = resumeCalls.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type ResumeCallsError = Effect.Effect.Error<ReturnType<typeof resumeCalls.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
