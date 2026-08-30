---
title: useSetResolverAndRecords
description: Hook for setting resolver and records.
---

# useSetResolverAndRecords

Hook for setting resolver and records.

## Import

```tsx
import { useSetResolverAndRecords } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetResolverAndRecords } from "@ensforge/react";

function Component() {
  const mutation = useSetResolverAndRecords();

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
import type { SetResolverAndRecordsParameters } from "@ensforge/sdk/resolution";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetResolverAndRecords>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetResolverAndRecordsMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetResolverAndRecordsMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setResolverAndRecords`](/core/api/actions/resolution/set-resolver-and-records)
- [`sdk.resolution.setResolverAndRecords`](/sdk/api/resolution/set-resolver-and-records)
