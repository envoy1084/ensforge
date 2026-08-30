---
title: resolve
description: Resolves calldata through the active Universal Resolver.
---

# resolve

Resolves calldata through the active Universal Resolver.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.resolution.resolve({
  name: "example.eth",
  data: "0x",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { ResolveParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### data

`string`

Raw calldata or record bytes.

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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.resolution.resolve.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.resolution.resolve.request(parameters);
```

## Error

```ts
import type { ResolveError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`resolve`](/core/api/actions/resolution/resolve)
