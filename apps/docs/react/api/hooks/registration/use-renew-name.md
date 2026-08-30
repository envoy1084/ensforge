---
title: useRenewName
description: Hook for renewing name.
---

# useRenewName

Hook for renewing name.

## Import

```tsx
import { useRenewName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRenewName } from "@ensforge/react";

function Component() {
  const mutation = useRenewName();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          duration: 365n * 24n * 60n * 60n,
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
import type { RenewNameParameters } from "@ensforge/sdk/registration";
```

## Return Type

```ts
type Result = ReturnType<typeof useRenewName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createRenewNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createRenewNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`renewName`](/core/api/actions/registration/renew-name)
- [`sdk.registration.renewName`](/sdk/api/registration/renew-name)
