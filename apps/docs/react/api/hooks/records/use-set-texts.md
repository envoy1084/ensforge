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
      disabled={mutation.isWaiting}
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

<!--@include: @/shared/react/mutation-options.md-->

## Mutation Parameters

```ts
import type { SetTextsParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetTexts>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetTextsMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetTextsMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setTexts`](/core/api/actions/records/set-texts)
- [`sdk.records.setTexts`](/sdk/api/records/set-texts)
