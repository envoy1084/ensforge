---
title: readBatchSettled
description: Executes a typed read batch and preserves each success or failure independently.
---

# readBatchSettled

Executes a typed read batch and preserves each success or failure independently.

This action belongs to typed read and wallet-aware write batching. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { readBatchSettled } from "@ensforge/core";
```

## Usage

```ts
import { readBatchSettled } from "@ensforge/core";
import { config } from "./config";

const result = await readBatchSettled(config, {
  owner: getOwner.request({ name: "ens.eth" }),
});
```

## Parameters

```ts
type ReadBatchSettledParameters = Parameters<typeof readBatchSettled>[1];
```

### requests

`Requests`

Argument passed to `readBatchSettled`.

### options

`ReadExecutionOptions | undefined`

Argument passed to `readBatchSettled`.

### runOptions

`Effect.RunOptions | undefined`

Argument passed to `readBatchSettled`.

## Return Type

```ts
type ReadBatchSettledResult = Awaited<ReturnType<typeof readBatchSettled>>;
```

`ReadBatchSettledResult<Requests>`

## Effect

```ts
const effect = readBatchSettled.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type ReadBatchSettledError = Effect.Effect.Error<ReturnType<typeof readBatchSettled.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
