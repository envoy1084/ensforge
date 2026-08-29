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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getAddresses.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getAddresses.request(parameters);
```

## Error

```ts
import type { GetAddressesError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.records.getAddresses`](/sdk/api/records/get-addresses)
