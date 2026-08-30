---
title: getAddress
description: Gets address for ENS resolver records.
---

# getAddress

Gets address for ENS resolver records.

## Import

```ts
import { getAddress } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getAddress } from "@ensforge/core";
import { config } from "./config";

const result = await getAddress(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetAddressParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n` for Ethereum.

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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getAddress.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getAddress.request(parameters);
```

## Error

```ts
import type { GetAddressError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.records.getAddress`](/sdk/api/records/get-address)
