---
title: readBatchSettled
description: Executes a typed read batch and preserves each success or failure independently.
---

# readBatchSettled

Executes a typed read batch and preserves each success or failure independently.

## Import

```ts
import { readBatchSettled } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { readBatchSettled } from "@ensforge/core";
import { config } from "./config";

const result = await readBatchSettled(config, {
  owner: getOwner.request({ name: "ens.eth" }),
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof readBatchSettled>[1];
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

Returns `ReadBatchSettledResult<Requests>`.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = readBatchSettled.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.batch.readBatchSettled`](/sdk/api/batch/read-batch-settled)
