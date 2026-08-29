---
title: readBatch
description: Executes a typed collection of ENS read requests, using Multicall where compatible.
---

# readBatch

Executes a typed collection of ENS read requests, using Multicall where compatible.

This action belongs to typed read and wallet-aware write batching. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { readBatch } from "@ensforge/core";
```

## Usage

```ts
import { readBatch } from "@ensforge/core";
import { config } from "./config";

const result = await readBatch(config, {
  owner: getOwner.request({ name: "ens.eth" }),
});
```

## Parameters

```ts
type ReadBatchParameters = Parameters<typeof readBatch>[1];
```

### requests

`Requests`

Argument passed to `readBatch`.

### options

`ReadExecutionOptions | undefined`

Argument passed to `readBatch`.

### runOptions

`Effect.RunOptions | undefined`

Argument passed to `readBatch`.

## Return Type

```ts
type ReadBatchResult = Awaited<ReturnType<typeof readBatch>>;
```

`ReadBatchResult<Requests>`

## Effect

```ts
const effect = readBatch.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type ReadBatchError = Effect.Effect.Error<ReturnType<typeof readBatch.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
