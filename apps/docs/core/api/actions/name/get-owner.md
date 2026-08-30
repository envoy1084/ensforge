---
title: getOwner
description: Get the effective owner of an ENS name.
---

# getOwner

Get the effective owner of an ENS name.

## Import

```ts
import { getOwner } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getOwner } from "@ensforge/core";
import { config } from "./config";

const result = await getOwner(config, { name: "ens.eth" });
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetOwnerParameters } from "@ensforge/core";
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
type GetOwnerResult = Awaited<ReturnType<typeof getOwner>>;
```

| Property         | Type                                                      | Description                                                  |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| `name`           | `string & Brand<"NormalizedName"> \| undefined`           | Normalized ENS name.                                         |
| `owner`          | `&#96;0x${string}&#96; \| null \| undefined`              | Current owner address, or `null` when the name has no owner. |
| `registrant`     | `&#96;0x${string}&#96; \| null \| undefined`              | The registrant value returned by the operation.              |
| `protocol`       | `"v1" \| "v2" \| undefined`                               | ENS protocol route used for the result.                      |
| `ownershipLevel` | `"registry" \| "registrar" \| "nameWrapper" \| undefined` | The ownershipLevel value returned by the operation.          |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getOwner.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getOwner.request(parameters);
```

## Error

```ts
import type { GetOwnerError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.name.getOwner`](/sdk/api/name/get-owner)
