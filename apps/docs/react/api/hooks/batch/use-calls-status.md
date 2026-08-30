---
title: useCallsStatus
description: Hook for fetching calls status.
---

# useCallsStatus

Hook for fetching calls status.

## Import

```tsx
import { useCallsStatus } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCallsStatus } from "@ensforge/react";

function Component() {
  const result = useCallsStatus({
    id: "0x1234",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetCallsStatusParameters, UseEnsAtomParameters } from "@ensforge/react";
```

### id

`string`

Submitted wallet batch identifier.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this mutation.

### account

`Account | Address | undefined`

Account used to authorize the mutation. Defaults to the active wallet account.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useCallsStatus>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getCallsStatusAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getCallsStatusAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getCallsStatus`](/core/api/actions/batch/get-calls-status)
- [`sdk.batch.getCallsStatus`](/sdk/api/batch/get-calls-status)
