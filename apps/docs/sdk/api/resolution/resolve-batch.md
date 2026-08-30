---
title: resolveBatch
description: Resolves multiple Universal Resolver calls.
---

# resolveBatch

Resolves multiple Universal Resolver calls.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.resolution.resolveBatch({
  calls: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { ResolveBatchParameters } from "@ensforge/sdk";
```

### calls

`ReadonlyArray<ResolveBatchCall>`

Read requests or write intents included in the operation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { ResolveBatchResult } from "@ensforge/sdk";
```

Returns `ResolveBatchResult`.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.resolution.resolveBatch.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.resolution.resolveBatch.request(parameters);
```

## Error

```ts
import type { ResolveBatchError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`resolveBatch`](/core/api/actions/resolution/resolve-batch)
