---
title: useOperatorApprovalSuspense
description: Suspense hook for fetching operator approval.
---

# useOperatorApprovalSuspense

Suspense hook for fetching operator approval.

## Import

```tsx
import { useOperatorApprovalSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useOperatorApprovalSuspense } from "@ensforge/react";

function Component() {
  const result = useOperatorApprovalSuspense({
    name: "example.eth",
    owner: "0x0000000000000000000000000000000000000001",
    operator: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetOperatorApprovalParameters } from "@ensforge/sdk/capabilities";
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

### operator

`EthereumAddress`

Operator whose approval is read or changed.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useOperatorApprovalSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getOperatorApprovalAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getOperatorApprovalAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getOperatorApproval`](/core/api/actions/capabilities/get-operator-approval)
- [`sdk.capabilities.getOperatorApproval`](/sdk/api/capabilities/get-operator-approval)
