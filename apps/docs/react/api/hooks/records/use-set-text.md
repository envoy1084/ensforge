---
title: useSetText
description: Hook for setting text.
---

# useSetText

Hook for setting text.

## Import

```tsx
import { useSetText } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetText } from "@ensforge/react";

function Component() {
  const mutation = useSetText();

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
import type { SetTextParameters } from "@ensforge/sdk/records";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetText>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetTextMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetTextMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setText`](/core/api/actions/records/set-text)
- [`sdk.records.setText`](/sdk/api/records/set-text)
