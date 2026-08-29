---
title: useSetTexts
description: Hook for setting texts.
---

# useSetTexts

Hook for setting texts.

## Import

```tsx
import { useSetTexts } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetTexts } from "@ensforge/react";

function Component() {
  const mutation = useSetTexts();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          texts: [],
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

The hook accepts an optional callbacks object.

### retry

`false | number | undefined`

Number of times to retry a failed mutation. It defaults to `false`; only retry operations known to be safe and idempotent.

### onSuccess

Called with the successful result and mutation parameters.

### onError

Called with the typed action error and mutation parameters.

### onSettled

Called after success or failure with the result, error, and mutation parameters.

See [Mutation Options](/react/api/mutation-options) for callback signatures and per-call callbacks.

## Mutation Parameters

```ts
import type { SetTextsParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetTexts>;
```

Returns an [`EnsMutationResult`](/react/api/mutation-result).

| Property       | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `mutate`       | Starts the mutation and reports through callbacks.             |
| `mutateAsync`  | Starts the mutation and returns a Promise.                     |
| `mutateEffect` | Starts the mutation and returns an Effect with typed failures. |
| `data`         | Latest successful value, or `undefined`.                       |
| `error`        | Latest typed failure, an unexpected `Error`, or `null`.        |
| `status`       | `"idle"`, `"pending"`, `"success"`, or `"error"`.              |
| `parameters`   | Parameters used by the latest execution.                       |
| `interrupt`    | Interrupts the active Effect.                                  |
| `reset`        | Restores the mutation to its idle state.                       |
| `result`       | Underlying Effect `AsyncResult`.                               |

## Effect Atom

```ts
import { createSetTextsMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetTextsMutationAtom(ens);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setTexts`](/core/api/actions/records/set-texts)
- [`sdk.records.setTexts`](/sdk/api/records/set-texts)
