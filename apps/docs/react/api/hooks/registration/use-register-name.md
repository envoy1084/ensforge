---
title: useRegisterName
description: Hook for registering name.
---

# useRegisterName

Hook for registering name.

## Import

```tsx
import { useRegisterName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRegisterName } from "@ensforge/react";

function Component() {
  const mutation = useRegisterName();

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
import type { RegisterNameParameters } from "@ensforge/sdk/registration";
```

## Return Type

```ts
type Result = ReturnType<typeof useRegisterName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createRegisterNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createRegisterNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`registerName`](/core/api/actions/registration/register-name)
- [`sdk.registration.registerName`](/sdk/api/registration/register-name)
