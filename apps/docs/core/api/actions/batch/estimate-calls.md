---
title: estimateCalls
description: estimate calls for typed read and wallet-aware write batching.
---

# estimateCalls

estimate calls for typed read and wallet-aware write batching.

This action belongs to typed read and wallet-aware write batching. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { estimateCalls } from "@ensforge/core";
```

## Usage

```ts
import { estimateCalls } from "@ensforge/core";
import { config } from "./config";

const result = await estimateCalls(config, {
  calls: [],
});
```

## Parameters

```ts
type EstimateCallsParameters = Parameters<typeof estimateCalls>[1];
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
type EstimateCallsResult = Awaited<ReturnType<typeof estimateCalls>>;
```

`EstimateCallsResult`

## Effect

```ts
const effect = estimateCalls.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type EstimateCallsError = Effect.Effect.Error<ReturnType<typeof estimateCalls.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
