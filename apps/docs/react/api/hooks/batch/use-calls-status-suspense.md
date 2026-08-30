---
title: useCallsStatusSuspense
description: Suspense hook for fetching calls status.
---

# useCallsStatusSuspense

Suspense hook for fetching calls status.

## Import

```tsx
import { useCallsStatusSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCallsStatusSuspense } from "@ensforge/react";

function Component() {
  const result = useCallsStatusSuspense({
    id: "0x1234",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetCallsStatusParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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

### map

`(value: Success) => Mapped | undefined`

Maps successful data for this hook without changing the value stored by the underlying atom.

### atom

`EnsAtomOptions<Failure> | undefined`

Controls retries, refreshes, disposal, and stale-while-revalidate behavior. Suspense hooks always execute and do not accept `enabled`.

| Property          | Type                         | Default       | Description                                     |
| ----------------- | ---------------------------- | ------------- | ----------------------------------------------- |
| `idleTTL`         | `Duration.Input`             | `"5 minutes"` | Retains an unused atom before it is disposed.   |
| `refreshInterval` | `false \| Duration.Input`    | `false`       | Refreshes the atom while it remains subscribed. |
| `retry`           | `false \| Schedule`          | `false`       | Retries typed failures with an Effect schedule. |
| `swr`             | `false \| EnsAtomSwrOptions` | enabled       | Configures stale-while-revalidate behavior.     |

See [Atom Options](/react/api/atom-options) for focused examples.

## Return Type

```ts
type Result = ReturnType<typeof useCallsStatusSuspense>;
```

Returns `EnsSuspenseAtomResult` with successful `data`, background `isWaiting` state, and `updatedAt`. Pending work suspends rendering and failures are thrown to the nearest error boundary.

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
