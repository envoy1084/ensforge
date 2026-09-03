---
title: useNameRecord
description: Hook for fetching name.
---

# useNameRecord

Hook for fetching name.

## Import

```tsx
import { useNameRecord } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useNameRecord } from "@ensforge/react";

function Component() {
  const result = useNameRecord({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="records.getName" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetNameParameters } from "@ensforge/sdk/records";
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
type Result = ReturnType<typeof useNameRecord>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useNameRecordSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useNameRecordSuspense } from "@ensforge/react";
```

### Usage

::: code-group

```tsx [component.tsx]
import { useNameRecordSuspense } from "@ensforge/react";

function Component() {
  const result = useNameRecordSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

### Parameters

`useNameRecordSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetNameParameters } from "@ensforge/sdk/records";
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

```ts
type Result = ReturnType<typeof useNameRecordSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getNameAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getNameAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getName`](/core/api/actions/records/get-name)
- [`sdk.records.getName`](/sdk/api/records/get-name)
