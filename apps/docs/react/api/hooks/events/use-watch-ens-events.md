---
title: useWatchEnsEvents
description: Hook for watching ens events.
---

# useWatchEnsEvents

Hook for watching ens events.

## Import

```tsx
import { useWatchEnsEvents } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useWatchEnsEvents } from "@ensforge/react";

function Component() {
  const result = useWatchEnsEvents({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { WatchEnsEventsParameters, UseEnsAtomParameters } from "@ensforge/react";
```

### account

`EthereumAddress | undefined`

Account used to authorize the mutation. Defaults to the active wallet account.

### name

`string | undefined`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### commitment

`Bytes32 | undefined`

Registration commitment.

### kinds

`ReadonlyArray<EnsEventKind> | undefined`

Value used for `kinds` by this operation.

### fromBlock

`bigint | undefined`

First block included in an event query.

### pollingInterval

`number | undefined`

Polling interval in milliseconds.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useWatchEnsEvents>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { watchEnsEventsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = watchEnsEventsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`watchEnsEvents`](/core/api/actions/events/watch-ens-events)
- [`sdk.events.watchEnsEvents`](/sdk/api/events/watch-ens-events)
