---
title: isWrapped
description: Checks whether wrapped for name state.
---

# isWrapped

Checks whether wrapped for name state.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.name.isWrapped({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetNameStateParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type IsWrappedResult = Awaited<ReturnType<typeof isWrapped>>;
```

| Property  | Type            | Description                          |
| --------- | --------------- | ------------------------------------ |
| `valueOf` | `() => boolean` | function valueOf() { [native code] } |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.name.isWrapped.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.name.isWrapped.request(parameters);
```

## Error

```ts
import type { IsWrappedError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`isWrapped`](/core/api/actions/name/is-wrapped)
