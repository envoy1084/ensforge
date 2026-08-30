---
title: usePubkeySuspense
description: Suspense hook for fetching pubkey.
---

# usePubkeySuspense

Suspense hook for fetching pubkey.

## Import

```tsx
import { usePubkeySuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { usePubkeySuspense } from "@ensforge/react";

function Component() {
  const result = usePubkeySuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetPubkeyParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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
type Result = ReturnType<typeof usePubkeySuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getPubkeyAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getPubkeyAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getPubkey`](/core/api/actions/records/get-pubkey)
- [`sdk.records.getPubkey`](/sdk/api/records/get-pubkey)
