---
title: getPubkey
description: Gets pubkey for resolver records.
---

# getPubkey

Gets pubkey for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.records.getPubkey({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetPubkeyParameters } from "@ensforge/sdk/records";
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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.records.getPubkey.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.records.getPubkey.request(parameters);
```

## Error

```ts
import type { GetPubkeyError } from "@ensforge/sdk/records";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getPubkey`](/core/api/actions/records/get-pubkey)
