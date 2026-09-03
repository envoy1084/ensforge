---
title: isRenewable
description: Checks whether renewable for name state.
---

# isRenewable

Checks whether renewable for name state.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.name.isRenewable({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="name.isRenewable" />

## Parameters

```ts
import type { GetNameStateParameters } from "@ensforge/sdk/name";
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
type IsRenewableResult = Awaited<ReturnType<typeof isRenewable>>;
```

| Property  | Type            | Description                          |
| --------- | --------------- | ------------------------------------ |
| `valueOf` | `() => boolean` | function valueOf() { [native code] } |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.name.isRenewable.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.name.isRenewable.request(parameters);
```

## Error

```ts
import type { IsRenewableError } from "@ensforge/sdk/name";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`isRenewable`](/core/api/actions/name/is-renewable)
