---
title: useSetData
description: Hook for setting data.
---

# useSetData

Hook for setting data.

## Import

```tsx
import { useSetData } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetData } from "@ensforge/react";

function Component() {
  const mutation = useSetData();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          key: "url",
          value: "https://example.com",
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
import type { SetDataParameters } from "@ensforge/sdk/records";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetData>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetDataMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetDataMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setData`](/core/api/actions/records/set-data)
- [`sdk.records.setData`](/sdk/api/records/set-data)
