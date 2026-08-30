---
title: useNameCapabilitiesSuspense
description: Suspense hook for fetching name capabilities.
---

# useNameCapabilitiesSuspense

Suspense hook for fetching name capabilities.

## Import

```tsx
import { useNameCapabilitiesSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useNameCapabilitiesSuspense } from "@ensforge/react";

function Component() {
  const result = useNameCapabilitiesSuspense({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetNameCapabilitiesParameters } from "@ensforge/sdk/capabilities";
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

### account

`EthereumAddress`

Account used to authorize the mutation. Defaults to the active wallet account.

### records

`ReadonlyArray<RecordOperation> | undefined`

Records selected, read, or written.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useNameCapabilitiesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getNameCapabilitiesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getNameCapabilitiesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getNameCapabilities`](/core/api/actions/capabilities/get-name-capabilities)
- [`sdk.capabilities.getNameCapabilities`](/sdk/api/capabilities/get-name-capabilities)
