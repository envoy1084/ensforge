---
title: getEnsEvents
description: Gets ens events for normalized ENS contract events.
---

# getEnsEvents

Gets ens events for normalized ENS contract events.

## Import

```ts
import { getEnsEvents } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getEnsEvents } from "@ensforge/core";
import { config } from "./config";

const result = await getEnsEvents(config, {
  fromBlock: 22_000_000n,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetEnsEventsParameters } from "@ensforge/core";
```

### fromBlock

`bigint`

First block included in the event query.

### toBlock

`bigint | undefined`

Last block included in the event query.

### kinds

`ReadonlyArray<EnsEventKind> | undefined`

Event categories included in the query or watcher.

### name

`string | undefined`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### account

`EthereumAddress | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### commitment

`Bytes32 | undefined`

Registration commitment to submit or inspect.

## Return Type

```ts
type GetEnsEventsResult = Awaited<ReturnType<typeof getEnsEvents>>;
```

Returns `readonly { readonly blockNumber: bigint | null; readonly transactionHash: &#96;0x${string}&#96; | null; readonly protocol: "v1" | "v2"; readonly kind: "records" | "ownership" | "resolver" | "commitment" | ... 5 more ... | "other"; ... 15 more ...; readonly commitment?: &#96;0x${string}&#96; | undefined; }[]`.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getEnsEvents.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetEnsEventsError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.events.getEnsEvents`](/sdk/api/events/get-ens-events)
