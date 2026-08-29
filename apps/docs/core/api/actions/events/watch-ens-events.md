---
title: watchEnsEvents
description: Watches supported contracts and emits normalized ENS events.
---

# watchEnsEvents

Watches supported contracts and emits normalized ENS events.

This action belongs to normalized ENS contract events. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { watchEnsEvents } from "@ensforge/core";
```

## Usage

```ts
import { watchEnsEvents } from "@ensforge/core";
import { config } from "./config";

const unwatch = await watchEnsEvents(
  config,
  { fromBlock: 22_000_000n },
  console.log,
  console.error,
);
```

## Parameters

```ts
type WatchEnsEventsParameters = Parameters<typeof watchEnsEvents>[1];
```

### account

`EthereumAddress | undefined`

Account used for authorization and wallet execution.

### name

`string | undefined`

ENS name used by the operation. It is normalized before contract interaction.

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

`() => void`

## Stream

Use `.stream` to consume the watcher as an Effect stream.

```ts
const stream = watchEnsEvents.stream(config, parameters);
```

## Error

```ts
import type { Stream } from "effect";

type WatchEnsEventsError = Stream.Stream.Error<ReturnType<typeof watchEnsEvents.stream>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
