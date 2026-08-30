---
title: getNameHistory
description: Gets name history for ENS events.
---

# getNameHistory

Gets name history for ENS events.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.events.getNameHistory({
  name: "example.eth",
  fromBlock: 22_000_000n,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetNameHistoryParameters } from "@ensforge/sdk/events";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### fromBlock

`bigint`

First block included in an event query.

### toBlock

`bigint | undefined`

Last block included in an event query.

## Return Type

```ts
type GetNameHistoryResult = Awaited<ReturnType<typeof getNameHistory>>;
```

| Property | Type                                                                                                                                                                                                                                                                                                                            | Description                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `name`   | `string & Brand<"NormalizedName">`                                                                                                                                                                                                                                                                                              | Normalized ENS name.                        |
| `events` | `readonly { readonly blockNumber: bigint \| null; readonly transactionHash: &#96;0x${string}&#96; \| null; readonly protocol: "v1" \| "v2"; readonly kind: "records" \| "ownership" \| "resolver" \| "commitment" \| ... 5 more ... \| "other"; ... 15 more ...; readonly commitment?: &#96;0x${string}&#96; \| undefined; }[]` | The events value returned by the operation. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.events.getNameHistory.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetNameHistoryError } from "@ensforge/sdk/events";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getNameHistory`](/core/api/actions/events/get-name-history)
