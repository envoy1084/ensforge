---
title: useSetName
description: Hook for setting name.
---

# useSetName

Hook for setting name.

## Import

```tsx
import { useSetName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetName } from "@ensforge/react";

function Component() {
  const mutation = useSetName();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
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
import type { SetNameParameters } from "@ensforge/sdk/records";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setName`](/core/api/actions/records/set-name)
- [`sdk.records.setName`](/sdk/api/records/set-name)
