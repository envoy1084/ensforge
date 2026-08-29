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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = readBatchSettled.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.batch.readBatchSettled`](/sdk/api/batch/read-batch-settled)
