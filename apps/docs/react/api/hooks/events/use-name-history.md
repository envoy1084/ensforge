---
title: useNameHistory
description: Hook for fetching name history.
---

# useNameHistory

Hook for fetching name history.

## Import

```tsx
import { useNameHistory } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useNameHistory } from "@ensforge/react";

function Component() {
  const result = useNameHistory({
    name: "example.eth",
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
import type { GetNameHistoryParameters } from "@ensforge/sdk/events";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### fromBlock

`bigint`

First block included in an event query.

### toBlock

`bigint | undefined`

Last block included in an event query.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useNameHistory>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getNameHistoryAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getNameHistoryAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getNameHistory`](/core/api/actions/events/get-name-history)
- [`sdk.events.getNameHistory`](/sdk/api/events/get-name-history)
