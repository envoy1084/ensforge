---
title: resolveBatch
description: Resolves multiple Universal Resolver calls in one operation.
---

# resolveBatch

Resolves multiple Universal Resolver calls in one operation.

This action belongs to resolver discovery and Universal Resolver calls. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { resolveBatch } from "@ensforge/core";
```

## Usage

```ts
import { resolveBatch } from "@ensforge/core";
import { config } from "./config";

const result = await resolveBatch(config, {
  calls: [],
});
```

## Parameters

```ts
type ResolveBatchParameters = Parameters<typeof resolveBatch>[1];
```

### calls

`ReadonlyArray<ResolveBatchCall>`

Read calls or write intents included in the operation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type ResolveBatchResult = Awaited<ReturnType<typeof resolveBatch>>;
```

`ResolveBatchResult`

## Effect

```ts
const effect = resolveBatch.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = resolveBatch.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ResolveBatchError = Effect.Effect.Error<ReturnType<typeof resolveBatch.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
