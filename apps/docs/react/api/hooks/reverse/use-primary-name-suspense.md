---
title: usePrimaryNameSuspense
description: Suspense hook for fetching primary name.
---

# usePrimaryNameSuspense

Suspense hook for fetching primary name.

## Import

```tsx
import { usePrimaryNameSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { usePrimaryNameSuspense } from "@ensforge/react";

function Component() {
  const result = usePrimaryNameSuspense({
    address: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetPrimaryNameParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
```

### address

`string`

Address used by the operation.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n`.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

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
type Result = ReturnType<typeof usePrimaryNameSuspense>;
```

Returns `EnsSuspenseAtomResult` with successful `data`, background `isWaiting` state, and `updatedAt`. Pending work suspends rendering and failures are thrown to the nearest error boundary.

## Effect Atom

```ts
import { getPrimaryNameAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getPrimaryNameAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getPrimaryName`](/core/api/actions/reverse/get-primary-name)
- [`sdk.reverse.getPrimaryName`](/sdk/api/reverse/get-primary-name)
