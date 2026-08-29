---
title: watchEnsEvents
description: Watches supported contracts and emits normalized ENS events.
---

# watchEnsEvents

Watches supported contracts and emits normalized ENS events.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const unwatch = await sdk.events.watchEnsEvents(
  { fromBlock: 22_000_000n },
  console.log,
  console.error,
);
```

## Parameters

```ts
type WatchEnsEventsParameters = Parameters<typeof sdk.events.watchEnsEvents>[0];
```

### account

`EthereumAddress | undefined`

Account used for authorization and execution.

### name

`string | undefined`

ENS name used by the method. It is normalized before contract interaction.

### commitment

`Bytes32 | undefined`

Registration commitment.

### kinds

`ReadonlyArray<EnsEventKind> | undefined`

Value used for `kinds` by this method.

### fromBlock

`bigint | undefined`

First block included in an event query.

### pollingInterval

`number | undefined`

Polling interval in milliseconds.

## Return Type

```ts
type WatchEnsEventsResult = Awaited<ReturnType<typeof sdk.events.watchEnsEvents>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Stream

The bound method retains the Effect stream interface.

```ts
const stream = sdk.events.watchEnsEvents.stream(parameters);
```

## Action

- [`watchEnsEvents`](/core/api/actions/events/watch-ens-events)
