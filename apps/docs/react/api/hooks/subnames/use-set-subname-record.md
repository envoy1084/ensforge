---
title: useSetSubnameRecord
description: Hook for setting subname record.
---

# useSetSubnameRecord

Hook for setting subname record.

## Import

```tsx
import { useSetSubnameRecord } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetSubnameRecord } from "@ensforge/react";

function Component() {
  const mutation = useSetSubnameRecord();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          owner: "0x0000000000000000000000000000000000000001",
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
import type { SetSubnameRecordParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetSubnameRecord>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetSubnameRecordMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetSubnameRecordMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setSubnameRecord`](/core/api/actions/subnames/set-subname-record)
- [`sdk.subnames.setSubnameRecord`](/sdk/api/subnames/set-subname-record)
