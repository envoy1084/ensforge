---
title: useResolverCapabilitiesSuspense
description: Suspense hook for fetching resolver capabilities.
---

# useResolverCapabilitiesSuspense

Suspense hook for fetching resolver capabilities.

## Import

```tsx
import { useResolverCapabilitiesSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResolverCapabilitiesSuspense } from "@ensforge/react";

function Component() {
  const result = useResolverCapabilitiesSuspense({
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
import type { NameCapabilityParameters } from "@ensforge/sdk/capabilities";
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
type Result = ReturnType<typeof useResolverCapabilitiesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getResolverCapabilitiesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getResolverCapabilitiesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getResolverCapabilities`](/core/api/actions/capabilities/get-resolver-capabilities)
- [`sdk.capabilities.getResolverCapabilities`](/sdk/api/capabilities/get-resolver-capabilities)
