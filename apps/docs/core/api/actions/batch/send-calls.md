---
title: sendCalls
description: Submits ENS write intents through wallet batching or sequential fallback.
---

# sendCalls

Submits ENS write intents through wallet batching or sequential fallback.

This action belongs to typed read and wallet-aware write batching. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { sendCalls } from "@ensforge/core";
```

## Usage

```ts
import { sendCalls } from "@ensforge/core";
import { config } from "./config";

const result = await sendCalls(config, {
  calls: [],
});
```

## Parameters

```ts
type SendCallsParameters = Parameters<typeof sendCalls>[1];
```

### mode

`WriteMode | undefined`

Execution mode. `auto` uses wallet capabilities and falls back safely.

### atomicity

`WriteAtomicity | undefined`

Atomicity required from the selected execution path.

### confirmation

`ConfirmationPolicy | undefined`

Transaction confirmation policy for this operation.

### simulation

`"required" | "skip" | undefined`

Whether prepared calls must be simulated.

### capabilities

`Readonly<Record<string, unknown>> | undefined`

Wallet capability overrides included with the call request.

### calls

`ReadonlyArray<EnsWriteIntent<unknown, WriteError>>`

Read calls or write intents included in the operation.

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

## Return Type

```ts
type SendCallsResult = Awaited<ReturnType<typeof sendCalls>>;
```

`SendCallsResult`

## Effect

```ts
const effect = sendCalls.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type SendCallsError = Effect.Effect.Error<ReturnType<typeof sendCalls.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
