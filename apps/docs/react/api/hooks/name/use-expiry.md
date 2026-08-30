---
title: useExpiry
description: Hook for fetching expiry.
---

# useExpiry

Hook for fetching expiry.

## Import

```tsx
import { useExpiry } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useExpiry } from "@ensforge/react";

function Component() {
  const result = useExpiry({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetExpiryParameters, UseEnsAtomParameters } from "@ensforge/react";
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
type Result = ReturnType<typeof useExpiry>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getExpiryAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getExpiryAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getExpiry`](/core/api/actions/name/get-expiry)
- [`sdk.name.getExpiry`](/sdk/api/name/get-expiry)
