---
title: readBatchSettled
description: Executes a read batch and preserves each result or failure.
---

# readBatchSettled

Executes a read batch and preserves each result or failure.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.batch.readBatchSettled({
  owner: sdk.name.getOwner.request({ name: "sdk.eth" }),
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof sdk.batch.readBatchSettled>[0];
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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.batch.readBatchSettled.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/sdk/error.md-->

## Action

- [`readBatchSettled`](/core/api/actions/batch/read-batch-settled)
