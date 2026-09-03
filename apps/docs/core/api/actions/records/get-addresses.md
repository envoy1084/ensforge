---
title: getAddresses
description: Gets addresses for ENS resolver records.
---

# getAddresses

Gets addresses for ENS resolver records.

## Import

```ts
import { getAddresses } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getAddresses } from "@ensforge/core";
import { config } from "./config";

const result = await getAddresses(config, {
  name: "example.eth",
  coinTypes: [60n, 0n],
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="records.getAddresses" />

## Parameters

```ts
import type { GetAddressesParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### coinTypes

`ReadonlyArray<bigint>`

SLIP-44 coin types to resolve.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetAddressesResult = Awaited<ReturnType<typeof getAddresses>>;
```

Returns `readonly ({ readonly coinType: bigint & Brand<"CoinType">; readonly address: string; readonly raw: &#96;0x${string}&#96; & Brand<"AddressRecordData">; } | { readonly coinType: bigint & Brand<"CoinType">; readonly address: null; readonly raw: null; })[]`.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getAddresses.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getAddresses.request(parameters);
```

## Error

```ts
import type { GetAddressesError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.records.getAddresses`](/sdk/api/records/get-addresses)
