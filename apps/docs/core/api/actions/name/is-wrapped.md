---
title: isWrapped
description: Check whether an ENS name is represented by a wrapper registry.
---

# isWrapped

Check whether an ENS name is represented by a wrapper registry.

## Import

```ts
import { isWrapped } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { isWrapped } from "@ensforge/core";
import { config } from "./config";

const wrapped = await isWrapped(config, { name: "example.eth" });
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="name.isWrapped" />

## Parameters

```ts
import type { GetNameStateParameters } from "@ensforge/core";
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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = isWrapped.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = isWrapped.request(parameters);
```

## Error

```ts
import type { IsWrappedError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.name.isWrapped`](/sdk/api/name/is-wrapped)
