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

```ts
import { sdk } from "./sdk";

const result = await sdk.events.getEnsEvents({
  fromBlock: 22_000_000n,
});
```

## Parameters

```ts
type GetEnsEventsParameters = Parameters<typeof sdk.events.getEnsEvents>[0];
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

ENS name used by the method. It is normalized before contract interaction.

### account

`EthereumAddress | undefined`

Account used for authorization and execution.

### commitment

`Bytes32 | undefined`

Registration commitment.

## Return Type

```ts
type GetEnsEventsResult = Awaited<ReturnType<typeof sdk.events.getEnsEvents>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.events.getEnsEvents.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`getEnsEvents`](/core/api/actions/events/get-ens-events)
