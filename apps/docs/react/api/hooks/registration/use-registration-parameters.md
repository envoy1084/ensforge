---
title: useRegistrationParameters
description: Hook for fetching registration parameters.
---

# useRegistrationParameters

Hook for fetching registration parameters.

## Import

```tsx
import { useRegistrationParameters } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegistrationParameters } from "@ensforge/react";

function Component() {
  const result = useRegistrationParameters({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { BlockParameters } from "@ensforge/sdk";
```

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useRegistrationParameters>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getRegistrationParametersAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getRegistrationParametersAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getRegistrationParameters`](/core/api/actions/registration/get-registration-parameters)
- [`sdk.registration.getRegistrationParameters`](/sdk/api/registration/get-registration-parameters)
