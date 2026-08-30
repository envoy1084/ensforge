---
title: useRegistryCapabilities
description: Hook for fetching registry capabilities.
---

# useRegistryCapabilities

Hook for fetching registry capabilities.

## Import

```tsx
import { useRegistryCapabilities } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegistryCapabilities } from "@ensforge/react";

function Component() {
  const result = useRegistryCapabilities({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
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

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRegistryCapabilities>;
```

<!--@include: @/shared/react/atom-result.md-->

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
