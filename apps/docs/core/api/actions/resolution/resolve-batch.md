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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = resolveBatch.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = resolveBatch.request(parameters);
```

## Error

```ts
import type { ResolveBatchError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.resolution.resolveBatch`](/sdk/api/resolution/resolve-batch)
