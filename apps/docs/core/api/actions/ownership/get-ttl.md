---
title: getTtl
description: Gets ttl for name ownership and registry management.
---

# getTtl

Gets ttl for name ownership and registry management.

## Import

```ts
import { getTtl } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getTtl } from "@ensforge/core";
import { config } from "./config";

const result = await getTtl(config, {
  name: "example.eth",
});
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
type GetTtlResult = Awaited<ReturnType<typeof getTtl>>;
```

| Property    | Type                             | Description                                            |
| ----------- | -------------------------------- | ------------------------------------------------------ |
| `supported` | `true \| false`                  | Whether the selected protocol supports this operation. |
| `protocol`  | `"v1" \| "v2"`                   | ENS protocol route used for the result.                |
| `ttl`       | `bigint \| undefined`            | The ttl value returned by the operation.               |
| `reason`    | `"TTL_UNSUPPORTED" \| undefined` | The reason value returned by the operation.            |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getTtl.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getTtl.request(parameters);
```

## Error

```ts
import type { GetTtlError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.ownership.getTtl`](/sdk/api/ownership/get-ttl)
