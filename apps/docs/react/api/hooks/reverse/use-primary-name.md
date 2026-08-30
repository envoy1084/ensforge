---
title: usePrimaryName
description: Hook for fetching primary name.
---

# usePrimaryName

Hook for fetching primary name.

## Import

```tsx
import { usePrimaryName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { usePrimaryName } from "@ensforge/react";

function Component() {
  const result = usePrimaryName({
    address: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { GetPrimaryNameParameters } from "@ensforge/sdk/reverse";
```

### address

`string`

Address used by the operation.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n`.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof usePrimaryName>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getPrimaryNameAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getPrimaryNameAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getPrimaryName`](/core/api/actions/reverse/get-primary-name)
- [`sdk.reverse.getPrimaryName`](/sdk/api/reverse/get-primary-name)
