---
title: useTokenApproval
description: Hook for fetching token approval.
---

# useTokenApproval

Hook for fetching token approval.

## Import

```tsx
import { useTokenApproval } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useTokenApproval } from "@ensforge/react";

function Component() {
  const result = useTokenApproval({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { NameCapabilityParameters } from "@ensforge/sdk/capabilities";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useTokenApproval>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useTokenApprovalSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useTokenApprovalSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useTokenApprovalSuspense } from "@ensforge/react";

function Component() {
  const result = useTokenApprovalSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useTokenApprovalSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { NameCapabilityParameters } from "@ensforge/sdk/capabilities";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useTokenApprovalSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getTokenApprovalAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getTokenApprovalAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getTokenApproval`](/core/api/actions/capabilities/get-token-approval)
- [`sdk.capabilities.getTokenApproval`](/sdk/api/capabilities/get-token-approval)
