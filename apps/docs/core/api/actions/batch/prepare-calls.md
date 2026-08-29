---
title: prepareCalls
description: Resolves authorization and simulates ENS write intents without submitting them.
---

# prepareCalls

Resolves authorization and simulates ENS write intents without submitting them.

This action belongs to typed read and wallet-aware write batching. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { prepareCalls } from "@ensforge/core";
```

## Usage

```ts
import { prepareCalls } from "@ensforge/core";
import { config } from "./config";

const result = await prepareCalls(config, {
  calls: [],
});
```

## Parameters

```ts
type PrepareCallsParameters = Parameters<typeof prepareCalls>[1];
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
type PrepareCallsResult = Awaited<ReturnType<typeof prepareCalls>>;
```

`readonly PreparedWriteCall[]`

## Effect

```ts
const effect = prepareCalls.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type PrepareCallsError = Effect.Effect.Error<ReturnType<typeof prepareCalls.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
