---
title: useWrapperExpirySuspense
description: Suspense hook for fetching wrapper expiry.
---

# useWrapperExpirySuspense

Suspense hook for fetching wrapper expiry.

## Import

```tsx
import { useWrapperExpirySuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useWrapperExpirySuspense } from "@ensforge/react";

function Component() {
  const result = useWrapperExpirySuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { WrapperReadParameters } from "@ensforge/sdk/wrapping";
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

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useWrapperExpirySuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getWrapperExpiryAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getWrapperExpiryAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getWrapperExpiry`](/core/api/actions/wrapping/get-wrapper-expiry)
- [`sdk.wrapping.getWrapperExpiry`](/sdk/api/wrapping/get-wrapper-expiry)
