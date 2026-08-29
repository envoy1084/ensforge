---
title: resolveBatch
description: Resolves multiple Universal Resolver calls in one operation.
---

# resolveBatch

Resolves multiple Universal Resolver calls in one operation.

## Import

```ts
import { resolveBatch } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { resolveBatch } from "@ensforge/core";
import { config } from "./config";

const result = await resolveBatch(config, {
  calls: [],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { ResolveBatchParameters } from "@ensforge/core";
```

### calls

`ReadonlyArray<ResolveBatchCall>`

Read calls or write intents included in the operation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { ResolveBatchResult } from "@ensforge/core";
```

Returns `ResolveBatchResult`.

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = resolveBatch.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = resolveBatch.request(parameters);
```

## Error

```ts
import type { ResolveBatchError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.resolution.resolveBatch`](/sdk/api/resolution/resolve-batch)
