---
title: useWalletCapabilitiesSuspense
description: Suspense hook for fetching wallet capabilities.
---

# useWalletCapabilitiesSuspense

Suspense hook for fetching wallet capabilities.

## Import

```tsx
import { useWalletCapabilitiesSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useWalletCapabilitiesSuspense } from "@ensforge/react";

function Component() {
  const result = useWalletCapabilitiesSuspense({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type {
  GetWalletCapabilitiesParameters,
  UseEnsSuspenseAtomParameters,
} from "@ensforge/react";
```

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
type Result = ReturnType<typeof useWalletCapabilitiesSuspense>;
```

Returns `EnsSuspenseAtomResult` with successful `data`, background `isWaiting` state, and `updatedAt`. Pending work suspends rendering and failures are thrown to the nearest error boundary.

## Effect Atom

```ts
import { getWalletCapabilitiesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getWalletCapabilitiesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getWalletCapabilities`](/core/api/actions/batch/get-wallet-capabilities)
- [`sdk.batch.getWalletCapabilities`](/sdk/api/batch/get-wallet-capabilities)
