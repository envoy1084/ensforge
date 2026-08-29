---
title: readBatch
description: Executes a typed collection of ENS read requests, using Multicall where compatible.
---

# readBatch

Executes a typed collection of ENS read requests, using Multicall where compatible.

## Import

```ts
import { readBatch } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { readBatch } from "@ensforge/core";
import { config } from "./config";

const result = await readBatch(config, {
  owner: getOwner.request({ name: "ens.eth" }),
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof readBatch>[1];
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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = readBatch.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { ReadBatchError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.batch.readBatch`](/sdk/api/batch/read-batch)
