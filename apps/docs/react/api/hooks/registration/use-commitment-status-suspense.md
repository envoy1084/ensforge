---
title: useCommitmentStatusSuspense
description: Suspense hook for fetching commitment status.
---

# useCommitmentStatusSuspense

Suspense hook for fetching commitment status.

## Import

```tsx
import { useCommitmentStatusSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCommitmentStatusSuspense } from "@ensforge/react";

function Component() {
  const result = useCommitmentStatusSuspense({
    commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetCommitmentStatusParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
```

### commitment

`Bytes32`

Registration commitment.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useCommitmentStatusSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getCommitmentStatusAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getCommitmentStatusAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getCommitmentStatus`](/core/api/actions/registration/get-commitment-status)
- [`sdk.registration.getCommitmentStatus`](/sdk/api/registration/get-commitment-status)
