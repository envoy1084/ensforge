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
import type { CreateResolverParameters, UseEnsSuspenseQueryParameters } from "@ensforge/react";
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

### query

`EnsQueryOptions | undefined`

Controls caching, retries, polling, and data selection. Suspense queries always execute and do not accept `enabled`.

| Property               | Type                  | Default  | Description                                                      |
| ---------------------- | --------------------- | -------- | ---------------------------------------------------------------- |
| `gcTime`               | `number`              | `300000` | Milliseconds an unused result remains in the cache.              |
| `refetchInterval`      | `false \| number`     | `false`  | Polling interval in milliseconds, or `false` to disable polling. |
| `refetchOnWindowFocus` | `boolean`             | `false`  | Refetch stale data when the document regains focus.              |
| `retry`                | `false \| number`     | `false`  | Number of retries after a typed failure.                         |
| `select`               | `(value) => selected` | identity | Transforms cached action data into the hook's `data` type.       |
| `staleTime`            | `number`              | `30000`  | Milliseconds successful data remains fresh.                      |

See [Query Options](/react/api/query-options) for focused examples.

## Return Type

```ts
type Result = ReturnType<typeof usePredictResolverAddressSuspense>;
```

Returns `EnsSuspenseQueryResult` with successful `data`, background `isFetching` state, and `updatedAt`. Pending work suspends rendering and failures are thrown to the nearest error boundary.

## Effect Atom

```ts
import { predictResolverAddressAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = predictResolverAddressAtom(ens, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`predictResolverAddress`](/core/api/actions/resolution/predict-resolver-address)
- [`sdk.resolution.predictResolverAddress`](/sdk/api/resolution/predict-resolver-address)
