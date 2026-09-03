---
title: getExpiry
description: Gets expiry for name state.
---

# getExpiry

Gets expiry for name state.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.name.getExpiry({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="name.getExpiry" />

## Parameters

```ts
import type { GetExpiryParameters } from "@ensforge/sdk/name";
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
type GetExpiryResult = Awaited<ReturnType<typeof getExpiry>>;
```

| Property         | Type                                                          | Description                                         |
| ---------------- | ------------------------------------------------------------- | --------------------------------------------------- |
| `name`           | `string & Brand<"NormalizedName"> \| undefined`               | Normalized ENS name.                                |
| `expiry`         | `bigint \| undefined`                                         | The expiry value returned by the operation.         |
| `gracePeriod`    | `bigint \| undefined`                                         | The gracePeriod value returned by the operation.    |
| `gracePeriodEnd` | `bigint \| undefined`                                         | The gracePeriodEnd value returned by the operation. |
| `protocol`       | `"v1" \| "v2" \| undefined`                                   | ENS protocol route used for the result.             |
| `source`         | `"registry" \| "nameWrapper" \| "baseRegistrar" \| undefined` | The source value returned by the operation.         |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.name.getExpiry.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.name.getExpiry.request(parameters);
```

## Error

```ts
import type { GetExpiryError } from "@ensforge/sdk/name";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getExpiry`](/core/api/actions/name/get-expiry)
