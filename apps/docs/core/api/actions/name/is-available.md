---
title: isAvailable
description: Check whether an ENS name is available through its active registration route.
---

# isAvailable

Check whether an ENS name is available through its active registration route.

## Import

```ts
import { isAvailable } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { isAvailable } from "@ensforge/core";
import { config } from "./config";

const available = await isAvailable(config, { name: "example.eth" });
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="name.isAvailable" />

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
type IsAvailableResult = Awaited<ReturnType<typeof isAvailable>>;
```

| Property  | Type            | Description                          |
| --------- | --------------- | ------------------------------------ |
| `valueOf` | `() => boolean` | function valueOf() { [native code] } |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = isAvailable.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = isAvailable.request(parameters);
```

## Error

```ts
import type { IsAvailableError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.name.isAvailable`](/sdk/api/name/is-available)
