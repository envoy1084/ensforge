---
title: getAddresses
description: Gets addresses for resolver records.
---

# getAddresses

Gets addresses for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.records.getAddresses({
  name: "example.eth",
  coinTypes: [60n],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetAddressesParameters } from "@ensforge/sdk";
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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.records.getAddresses.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = sdk.records.getAddresses.request(parameters);
```

## Error

```ts
import type { GetAddressesError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getAddresses`](/core/api/actions/records/get-addresses)
