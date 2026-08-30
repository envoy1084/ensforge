---
title: useAvatar
description: Hook for fetching avatar.
---

# useAvatar

Hook for fetching avatar.

## Import

```tsx
import { useAvatar } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useAvatar } from "@ensforge/react";

function Component() {
  const result = useAvatar({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetAvatarParameters, UseEnsAtomParameters } from "@ensforge/react";
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

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useAvatar>;
```

<!--@include: @/shared/react/atom-result.md-->

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
