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
import type { EstimateCallsParameters, UseEnsAtomParameters } from "@ensforge/react";
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
