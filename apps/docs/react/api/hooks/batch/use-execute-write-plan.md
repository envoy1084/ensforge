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

```tsx
function Component() {
  const mutation = useExecuteWritePlan();

  return (
    <button
      disabled={mutation.isPending}
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

## Parameters

```ts
type Parameters = Parameters<typeof useExecuteWritePlan>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### plan

`WritePlan`

Staged write plan.

### resume

`WritePlanProgress | undefined`

Previously returned progress used to continue the workflow.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useExecuteWritePlan>;
```

## Effect Atom

```ts
import { createExecuteWritePlanMutationAtom } from "@ensforge/react/atoms";

const atom = createExecuteWritePlanMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`executeWritePlan`](/core/api/actions/batch/execute-write-plan)
- [`sdk.batch.executeWritePlan`](/sdk/api/batch/execute-write-plan)
