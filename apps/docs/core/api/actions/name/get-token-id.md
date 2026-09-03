---
title: getTokenId
description: Get the registrar, wrapper, or registry token ID for an ENS name.
---

# getTokenId

Get the registrar, wrapper, or registry token ID for an ENS name.

## Import

```ts
import { getTokenId } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getTokenId } from "@ensforge/core";
import { config } from "./config";

const tokenId = await getTokenId(config, { name: "ens.eth" });
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="name.getTokenId" />

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
type GetTokenIdResult = Awaited<ReturnType<typeof getTokenId>>;
```

| Property  | Type                        | Description                          |
| --------- | --------------------------- | ------------------------------------ |
| `valueOf` | `() => bigint \| undefined` | function valueOf() { [native code] } |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getTokenId.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getTokenId.request(parameters);
```

## Error

```ts
import type { GetTokenIdError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.name.getTokenId`](/sdk/api/name/get-token-id)
