---
title: usePredictResolverAddress
description: Hook for running predict resolver address.
---

# usePredictResolverAddress

Hook for running predict resolver address.

## Import

```tsx
import { usePredictResolverAddress } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { usePredictResolverAddress } from "@ensforge/react";

function Component() {
  const result = usePredictResolverAddress({
    salt: 1n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { CreateResolverParameters, UseEnsAtomParameters } from "@ensforge/react";
```

### salt

`bigint`

Value used for `salt` by this operation.

### admin

`string | undefined`

Value used for `admin` by this operation.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Value used for `setters` by this operation.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this mutation.

### account

`Account | Address | undefined`

Account used to authorize the mutation. Defaults to the active wallet account.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof usePredictResolverAddress>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { predictResolverAddressAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = predictResolverAddressAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`predictResolverAddress`](/core/api/actions/resolution/predict-resolver-address)
- [`sdk.resolution.predictResolverAddress`](/sdk/api/resolution/predict-resolver-address)
