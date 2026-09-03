---
title: useZoneHash
description: Hook for fetching zone hash.
---

# useZoneHash

Hook for fetching zone hash.

## Import

```tsx
import { useZoneHash } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useZoneHash } from "@ensforge/react";

function Component() {
  const result = useZoneHash({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="dns.getZoneHash" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetZoneHashParameters } from "@ensforge/sdk/dns";
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
type Result = ReturnType<typeof useZoneHash>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useZoneHashSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useZoneHashSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useZoneHashSuspense } from "@ensforge/react";

function Component() {
  const result = useZoneHashSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useZoneHashSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetZoneHashParameters } from "@ensforge/sdk/dns";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useZoneHashSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getZoneHashAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getZoneHashAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getZoneHash`](/core/api/actions/dns/get-zone-hash)
- [`sdk.dns.getZoneHash`](/sdk/api/dns/get-zone-hash)
