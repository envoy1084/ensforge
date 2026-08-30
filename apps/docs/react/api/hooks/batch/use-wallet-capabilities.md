---
title: useWalletCapabilities
description: Hook for fetching wallet capabilities.
---

# useWalletCapabilities

Hook for fetching wallet capabilities.

## Import

```tsx
import { useWalletCapabilities } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useWalletCapabilities } from "@ensforge/react";

function Component() {
  const result = useWalletCapabilities({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetWalletCapabilitiesParameters, UseEnsAtomParameters } from "@ensforge/react";
```

### walletClient

`WalletClient | undefined`

Viem wallet client override for this mutation.

### account

`Account | Address | undefined`

Account used to authorize the mutation. Defaults to the active wallet account.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useWalletCapabilities>;
```

<!--@include: @/shared/react/atom-result.md-->

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
