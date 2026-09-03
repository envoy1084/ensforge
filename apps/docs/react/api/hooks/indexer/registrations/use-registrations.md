---
title: useRegistrations
description: React hook that lists ENS registrations across protocol versions.
---

# useRegistrations

React hook that lists ENS registrations across protocol versions.

## Import

```tsx
import { useRegistrations } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegistrations } from "@ensforge/react";

function Component() {
  const result = useRegistrations({
    filter: { protocols: ["v1", "v2"] },
    order: { field: "expiry", direction: "asc" },
    pageSize: 20,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="indexer.getRegistrations" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetRegistrationsParametersType } from "@ensforge/sdk/indexer";
```

### filter

<!--@include: @/shared/indexer/registration-filter.md-->

### order

`RegistrationOrder | undefined`

Orders by `registeredAt`, `expiry`, or `name`. Defaults to newest registration first.

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRegistrations>;
```

Successful `data` has type `GetRegistrationsResultType`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useRegistrationsSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useRegistrationsSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useRegistrationsSuspense({
  filter: { protocols: ["v1", "v2"] },
  order: { field: "expiry", direction: "asc" },
  pageSize: 20,
});
```

### Parameters

`useRegistrationsSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useRegistrationsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRegistrationsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRegistrationsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getRegistrations`](/core/api/actions/indexer/registrations/get-registrations)
- [`sdk.indexer.getRegistrations`](/sdk/api/indexer/registrations/get-registrations)
