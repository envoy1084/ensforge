---
title: isReserved
description: Check whether ENSv2 reserves a name for its ENSv1 owner.
---

# isReserved

Check whether ENSv2 reserves a name for its ENSv1 owner.

## Import

```ts
import { isReserved } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { isReserved } from "@ensforge/core";
import { config } from "./config";

const reserved = await isReserved(config, { name: "example.eth" });
```

<<< @/snippets/core/config.ts

:::

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
type IsReservedResult = Awaited<ReturnType<typeof isReserved>>;
```

| Property  | Type            | Description                          |
| --------- | --------------- | ------------------------------------ |
| `valueOf` | `() => boolean` | function valueOf() { [native code] } |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = isReserved.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = isReserved.request(parameters);
```

## Error

```ts
import type { IsReservedError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.name.isReserved`](/sdk/api/name/is-reserved)
