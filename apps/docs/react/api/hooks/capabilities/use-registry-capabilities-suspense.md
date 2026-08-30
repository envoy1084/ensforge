---
title: useRegistryCapabilitiesSuspense
description: Suspense hook for fetching registry capabilities.
---

# useRegistryCapabilitiesSuspense

Suspense hook for fetching registry capabilities.

## Import

```tsx
import { useRegistryCapabilitiesSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegistryCapabilitiesSuspense } from "@ensforge/react";

function Component() {
  const result = useRegistryCapabilitiesSuspense({
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
type Result = ReturnType<typeof useRegistryCapabilitiesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRegistryCapabilitiesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRegistryCapabilitiesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getRegistryCapabilities`](/core/api/actions/capabilities/get-registry-capabilities)
- [`sdk.capabilities.getRegistryCapabilities`](/sdk/api/capabilities/get-registry-capabilities)
