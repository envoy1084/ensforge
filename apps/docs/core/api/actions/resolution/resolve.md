---
title: resolve
description: Resolves arbitrary calldata through the active Universal Resolver.
---

# resolve

Resolves arbitrary calldata through the active Universal Resolver.

## Import

```ts
import { resolve } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { resolve } from "@ensforge/core";
import { config } from "./config";

const result = await resolve(config, {
  name: "example.eth",
  data: "0x",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="resolution.resolve" />

## Parameters

```ts
import type { ResolveParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### data

`string`

Raw calldata or resolver bytes.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type ResolveResult = Awaited<ReturnType<typeof resolve>>;
```

| Property          | Type                                 | Description                                          |
| ----------------- | ------------------------------------ | ---------------------------------------------------- |
| `data`            | `&#96;0x${string}&#96; \| undefined` | The data value returned by the operation.            |
| `resolverAddress` | `&#96;0x${string}&#96; \| undefined` | The resolverAddress value returned by the operation. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = resolve.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = resolve.request(parameters);
```

## Error

```ts
import type { ResolveError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.resolution.resolve`](/sdk/api/resolution/resolve)
