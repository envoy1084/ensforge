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
import { ens } from "./client";

const result = await ens.batch.readBatchSettled({
  owner: ens.name.getOwner.request({ name: "ens.eth" }),
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof ens.batch.readBatchSettled>[0];
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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.batch.readBatchSettled.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`readBatchSettled`](/core/api/actions/batch/read-batch-settled)
