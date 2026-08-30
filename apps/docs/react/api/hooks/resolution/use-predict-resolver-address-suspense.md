---
title: usePredictResolverAddressSuspense
description: Suspense hook for running predict resolver address.
---

# usePredictResolverAddressSuspense

Suspense hook for running predict resolver address.

## Import

```tsx
import { usePredictResolverAddressSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { usePredictResolverAddressSuspense } from "@ensforge/react";

function Component() {
  const result = usePredictResolverAddressSuspense({
    salt: 1n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { CreateResolverParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
```

### salt

`bigint`

Value used for `salt` by this operation.

### admin

`string | undefined`

Value used for `admin` by this operation.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Value used for `setters` by this operation.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this mutation.

### account

`Account | Address | undefined`

Account used to authorize the mutation. Defaults to the active wallet account.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

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
type Result = ReturnType<typeof usePredictResolverAddressSuspense>;
```

Returns `EnsSuspenseAtomResult` with successful `data`, background `isWaiting` state, and `updatedAt`. Pending work suspends rendering and failures are thrown to the nearest error boundary.

## Effect Atom

```ts
import { predictResolverAddressAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = predictResolverAddressAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`predictResolverAddress`](/core/api/actions/resolution/predict-resolver-address)
- [`sdk.resolution.predictResolverAddress`](/sdk/api/resolution/predict-resolver-address)
