---
title: getPubkey
description: Gets pubkey for ENS resolver records.
---

# getPubkey

Gets pubkey for ENS resolver records.

## Import

```ts
import { getPubkey } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getPubkey } from "@ensforge/core";
import { config } from "./config";

const result = await getPubkey(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetPubkeyParameters } from "@ensforge/core";
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
type GetPubkeyResult = Awaited<ReturnType<typeof getPubkey>>;
```

| Property | Type                                 | Description                            |
| -------- | ------------------------------------ | -------------------------------------- |
| `x`      | `&#96;0x${string}&#96; \| undefined` | The x value returned by the operation. |
| `y`      | `&#96;0x${string}&#96; \| undefined` | The y value returned by the operation. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getPubkey.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getPubkey.request(parameters);
```

## Error

```ts
import type { GetPubkeyError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.records.getPubkey`](/sdk/api/records/get-pubkey)
