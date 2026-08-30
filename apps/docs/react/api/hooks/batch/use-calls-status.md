---
title: useCallsStatus
description: Hook for fetching calls status.
---

# useCallsStatus

Hook for fetching calls status.

## Import

```tsx
import { useCallsStatus } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCallsStatus } from "@ensforge/react";

function Component() {
  const result = useCallsStatus({
    id: "0x1234",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetCallsStatusParameters, UseEnsAtomParameters } from "@ensforge/react";
```

### id

`string`

Submitted wallet batch identifier.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this mutation.

### account

`Account | Address | undefined`

Account used to authorize the mutation. Defaults to the active wallet account.

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
type Result = ReturnType<typeof useCallsStatus>;
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
import { getCallsStatusAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getCallsStatusAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getCallsStatus`](/core/api/actions/batch/get-calls-status)
- [`sdk.batch.getCallsStatus`](/sdk/api/batch/get-calls-status)
