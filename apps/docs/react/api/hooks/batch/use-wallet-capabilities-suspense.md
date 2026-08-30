---
title: useWalletCapabilitiesSuspense
description: Suspense hook for fetching wallet capabilities.
---

# useWalletCapabilitiesSuspense

Suspense hook for fetching wallet capabilities.

## Import

```tsx
import { useWalletCapabilitiesSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useWalletCapabilitiesSuspense } from "@ensforge/react";

function Component() {
  const result = useWalletCapabilitiesSuspense({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsSuspenseAtomParameters } from "@ensforge/react";
import type { GetWalletCapabilitiesParameters } from "@ensforge/sdk/batch";
```

### walletClient

`WalletClient | undefined`

Viem wallet client override for this mutation.

### account

`Account | Address | undefined`

Account used to authorize the mutation. Defaults to the active wallet account.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useWalletCapabilitiesSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getWalletCapabilitiesAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getWalletCapabilitiesAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getWalletCapabilities`](/core/api/actions/batch/get-wallet-capabilities)
- [`sdk.batch.getWalletCapabilities`](/sdk/api/batch/get-wallet-capabilities)
