---
title: usePrepareCalls
description: Hook for preparing calls.
---

# usePrepareCalls

Hook for preparing calls.

## Import

```tsx
import { usePrepareCalls } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { usePrepareCalls } from "@ensforge/react";

function Component() {
  const result = usePrepareCalls({
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
import type { PrepareCallsParameters } from "@ensforge/sdk/batch";
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
type Result = ReturnType<typeof usePrepareCalls>;
```

<!--@include: @/shared/react/atom-result.md-->

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
