---
title: useExecuteWritePlan
description: Hook for executing write plan.
---

# useExecuteWritePlan

Hook for executing write plan.

## Import

```tsx
import { useExecuteWritePlan } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useExecuteWritePlan } from "@ensforge/react";

function Component() {
  const mutation = useExecuteWritePlan();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          plan: { id: "profile", stages: [] },
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
import type { ExecuteWritePlanParameters } from "@ensforge/sdk/batch";
```

## Return Type

```ts
type Result = ReturnType<typeof useExecuteWritePlan>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createExecuteWritePlanMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createExecuteWritePlanMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`executeWritePlan`](/core/api/actions/batch/execute-write-plan)
- [`sdk.batch.executeWritePlan`](/sdk/api/batch/execute-write-plan)
