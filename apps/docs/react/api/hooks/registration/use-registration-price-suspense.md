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

::: code-group

```tsx [component.tsx]
import { useRegistrationPriceSuspense } from "@ensforge/react";

function Component() {
  const result = useRegistrationPriceSuspense({
    name: "example.eth",
    duration: 365n * 24n * 60n * 60n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetRegistrationPriceParameters } from "@ensforge/sdk/registration";
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

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRegistrationPriceSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRegistrationPriceAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRegistrationPriceAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getRegistrationPrice`](/core/api/actions/registration/get-registration-price)
- [`sdk.registration.getRegistrationPrice`](/sdk/api/registration/get-registration-price)
