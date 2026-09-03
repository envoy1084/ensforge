---
title: useEstimateCalls
description: Hook for estimating calls.
---

# useEstimateCalls

Hook for estimating calls.

## Import

```tsx
import { useEstimateCalls } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useEstimateCalls } from "@ensforge/react";

function Component() {
  const result = useEstimateCalls({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { EstimateCallsParameters } from "@ensforge/sdk/batch";
```

### calls

`ReadonlyArray<EnsWriteIntent<unknown, WriteError>>`

Read requests or write intents included in the operation.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this mutation.

### account

`Account | Address | undefined`

Account used to authorize the mutation. Defaults to the active wallet account.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useEstimateCalls>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useEstimateCallsSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useEstimateCallsSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useEstimateCallsSuspense } from "@ensforge/react";

function Component() {
  const result = useEstimateCallsSuspense({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useEstimateCallsSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { EstimateCallsParameters } from "@ensforge/sdk/batch";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useEstimateCallsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { estimateCallsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = estimateCallsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`estimateCalls`](/core/api/actions/batch/estimate-calls)
- [`sdk.batch.estimateCalls`](/sdk/api/batch/estimate-calls)
