---
title: isMigrated
description: Checks whether migrated for name state.
---

# isMigrated

Checks whether migrated for name state.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.name.isMigrated({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="name.isMigrated" />

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
type IsMigratedResult = Awaited<ReturnType<typeof isMigrated>>;
```

| Property  | Type            | Description                          |
| --------- | --------------- | ------------------------------------ |
| `valueOf` | `() => boolean` | function valueOf() { [native code] } |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.name.isMigrated.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.name.isMigrated.request(parameters);
```

## Error

```ts
import type { IsMigratedError } from "@ensforge/sdk/name";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`isMigrated`](/core/api/actions/name/is-migrated)
