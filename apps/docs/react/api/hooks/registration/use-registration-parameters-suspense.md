---
title: useRegistrationParametersSuspense
description: Suspense hook for fetching registration parameters.
---

# useRegistrationParametersSuspense

Suspense hook for fetching registration parameters.

## Import

```tsx
import { useRegistrationParametersSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRegistrationParametersSuspense({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRegistrationParametersSuspense>[0];
```

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRegistrationParametersAtom } from "@ensforge/react/atoms";

const atom = getRegistrationParametersAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getRegistrationParameters`](/core/api/actions/registration/get-registration-parameters)
- [`sdk.registration.getRegistrationParameters`](/sdk/api/registration/get-registration-parameters)
