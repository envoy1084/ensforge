---
title: useNameStatus
description: Hook for fetching name status.
---

# useNameStatus

Hook for fetching name status.

## Import

```tsx
import { useNameStatus } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useNameStatus } from "@ensforge/react";

function Component() {
  const result = useNameStatus({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetNameStateParameters, UseEnsAtomParameters } from "@ensforge/react";
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

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useNameStatus>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getNameStatusAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getNameStatusAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getNameStatus`](/core/api/actions/name/get-name-status)
- [`sdk.name.getNameStatus`](/sdk/api/name/get-name-status)
