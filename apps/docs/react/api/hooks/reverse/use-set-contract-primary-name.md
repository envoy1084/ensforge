---
title: useSetContractPrimaryName
description: Hook for setting contract primary name.
---

# useSetContractPrimaryName

Hook for setting contract primary name.

## Import

```tsx
import { useSetContractPrimaryName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetContractPrimaryName } from "@ensforge/react";

function Component() {
  const mutation = useSetContractPrimaryName();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          contract: "value",
          name: "example.eth",
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

## Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts an optional `EnsMutationOptions` object.

### retry

`false | Schedule<unknown, Failure> | undefined`

An Effect schedule used to retry typed failures. It defaults to `false`. Only retry writes that are known to be safe and idempotent.

### onExit

`(exit: Exit<Success, Failure>, parameters: Parameters) => void`

Receives the complete Effect `Exit` and the exact mutation parameters after execution. Use `Exit.match` or `Exit.isSuccess` to handle both outcomes without losing typed failures.

See [Mutation Options](/react/api/mutation-options) for schedules, provider defaults, and per-call `onExit` handlers.

## Mutation Parameters

```ts
import type { SetContractPrimaryNameParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetContractPrimaryName>;
```

Returns an [`EnsMutationResult`](/react/api/mutation-result).

| Property       | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `mutate`       | Starts the mutation and optionally reports its `Exit`.         |
| `mutateAsync`  | Starts the mutation and returns a Promise.                     |
| `mutateEffect` | Starts the mutation and returns an Effect with typed failures. |
| `data`         | Latest successful value, or `undefined`.                       |
| `error`        | Latest typed failure, an unexpected `Error`, or `null`.        |
| `cause`        | Complete Effect cause for the latest failure.                  |
| `isInitial`    | The mutation has not executed since creation or reset.         |
| `isWaiting`    | The mutation Effect is currently running.                      |
| `isSuccess`    | The latest execution succeeded.                                |
| `isFailure`    | The latest execution failed.                                   |
| `parameters`   | Parameters used by the latest execution.                       |
| `interrupt`    | Interrupts the active Effect.                                  |
| `reset`        | Restores the mutation to its initial state.                    |
| `result`       | Underlying Effect `AsyncResult`.                               |

## Effect Atom

```ts
import { createSetContractPrimaryNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetContractPrimaryNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setContractPrimaryName`](/core/api/actions/reverse/set-contract-primary-name)
- [`sdk.reverse.setContractPrimaryName`](/sdk/api/reverse/set-contract-primary-name)
