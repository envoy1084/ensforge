---
title: useExtendSubnameExpiry
description: Hook for extending subname expiry.
---

# useExtendSubnameExpiry

Hook for extending subname expiry.

## Import

```tsx
import { useExtendSubnameExpiry } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useExtendSubnameExpiry } from "@ensforge/react";

function Component() {
  const mutation = useExtendSubnameExpiry();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          expiry: 2_000_000_000n,
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
import type { ExtendSubnameExpiryParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useExtendSubnameExpiry>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createExtendSubnameExpiryMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createExtendSubnameExpiryMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`extendSubnameExpiry`](/core/api/actions/wrapping/extend-subname-expiry)
- [`sdk.wrapping.extendSubnameExpiry`](/sdk/api/wrapping/extend-subname-expiry)
