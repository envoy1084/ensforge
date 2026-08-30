---
title: useSimulateCallsSuspense
description: Suspense hook for simulating calls.
---

# useSimulateCallsSuspense

Suspense hook for simulating calls.

## Import

```tsx
import { useSimulateCallsSuspense } from "@ensforge/react";
```

## Usage

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

## Parameters

```ts
import type { SimulateCallsParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

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
