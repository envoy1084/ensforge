---
title: getPrimaryName
description: Gets primary name for reverse resolution.
---

# getPrimaryName

Gets primary name for reverse resolution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.reverse.getPrimaryName({
  address: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="reverse.getPrimaryName" />

## Parameters

```ts
import type { GetPrimaryNameParameters } from "@ensforge/sdk/reverse";
```

### address

`string`

Address used by the method.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n`.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetPrimaryNameResult = Awaited<ReturnType<typeof getPrimaryName>>;
```

| Property | Type                                            | Description                                |
| -------- | ----------------------------------------------- | ------------------------------------------ |
| `name`   | `string & Brand<"NormalizedName"> \| undefined` | Normalized ENS name.                       |
| `match`  | `true \| undefined`                             | The match value returned by the operation. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.reverse.getPrimaryName.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.reverse.getPrimaryName.request(parameters);
```

## Error

```ts
import type { GetPrimaryNameError } from "@ensforge/sdk/reverse";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getPrimaryName`](/core/api/actions/reverse/get-primary-name)
