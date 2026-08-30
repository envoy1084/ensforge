---
title: useRequiredAuthorizationSuspense
description: Suspense hook for fetching required authorization.
---

# useRequiredAuthorizationSuspense

Suspense hook for fetching required authorization.

## Import

```tsx
import { useRequiredAuthorizationSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRequiredAuthorizationSuspense } from "@ensforge/react";

function Component() {
  const result = useRequiredAuthorizationSuspense({
    name: "example.eth",
    account: {},
    operation: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetRequiredAuthorizationParameters } from "@ensforge/sdk/capabilities";
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

### operation

`WriteOperation`

Value used for `operation` by this operation.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRequiredAuthorizationSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getRequiredAuthorizationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRequiredAuthorizationAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getRequiredAuthorization`](/core/api/actions/capabilities/get-required-authorization)
- [`sdk.capabilities.getRequiredAuthorization`](/sdk/api/capabilities/get-required-authorization)
