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
import type { GetOperatorApprovalParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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

### map

`(value: Success) => Mapped | undefined`

Maps successful data for this hook without changing the value stored by the underlying atom.

### atom

`EnsAtomOptions<Failure> | undefined`

Controls retries, refreshes, disposal, and stale-while-revalidate behavior. Suspense hooks always execute and do not accept `enabled`.

| Property          | Type                         | Default       | Description                                     |
| ----------------- | ---------------------------- | ------------- | ----------------------------------------------- |
| `idleTTL`         | `Duration.Input`             | `"5 minutes"` | Retains an unused atom before it is disposed.   |
| `refreshInterval` | `false \| Duration.Input`    | `false`       | Refreshes the atom while it remains subscribed. |
| `retry`           | `false \| Schedule`          | `false`       | Retries typed failures with an Effect schedule. |
| `swr`             | `false \| EnsAtomSwrOptions` | enabled       | Configures stale-while-revalidate behavior.     |

See [Atom Options](/react/api/atom-options) for focused examples.

## Return Type

```ts
type Result = ReturnType<typeof useOperatorApprovalSuspense>;
```

Returns `EnsSuspenseAtomResult` with successful `data`, background `isWaiting` state, and `updatedAt`. Pending work suspends rendering and failures are thrown to the nearest error boundary.

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
