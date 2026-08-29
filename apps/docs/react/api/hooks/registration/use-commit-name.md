---
title: useCommitName
description: Hook for committing name.
---

# useCommitName

Hook for committing name.

## Import

```tsx
import { useCommitName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useCommitName();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
        })
      }
    >
      Submit
    </button>
  );
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useCommitName>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### commitment

`Bytes32`

Registration commitment.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useCommitName>;
```

## Effect Atom

```ts
import { createCommitNameMutationAtom } from "@ensforge/react/atoms";

const atom = createCommitNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`commitName`](/core/api/actions/registration/commit-name)
- [`sdk.registration.commitName`](/sdk/api/registration/commit-name)
