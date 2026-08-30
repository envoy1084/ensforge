---
title: useSetAddress
description: Hook for setting address.
---

# useSetAddress

Hook for setting address.

## Import

```tsx
import { useSetAddress } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetAddress } from "@ensforge/react";

function Component() {
  const mutation = useSetAddress();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          address: "0x0000000000000000000000000000000000000001",
        })
      }
    >
      Submit
    </button>
  );
}
```

<<< @/snippets/react/provider.tsx

:::

<!--@include: @/shared/react/mutation-options.md-->

## Mutation Parameters

```ts
import type { SetAddressParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetAddress>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetAddressMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetAddressMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setAddress`](/core/api/actions/records/set-address)
- [`sdk.records.setAddress`](/sdk/api/records/set-address)
