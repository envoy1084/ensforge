---
title: useRegistrationPlan
description: Hook for fetching registration plan.
---

# useRegistrationPlan

Hook for fetching registration plan.

## Import

```tsx
import { useRegistrationPlan } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRegistrationPlan({
    name: "example.eth",
    duration: 365n * 24n * 60n * 60n,
    owner: "0x0000000000000000000000000000000000000001",
    secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRegistrationPlan>[0];
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

### owner

`EthereumAddress`

Address that should own the name or resource.

### secret

`Bytes32`

32-byte registration secret.

### resolver

`EthereumAddress | undefined`

Resolver address used by the operation.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this operation.

### records

`ReadonlyArray<Hex> | undefined`

Records selected, read, or written.

### reverseRecord

`0 | 1 | 2 | undefined`

Value used for `reverseRecord` by this operation.

### referrer

`Bytes32 | undefined`

Value used for `referrer` by this operation.

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useRegistrationPlan>;
```

## Effect Atom

```ts
import { getRegistrationPlanAtom } from "@ensforge/react/atoms";

const atom = getRegistrationPlanAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getRegistrationPlan`](/core/api/actions/registration/get-registration-plan)
- [`sdk.registration.getRegistrationPlan`](/sdk/api/registration/get-registration-plan)
