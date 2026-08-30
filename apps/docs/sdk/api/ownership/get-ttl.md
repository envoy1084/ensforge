---
title: getTtl
description: Gets ttl for ownership management.
---

# getTtl

Gets ttl for ownership management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.ownership.getTtl({
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
type GetTtlResult = Awaited<ReturnType<typeof getTtl>>;
```

| Property    | Type                             | Description                                            |
| ----------- | -------------------------------- | ------------------------------------------------------ |
| `supported` | `true \| false`                  | Whether the selected protocol supports this operation. |
| `protocol`  | `"v1" \| "v2"`                   | ENS protocol route used for the result.                |
| `ttl`       | `bigint \| undefined`            | The ttl value returned by the operation.               |
| `reason`    | `"TTL_UNSUPPORTED" \| undefined` | The reason value returned by the operation.            |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.ownership.getTtl.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.ownership.getTtl.request(parameters);
```

## Error

```ts
import type { GetTtlError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getTtl`](/core/api/actions/ownership/get-ttl)
