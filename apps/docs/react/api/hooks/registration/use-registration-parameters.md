---
title: useRegistrationParameters
description: Hook for fetching registration parameters.
---

# useRegistrationParameters

Hook for fetching registration parameters.

## Import

```tsx
import { useRegistrationParameters } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRegistrationParameters({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRegistrationParameters>[0];
```

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useRegistrationParameters>;
```

## Effect Atom

```ts
import { getRegistrationParametersAtom } from "@ensforge/react/atoms";

const atom = getRegistrationParametersAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getRegistrationParameters`](/core/api/actions/registration/get-registration-parameters)
- [`sdk.registration.getRegistrationParameters`](/sdk/api/registration/get-registration-parameters)
