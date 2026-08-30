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
import type { GetRegistrationPriceParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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

### map

`(value: Success) => Mapped | undefined`

Maps successful data for this hook without changing the value stored by the underlying atom.

### atom

`EnsAtomOptions<Failure> | undefined`

Controls retries, refreshes, disposal, and stale-while-revalidate behavior. Suspense hooks always execute and do not accept `enabled`.

| Property          | Type                         | Default       | Description                                     |
| ----------------- | ---------------------------- | ------------- | ----------------------------------------------- |
| `idleTTL`         | `Duration.Input`             | `"5 minutes"` | Retains an unused atom before it is disposed.   |
| `refreshInterval` | `false \| Duration.Input`    | `false`       | Refreshes the atom while it remains subscribed. |
| `retry`           | `false \| Schedule`          | `false`       | Retries typed failures with an Effect schedule. |
| `swr`             | `false \| EnsAtomSwrOptions` | enabled       | Configures stale-while-revalidate behavior.     |

See [Atom Options](/react/api/atom-options) for focused examples.

## Return Type

```ts
type Result = ReturnType<typeof useRegistrationPriceSuspense>;
```

Returns `EnsSuspenseAtomResult` with successful `data`, background `isWaiting` state, and `updatedAt`. Pending work suspends rendering and failures are thrown to the nearest error boundary.

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
