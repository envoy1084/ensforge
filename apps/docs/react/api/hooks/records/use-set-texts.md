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

```tsx
function Component() {
  const mutation = useSetTexts();

  return (
    <button
      disabled={mutation.isPending}
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

## Parameters

```ts
type Parameters = Parameters<typeof useSetTexts>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### name

`string`

ENS name used by the query or mutation.

### texts

`ReadonlyArray<TextRecordInput>`

Value used for `texts` by this operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetTexts>;
```

## Effect Atom

```ts
import { createSetTextsMutationAtom } from "@ensforge/react/atoms";

const atom = createSetTextsMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setTexts`](/core/api/actions/records/set-texts)
- [`sdk.records.setTexts`](/sdk/api/records/set-texts)
