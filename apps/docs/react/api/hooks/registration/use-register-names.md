---
title: useRegisterNames
description: Hook for registering names.
---

# useRegisterNames

Hook for registering names.

## Import

```tsx
import { useRegisterNames } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegisterNames } from "@ensforge/react";

function Component() {
  const mutation = useRegisterNames();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          registrations: [],
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
import type { RegisterNamesParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useRegisterNames>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createRegisterNamesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createRegisterNamesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`registerNames`](/core/api/actions/registration/register-names)
- [`sdk.registration.registerNames`](/sdk/api/registration/register-names)
