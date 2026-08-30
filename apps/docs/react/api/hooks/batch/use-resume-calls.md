---
title: useResumeCalls
description: Hook for resuming calls.
---

# useResumeCalls

Hook for resuming calls.

## Import

```tsx
import { useResumeCalls } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useResumeCalls } from "@ensforge/react";

function Component() {
  const mutation = useResumeCalls();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          batch: {},
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
import type { ResumeCallsParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useResumeCalls>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createResumeCallsMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createResumeCallsMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`resumeCalls`](/core/api/actions/batch/resume-calls)
- [`sdk.batch.resumeCalls`](/sdk/api/batch/resume-calls)
