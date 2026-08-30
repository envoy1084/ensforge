---
title: watchEnsEvents
description: Watches supported contracts and emits normalized ENS events.
---

# watchEnsEvents

Watches supported contracts and emits normalized ENS events.

## Import

```ts
import { watchEnsEvents } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { watchEnsEvents } from "@ensforge/core";
import { config } from "./config";

const unwatch = await watchEnsEvents(
  config,
  { fromBlock: 22_000_000n },
  console.log,
  console.error,
);
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { WatchEnsEventsParameters } from "@ensforge/core";
```

### account

`EthereumAddress | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### name

`string | undefined`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### commitment

`Bytes32 | undefined`

Registration commitment to submit or inspect.

### kinds

`ReadonlyArray<EnsEventKind> | undefined`

Event categories included in the query or watcher.

### fromBlock

`bigint | undefined`

First block included in the event query.

### pollingInterval

`number | undefined`

Polling interval in milliseconds.

## Return Type

```ts
type WatchEnsEventsResult = Awaited<ReturnType<typeof watchEnsEvents>>;
```

Returns `() => void`.

## Stream

Use `.stream` to consume events as an Effect stream with typed failures and interruption.

```ts
const stream = watchEnsEvents.stream(parameters);
```

## Error

```ts
import type { WatchEnsEventsError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.events.watchEnsEvents`](/sdk/api/events/watch-ens-events)
