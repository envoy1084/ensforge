---
title: useRegistrationsForAddress
description: React hook that lists ENS registrations associated with a registrant address.
---

# useRegistrationsForAddress

React hook that lists ENS registrations associated with a registrant address.

## Import

```tsx
import { useRegistrationsForAddress } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegistrationsForAddress } from "@ensforge/react";

function Component() {
  const result = useRegistrationsForAddress({
    address: "0x0000000000000000000000000000000000000000",
    filter: { protocols: ["v1", "v2"] },
    pageSize: 20,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetRegistrationsForAddressParameters } from "@ensforge/sdk/indexer";
```

### address

`0x${string}`

Registrant address to match.

### filter

`{ protocols?, expiryAfter?, expiryBefore? } | undefined`

Narrows matches by protocol or expiry bounds.

### order

`RegistrationOrder | undefined`

Orders by registration time, expiry, or name.

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRegistrationsForAddress>;
```

Successful `data` has type `GetRegistrationsForAddressResult`.

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useRegistrationsForAddressSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useRegistrationsForAddressSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useRegistrationsForAddressSuspense({
  address: "0x0000000000000000000000000000000000000000",
  filter: { protocols: ["v1", "v2"] },
  pageSize: 20,
});
```

### Parameters

`useRegistrationsForAddressSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useRegistrationsForAddressSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRegistrationsForAddressAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRegistrationsForAddressAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getRegistrationsForAddress`](/core/api/actions/indexer/registrations/get-registrations-for-address)
- [`sdk.indexer.getRegistrationsForAddress`](/sdk/api/indexer/registrations/get-registrations-for-address)
