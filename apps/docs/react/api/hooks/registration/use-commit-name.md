---
title: useCommitName
description: Hook for committing name.
---

# useCommitName

Hook for committing name.

## Import

```tsx
import { useCommitName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCommitName } from "@ensforge/react";

function Component() {
  const mutation = useCommitName();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
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
import type { CommitNameParameters } from "@ensforge/sdk/registration";
```

## Return Type

```ts
type Result = ReturnType<typeof useCommitName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createCommitNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createCommitNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`commitName`](/core/api/actions/registration/commit-name)
- [`sdk.registration.commitName`](/sdk/api/registration/commit-name)
