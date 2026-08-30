---
title: useClearRecords
description: Hook for clearing records.
---

# useClearRecords

Hook for clearing records.

## Import

```tsx
import { useClearRecords } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useClearRecords } from "@ensforge/react";

function Component() {
  const mutation = useClearRecords();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
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

<!--@include: @/shared/react/mutation-options.md-->

## Mutation Parameters

```ts
import type { ClearRecordsParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useClearRecords>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createClearRecordsMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createClearRecordsMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`clearRecords`](/core/api/actions/records/clear-records)
- [`sdk.records.clearRecords`](/sdk/api/records/clear-records)
