---
title: useRenewNames
description: Hook for renewing names.
---

# useRenewNames

Hook for renewing names.

## Import

```tsx
import { useRenewNames } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRenewNames } from "@ensforge/react";

function Component() {
  const mutation = useRenewNames();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          renewals: [],
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
import type { RenewNamesParameters } from "@ensforge/sdk/registration";
```

## Return Type

```ts
type Result = ReturnType<typeof useRenewNames>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createRenewNamesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createRenewNamesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`renewNames`](/core/api/actions/registration/renew-names)
- [`sdk.registration.renewNames`](/sdk/api/registration/renew-names)
