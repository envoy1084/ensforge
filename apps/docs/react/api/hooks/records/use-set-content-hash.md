---
title: useSetContentHash
description: Hook for setting content hash.
---

# useSetContentHash

Hook for setting content hash.

## Import

```tsx
import { useSetContentHash } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetContentHash } from "@ensforge/react";

function Component() {
  const mutation = useSetContentHash();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          protocol: "ipfs",
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
import type { SetContentHashParameters } from "@ensforge/sdk/records";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetContentHash>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetContentHashMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetContentHashMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setContentHash`](/core/api/actions/records/set-content-hash)
- [`sdk.records.setContentHash`](/sdk/api/records/set-content-hash)
