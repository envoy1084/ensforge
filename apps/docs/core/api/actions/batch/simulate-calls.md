---
title: simulateCalls
description: simulate calls for typed read and wallet-aware write batching.
---

# simulateCalls

simulate calls for typed read and wallet-aware write batching.

This action belongs to typed read and wallet-aware write batching. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { simulateCalls } from "@ensforge/core";
```

## Usage

```ts
import { simulateCalls } from "@ensforge/core";
import { config } from "./config";

const result = await simulateCalls(config, {
  calls: [],
});
```

## Parameters

```ts
type SimulateCallsParameters = Parameters<typeof simulateCalls>[1];
```

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
type SimulateCallsResult = Awaited<ReturnType<typeof simulateCalls>>;
```

`readonly SimulatedWriteCall[]`

## Effect

```ts
const effect = simulateCalls.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type SimulateCallsError = Effect.Effect.Error<ReturnType<typeof simulateCalls.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
