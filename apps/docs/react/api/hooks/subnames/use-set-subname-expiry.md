---
title: useSetSubnameExpiry
description: Hook for setting subname expiry.
---

# useSetSubnameExpiry

Hook for setting subname expiry.

## Import

```tsx
import { useSetSubnameExpiry } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetSubnameExpiry } from "@ensforge/react";

function Component() {
  const mutation = useSetSubnameExpiry();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          expiry: 2_000_000_000n,
          name: "example.eth",
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
import type { SetSubnameExpiryParameters } from "@ensforge/sdk/subnames";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetSubnameExpiry>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetSubnameExpiryMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetSubnameExpiryMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setSubnameExpiry`](/core/api/actions/subnames/set-subname-expiry)
- [`sdk.subnames.setSubnameExpiry`](/sdk/api/subnames/set-subname-expiry)
