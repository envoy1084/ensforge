---
title: useSetPubkey
description: Hook for setting pubkey.
---

# useSetPubkey

Hook for setting pubkey.

## Import

```tsx
import { useSetPubkey } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetPubkey } from "@ensforge/react";

function Component() {
  const mutation = useSetPubkey();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          x: "0x0000000000000000000000000000000000000000000000000000000000000001",
          y: "0x0000000000000000000000000000000000000000000000000000000000000002",
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
import type { SetPubkeyParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetPubkey>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetPubkeyMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetPubkeyMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setPubkey`](/core/api/actions/records/set-pubkey)
- [`sdk.records.setPubkey`](/sdk/api/records/set-pubkey)
