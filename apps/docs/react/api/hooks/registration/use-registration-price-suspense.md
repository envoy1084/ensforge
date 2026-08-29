---
title: useRegistrationPriceSuspense
description: Suspense hook for fetching registration price.
---

# useRegistrationPriceSuspense

Suspense hook for fetching registration price.

## Import

```tsx
import { useRegistrationPriceSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRegistrationPriceSuspense({
    name: "example.eth",
    duration: 365n * 24n * 60n * 60n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRegistrationPriceSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### duration

`bigint`

Duration in seconds.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useRegistrationPriceSuspense>;
```

## Effect Atom

```ts
import { getRegistrationPriceAtom } from "@ensforge/react/atoms";

const atom = getRegistrationPriceAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getRegistrationPrice`](/core/api/actions/registration/get-registration-price)
- [`sdk.registration.getRegistrationPrice`](/sdk/api/registration/get-registration-price)
