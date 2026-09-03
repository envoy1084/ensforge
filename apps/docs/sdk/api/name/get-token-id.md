---
title: getTokenId
description: Gets token id for name state.
---

# getTokenId

Gets token id for name state.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.name.getTokenId({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="name.getTokenId" />

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
type GetTokenIdResult = Awaited<ReturnType<typeof getTokenId>>;
```

| Property  | Type                        | Description                          |
| --------- | --------------------------- | ------------------------------------ |
| `valueOf` | `() => bigint \| undefined` | function valueOf() { [native code] } |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.name.getTokenId.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.name.getTokenId.request(parameters);
```

## Error

```ts
import type { GetTokenIdError } from "@ensforge/sdk/name";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getTokenId`](/core/api/actions/name/get-token-id)
