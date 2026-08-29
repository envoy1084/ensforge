---
title: useRenewalPrice
description: Hook for fetching renewal price.
---

# useRenewalPrice

Hook for fetching renewal price.

## Import

```tsx
import { useRenewalPrice } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRenewalPrice({
    name: "example.eth",
    duration: 365n * 24n * 60n * 60n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRenewalPrice>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useRenewalPrice>;
```

## Effect Atom

```ts
import { getRenewalPriceAtom } from "@ensforge/react/atoms";

const atom = getRenewalPriceAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getRenewalPrice`](/core/api/actions/registration/get-renewal-price)
- [`sdk.registration.getRenewalPrice`](/sdk/api/registration/get-renewal-price)
