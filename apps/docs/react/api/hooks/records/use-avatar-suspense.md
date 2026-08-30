---
title: useAvatarSuspense
description: Suspense hook for fetching avatar.
---

# useAvatarSuspense

Suspense hook for fetching avatar.

## Import

```tsx
import { useAvatarSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useAvatarSuspense } from "@ensforge/react";

function Component() {
  const result = useAvatarSuspense({
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
import type { GetAvatarParameters } from "@ensforge/sdk/records";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### gatewayUrls

`AssetGatewayUrls | undefined`

Value used for `gatewayUrls` by this operation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useAvatarSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getAvatarAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getAvatarAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getAvatar`](/core/api/actions/records/get-avatar)
- [`sdk.records.getAvatar`](/sdk/api/records/get-avatar)
