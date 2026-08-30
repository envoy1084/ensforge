---
title: useResolverDelegateApprovalSuspense
description: Suspense hook for fetching resolver delegate approval.
---

# useResolverDelegateApprovalSuspense

Suspense hook for fetching resolver delegate approval.

## Import

```tsx
import { useResolverDelegateApprovalSuspense } from "@ensforge/react";
```

## Usage

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

## Parameters

```ts
type Parameters = Parameters<typeof useResolverDelegateApprovalSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### owner

`EthereumAddress`

Address that should own the name or resource.

### delegate

`EthereumAddress`

Resolver delegate whose permissions are read or changed.

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

Returns `EnsSuspenseAtomResult` with successful data, `isWaiting`, and `updatedAt`. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useResolverDelegateApprovalSuspense>;
```

## Effect Atom

```ts
import { getResolverDelegateApprovalAtom } from "@ensforge/react/atoms";

const atom = getResolverDelegateApprovalAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getResolverDelegateApproval`](/core/api/actions/capabilities/get-resolver-delegate-approval)
- [`sdk.capabilities.getResolverDelegateApproval`](/sdk/api/capabilities/get-resolver-delegate-approval)
