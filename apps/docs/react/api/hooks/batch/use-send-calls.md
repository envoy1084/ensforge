---
title: useSendCalls
description: Hook for sending calls.
---

# useSendCalls

Hook for sending calls.

## Import

```tsx
import { useSendCalls } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSendCalls } from "@ensforge/react";

function Component() {
  const mutation = useSendCalls();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          calls: [],
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
import type { SendCallsParameters } from "@ensforge/sdk/batch";
```

## Return Type

```ts
type Result = ReturnType<typeof useSendCalls>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSendCallsMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSendCallsMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`sendCalls`](/core/api/actions/batch/send-calls)
- [`sdk.batch.sendCalls`](/sdk/api/batch/send-calls)
