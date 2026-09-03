---
title: useCommitmentStatus
description: Hook for fetching commitment status.
---

# useCommitmentStatus

Hook for fetching commitment status.

## Import

```tsx
import { useCommitmentStatus } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCommitmentStatus } from "@ensforge/react";

function Component() {
  const result = useCommitmentStatus({
    commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="registration.getCommitmentStatus" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetCommitmentStatusParameters } from "@ensforge/sdk/registration";
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

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useCommitmentStatus>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useCommitmentStatusSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useCommitmentStatusSuspense } from "@ensforge/react";
```

### Usage

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

### Parameters

`useCommitmentStatusSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetCommitmentStatusParameters } from "@ensforge/sdk/registration";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

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
