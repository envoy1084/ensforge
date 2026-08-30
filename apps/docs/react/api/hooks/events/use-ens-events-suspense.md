---
title: useEnsEventsSuspense
description: Suspense hook for fetching ens events.
---

# useEnsEventsSuspense

Suspense hook for fetching ens events.

## Import

```tsx
import { useEnsEventsSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useEnsEventsSuspense } from "@ensforge/react";

function Component() {
  const result = useEnsEventsSuspense({
    fromBlock: 22_000_000n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetEnsEventsParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
```

### fromBlock

`bigint`

First block included in an event query.

### toBlock

`bigint | undefined`

Last block included in an event query.

### kinds

`ReadonlyArray<EnsEventKind> | undefined`

Value used for `kinds` by this operation.

### name

`string | undefined`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### account

`EthereumAddress | undefined`

Account used to authorize the mutation. Defaults to the active wallet account.

### commitment

`Bytes32 | undefined`

Registration commitment.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useEnsEventsSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getEnsEventsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getEnsEventsAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getEnsEvents`](/core/api/actions/events/get-ens-events)
- [`sdk.events.getEnsEvents`](/sdk/api/events/get-ens-events)
