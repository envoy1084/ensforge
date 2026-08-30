---
title: useCompleteRegistration
description: Hook for completing registration.
---

# useCompleteRegistration

Hook for completing registration.

## Import

```tsx
import { useCompleteRegistration } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCompleteRegistration } from "@ensforge/react";

function Component() {
  const mutation = useCompleteRegistration();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          owner: "0x0000000000000000000000000000000000000001",
          duration: 365n * 24n * 60n * 60n,
          secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
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
import type { CompleteRegistrationParameters } from "@ensforge/sdk/registration";
```

## Return Type

```ts
type Result = ReturnType<typeof useCompleteRegistration>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createCompleteRegistrationMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createCompleteRegistrationMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`completeRegistration`](/core/api/actions/registration/complete-registration)
- [`sdk.registration.completeRegistration`](/sdk/api/registration/complete-registration)
