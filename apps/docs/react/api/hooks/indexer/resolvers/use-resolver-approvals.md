---
title: useResolverApprovals
description: React hook that lists indexed ENSv2 resolver delegate approvals.
---

# useResolverApprovals

React hook that lists indexed ENSv2 resolver delegate approvals.

## Import

```tsx
import { useResolverApprovals } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResolverApprovals } from "@ensforge/react";

function Component() {
  const result = useResolverApprovals({
    filter: {
      resolver: "0x0000000000000000000000000000000000000000",
      approved: true,
    },
    pageSize: 20,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="indexer.getResolverApprovals" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetResolverApprovalsParametersType } from "@ensforge/sdk/indexer";
```

### filter

<!--@include: @/shared/indexer/v2-approval-filter.md-->

<!--@include: @/shared/indexer/pagination-parameters.md-->

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useResolverApprovals>;
```

Successful `data` has type `GetResolverApprovalsResultType`.

<!--@include: @/shared/indexer/v2-result.md-->

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useResolverApprovalsSuspense` beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useResolverApprovalsSuspense } from "@ensforge/react";
```

### Usage

```tsx
const result = useResolverApprovalsSuspense({
  filter: {
    resolver: "0x0000000000000000000000000000000000000000",
    approved: true,
  },
  pageSize: 20,
});
```

### Parameters

`useResolverApprovalsSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useResolverApprovalsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getResolverApprovalsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getResolverApprovalsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Actions

- [`getResolverApprovals`](/core/api/actions/indexer/resolvers/get-resolver-approvals)
- [`sdk.indexer.getResolverApprovals`](/sdk/api/indexer/resolvers/get-resolver-approvals)
