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

### enabled

`boolean | undefined`

Defaults to `true`. Set it to `false` to keep the atom idle without executing the action.

### map

`(value: Success) => Mapped | undefined`

Maps successful data for this hook without changing the value stored by the underlying atom.

### atom

`EnsAtomOptions<Failure> | undefined`

Controls the Effect Atom lifecycle for this hook.

| Property          | Type                         | Default       | Description                                     |
| ----------------- | ---------------------------- | ------------- | ----------------------------------------------- |
| `idleTTL`         | `Duration.Input`             | `"5 minutes"` | Retains an unused atom before it is disposed.   |
| `refreshInterval` | `false \| Duration.Input`    | `false`       | Refreshes the atom while it remains subscribed. |
| `retry`           | `false \| Schedule`          | `false`       | Retries typed failures with an Effect schedule. |
| `swr`             | `false \| EnsAtomSwrOptions` | enabled       | Configures stale-while-revalidate behavior.     |

See [Atom Options](/react/api/atom-options) for focused examples.

## Return Type

```ts
type Result = ReturnType<typeof useWatchEnsEvents>;
```

Returns an [`EnsAtomResult`](/react/api/atom-result).

| Property        | Description                                             |
| --------------- | ------------------------------------------------------- |
| `data`          | Successful action data, or `undefined` before success.  |
| `error`         | Typed action failure, an unexpected `Error`, or `null`. |
| `cause`         | Complete Effect cause for the latest failure.           |
| `isInitial`     | No execution has completed yet.                         |
| `isWaiting`     | Initial or background work is running.                  |
| `isSuccess`     | The atom contains a successful value.                   |
| `isFailure`     | The atom contains a failed result.                      |
| `refresh`       | Refreshes the atom and returns a Promise.               |
| `refreshEffect` | Refreshes with a typed Effect error channel.            |
| `result`        | Underlying Effect `AsyncResult`.                        |
| `updatedAt`     | Timestamp of the latest successful value.               |

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
