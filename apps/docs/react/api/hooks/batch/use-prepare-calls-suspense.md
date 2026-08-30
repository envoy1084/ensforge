---
title: usePrepareCallsSuspense
description: Suspense hook for preparing calls.
---

# usePrepareCallsSuspense

Suspense hook for preparing calls.

## Import

```tsx
import { usePrepareCallsSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { usePrepareCallsSuspense } from "@ensforge/react";

function Component() {
  const result = usePrepareCallsSuspense({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { PrepareCallsParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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
type Result = ReturnType<typeof usePrepareCallsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { prepareCallsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = prepareCallsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`prepareCalls`](/core/api/actions/batch/prepare-calls)
- [`sdk.batch.prepareCalls`](/sdk/api/batch/prepare-calls)
