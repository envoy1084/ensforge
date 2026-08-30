---
title: useSetRecords
description: Hook for setting records.
---

# useSetRecords

Hook for setting records.

## Import

```tsx
import { useSetRecords } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetRecords } from "@ensforge/react";

function Component() {
  const mutation = useSetRecords();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          records: [],
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
import type { SetRecordsParameters } from "@ensforge/sdk/records";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetRecords>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetRecordsMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetRecordsMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setRecords`](/core/api/actions/records/set-records)
- [`sdk.records.setRecords`](/sdk/api/records/set-records)
