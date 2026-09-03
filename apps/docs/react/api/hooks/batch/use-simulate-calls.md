---
title: useSimulateCalls
description: Hook for simulating calls.
---

# useSimulateCalls

Hook for simulating calls.

## Import

```tsx
import { useSimulateCalls } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSimulateCalls } from "@ensforge/react";

function Component() {
  const result = useSimulateCalls({
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
import type { SimulateCallsParameters } from "@ensforge/sdk/batch";
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
type Result = ReturnType<typeof useSimulateCalls>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useSimulateCallsSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useSimulateCallsSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useSimulateCallsSuspense } from "@ensforge/react";

function Component() {
  const result = useSimulateCallsSuspense({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useSimulateCallsSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { SimulateCallsParameters } from "@ensforge/sdk/batch";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useSimulateCallsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { simulateCallsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = simulateCallsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`simulateCalls`](/core/api/actions/batch/simulate-calls)
- [`sdk.batch.simulateCalls`](/sdk/api/batch/simulate-calls)
