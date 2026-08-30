---
title: useRegistrationPlanSuspense
description: Suspense hook for fetching registration plan.
---

# useRegistrationPlanSuspense

Suspense hook for fetching registration plan.

## Import

```tsx
import { useRegistrationPlanSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegistrationPlanSuspense } from "@ensforge/react";

function Component() {
  const result = useRegistrationPlanSuspense({
    name: "example.eth",
    duration: 365n * 24n * 60n * 60n,
    owner: "0x0000000000000000000000000000000000000001",
    secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetRegistrationPlanParameters } from "@ensforge/sdk/registration";
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

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRegistrationPlanSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRegistrationPlanAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRegistrationPlanAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getRegistrationPlan`](/core/api/actions/registration/get-registration-plan)
- [`sdk.registration.getRegistrationPlan`](/sdk/api/registration/get-registration-plan)
