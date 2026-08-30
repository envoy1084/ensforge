---
title: useResolveWithResolverSuspense
description: Suspense hook for resolving with resolver.
---

# useResolveWithResolverSuspense

Suspense hook for resolving with resolver.

## Import

```tsx
import { useResolveWithResolverSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResolveWithResolverSuspense } from "@ensforge/react";

function Component() {
  const result = useResolveWithResolverSuspense({
    name: "example.eth",
    data: "0x",
    resolverAddress: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { ResolveWithResolverParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### data

`string`

Raw calldata or record bytes.

### resolverAddress

`string`

Explicit resolver contract.

### gateways

`ReadonlyArray<string> | undefined`

DNS gateway endpoints.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useResolveWithResolverSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { resolveWithResolverAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = resolveWithResolverAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`resolveWithResolver`](/core/api/actions/resolution/resolve-with-resolver)
- [`sdk.resolution.resolveWithResolver`](/sdk/api/resolution/resolve-with-resolver)
