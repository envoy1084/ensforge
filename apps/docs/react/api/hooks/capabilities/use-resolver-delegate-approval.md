---
title: useResolverDelegateApproval
description: Hook for fetching resolver delegate approval.
---

# useResolverDelegateApproval

Hook for fetching resolver delegate approval.

## Import

```tsx
import { useResolverDelegateApproval } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResolverDelegateApproval } from "@ensforge/react";

function Component() {
  const result = useResolverDelegateApproval({
    name: "example.eth",
    owner: "0x0000000000000000000000000000000000000001",
    delegate: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="capabilities.getResolverDelegateApproval" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetResolverDelegateApprovalParameters } from "@ensforge/sdk/capabilities";
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

### owner

`EthereumAddress`

Address that should own the name or resource.

### delegate

`EthereumAddress`

Resolver delegate whose permissions are read or changed.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useResolverDelegateApproval>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useResolverDelegateApprovalSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useResolverDelegateApprovalSuspense } from "@ensforge/react";
```

### Usage

```tsx
function Component() {
  const result = useResolverDelegateApprovalSuspense({
    name: "example.eth",
    owner: "0x0000000000000000000000000000000000000001",
    delegate: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

### Parameters

`useResolverDelegateApprovalSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
type Parameters = Parameters<typeof useResolverDelegateApprovalSuspense>[0];
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getResolverDelegateApprovalAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getResolverDelegateApprovalAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getResolverDelegateApproval`](/core/api/actions/capabilities/get-resolver-delegate-approval)
- [`sdk.capabilities.getResolverDelegateApproval`](/sdk/api/capabilities/get-resolver-delegate-approval)
