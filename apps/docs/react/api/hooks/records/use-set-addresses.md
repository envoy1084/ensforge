---
title: useSetAddresses
description: Hook for setting addresses.
---

# useSetAddresses

Hook for setting addresses.

## Import

```tsx
import { useSetAddresses } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetAddresses } from "@ensforge/react";

function Component() {
  const mutation = useSetAddresses();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          addresses: [],
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
import type { SetAddressesParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetAddresses>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetAddressesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetAddressesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setAddresses`](/core/api/actions/records/set-addresses)
- [`sdk.records.setAddresses`](/sdk/api/records/set-addresses)
