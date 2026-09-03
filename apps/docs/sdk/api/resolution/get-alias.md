---
title: getAlias
description: Gets alias for resolution and resolver lifecycle.
---

# getAlias

Gets alias for resolution and resolver lifecycle.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.resolution.getAlias({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="resolution.getAlias" />

## Parameters

```ts
import type { GetAliasParameters } from "@ensforge/sdk/resolution";
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
type GetAliasResult = Awaited<ReturnType<typeof getAlias>>;
```

| Property    | Type                                                          | Description                                               |
| ----------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| `supported` | `false \| true`                                               | Whether the selected protocol supports this operation.    |
| `name`      | `string & Brand<"NormalizedName">`                            | Normalized ENS name.                                      |
| `resolver`  | `&#96;0x${string}&#96; \| null \| &#96;0x${string}&#96;`      | The resolver value returned by the operation.             |
| `reason`    | `"RESOLVER_NOT_FOUND" \| "ALIASING_UNSUPPORTED" \| undefined` | The reason value returned by the operation.               |
| `target`    | `(string & Brand<"NormalizedName">) \| null \| undefined`     | The target value returned by the operation.               |
| `raw`       | `&#96;0x${string}&#96; \| undefined`                          | Raw resolver bytes, or `null` when the record is not set. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.resolution.getAlias.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.resolution.getAlias.request(parameters);
```

## Error

```ts
import type { GetAliasError } from "@ensforge/sdk/resolution";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getAlias`](/core/api/actions/resolution/get-alias)
