---
title: useEnsEvents
description: Hook for fetching ens events.
---

# useEnsEvents

Hook for fetching ens events.

## Import

```tsx
import { useEnsEvents } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useEnsEvents } from "@ensforge/react";

function Component() {
  const result = useEnsEvents({
    fromBlock: 22_000_000n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetEnsEventsParameters } from "@ensforge/sdk/events";
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

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useEnsEvents>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useEnsEventsSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useEnsEventsSuspense } from "@ensforge/react";
```

### Usage

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

### Parameters

`useEnsEventsSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetEnsEventsParameters } from "@ensforge/sdk/events";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

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
