---
title: getEnsEvents
description: Gets ens events for ENS events.
---

# getEnsEvents

Gets ens events for ENS events.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.events.getEnsEvents({
  fromBlock: 22_000_000n,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetEnsEventsParameters } from "@ensforge/sdk";
```

### fromBlock

`bigint`

First block included in an event query.

### toBlock

`bigint | undefined`

Last block included in an event query.

### kinds

`ReadonlyArray<EnsEventKind> | undefined`

Value used for `kinds` by this method.

### name

`string | undefined`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### account

`EthereumAddress | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### commitment

`Bytes32 | undefined`

Registration commitment.

## Return Type

```ts
type GetEnsEventsResult = Awaited<ReturnType<typeof getEnsEvents>>;
```

Returns `readonly { readonly blockNumber: bigint | null; readonly transactionHash: &#96;0x${string}&#96; | null; readonly protocol: "v1" | "v2"; readonly kind: "records" | "ownership" | "resolver" | "commitment" | ... 5 more ... | "other"; ... 15 more ...; readonly commitment?: &#96;0x${string}&#96; | undefined; }[]`.

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.events.getEnsEvents.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetEnsEventsError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getEnsEvents`](/core/api/actions/events/get-ens-events)
