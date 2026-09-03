---
title: getAddress
description: Gets address for resolver records.
---

# getAddress

Gets address for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.records.getAddress({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="records.getAddress" />

## Parameters

```ts
import type { GetAddressParameters } from "@ensforge/sdk/records";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

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
type GetAddressResult = Awaited<ReturnType<typeof getAddress>>;
```

| Property   | Type                                                         | Description                                               |
| ---------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| `coinType` | `bigint & Brand<"CoinType">`                                 | Normalized SLIP-44 coin type used for the lookup.         |
| `address`  | `string \| null`                                             | Decoded address, or `null` when the record is not set.    |
| `raw`      | `&#96;0x${string}&#96; & Brand<"AddressRecordData"> \| null` | Raw resolver bytes, or `null` when the record is not set. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.records.getAddress.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.records.getAddress.request(parameters);
```

## Error

```ts
import type { GetAddressError } from "@ensforge/sdk/records";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getAddress`](/core/api/actions/records/get-address)
