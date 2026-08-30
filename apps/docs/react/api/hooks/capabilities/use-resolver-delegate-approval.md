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

## Parameters

```ts
import type { GetResolverDelegateApprovalParameters, UseEnsAtomParameters } from "@ensforge/react";
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

### enabled

`boolean | undefined`

Defaults to `true`. Set it to `false` to keep the atom idle without executing the action.

### map

`(value: Success) => Mapped | undefined`

Maps successful data for this hook without changing the value stored by the underlying atom.

### atom

`EnsAtomOptions<Failure> | undefined`

Controls the Effect Atom lifecycle for this hook.

| Property          | Type                         | Default       | Description                                     |
| ----------------- | ---------------------------- | ------------- | ----------------------------------------------- |
| `idleTTL`         | `Duration.Input`             | `"5 minutes"` | Retains an unused atom before it is disposed.   |
| `refreshInterval` | `false \| Duration.Input`    | `false`       | Refreshes the atom while it remains subscribed. |
| `retry`           | `false \| Schedule`          | `false`       | Retries typed failures with an Effect schedule. |
| `swr`             | `false \| EnsAtomSwrOptions` | enabled       | Configures stale-while-revalidate behavior.     |

See [Atom Options](/react/api/atom-options) for focused examples.

## Return Type

```ts
type Result = ReturnType<typeof useResolverDelegateApproval>;
```

Returns an [`EnsAtomResult`](/react/api/atom-result).

| Property        | Description                                             |
| --------------- | ------------------------------------------------------- |
| `data`          | Successful action data, or `undefined` before success.  |
| `error`         | Typed action failure, an unexpected `Error`, or `null`. |
| `cause`         | Complete Effect cause for the latest failure.           |
| `isInitial`     | No execution has completed yet.                         |
| `isWaiting`     | Initial or background work is running.                  |
| `isSuccess`     | The atom contains a successful value.                   |
| `isFailure`     | The atom contains a failed result.                      |
| `refresh`       | Refreshes the atom and returns a Promise.               |
| `refreshEffect` | Refreshes with a typed Effect error channel.            |
| `result`        | Underlying Effect `AsyncResult`.                        |
| `updatedAt`     | Timestamp of the latest successful value.               |

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
