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

::: code-group

```tsx [component.tsx]
import { useRenewalPrice } from "@ensforge/react";

function Component() {
  const result = useRenewalPrice({
    name: "example.eth",
    duration: 365n * 24n * 60n * 60n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="registration.getRenewalPrice" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetRenewalPriceParameters } from "@ensforge/sdk/registration";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### duration

`bigint`

Duration in seconds.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRenewalPrice>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useRenewalPriceSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useRenewalPriceSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useRenewalPriceSuspense } from "@ensforge/react";

function Component() {
  const result = useRenewalPriceSuspense({
    name: "example.eth",
    duration: 365n * 24n * 60n * 60n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useRenewalPriceSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetRenewalPriceParameters } from "@ensforge/sdk/registration";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useRenewalPriceSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRenewalPriceAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRenewalPriceAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getRenewalPrice`](/core/api/actions/registration/get-renewal-price)
- [`sdk.registration.getRenewalPrice`](/sdk/api/registration/get-renewal-price)
