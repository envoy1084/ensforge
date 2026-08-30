---
title: getExpiry
description: Get the expiry and grace-period boundary of an ENS name.
---

# getExpiry

Get the expiry and grace-period boundary of an ENS name.

## Import

```ts
import { getExpiry } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getExpiry } from "@ensforge/core";
import { config } from "./config";

const expiry = await getExpiry(config, { name: "ens.eth" });
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetExpiryParameters } from "@ensforge/core";
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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getExpiry.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getExpiry.request(parameters);
```

## Error

```ts
import type { GetExpiryError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.name.getExpiry`](/sdk/api/name/get-expiry)
