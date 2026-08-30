---
title: readBatch
description: Executes typed read requests with configuration already bound.
---

# readBatch

Executes typed read requests with configuration already bound.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.batch.readBatch({
  owner: sdk.name.getOwner.request({ name: "sdk.eth" }),
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof sdk.batch.readBatch>[0];
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

Returns `ReadBatchResult<Requests>`.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.batch.readBatch.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { ReadBatchError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`readBatch`](/core/api/actions/batch/read-batch)
