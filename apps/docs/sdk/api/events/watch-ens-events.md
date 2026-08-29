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

::: code-group

```ts [index.ts]
import { ens } from "./client";

const unwatch = await ens.events.watchEnsEvents(
  { fromBlock: 22_000_000n },
  console.log,
  console.error,
);
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { WatchEnsEventsParameters } from "@ensforge/sdk";
```

### account

`EthereumAddress | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### name

`string | undefined`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

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
type WatchEnsEventsResult = Awaited<ReturnType<typeof watchEnsEvents>>;
```

Returns `() => void`.

## Stream

Use `.stream` to consume events as an Effect stream with typed failures and interruption.

```ts
const stream = ens.events.watchEnsEvents.stream(parameters);
```

## Error

```ts
import type { WatchEnsEventsError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`watchEnsEvents`](/core/api/actions/events/watch-ens-events)
