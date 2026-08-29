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

```tsx
function Component() {
  const mutation = useSetData();

  return (
    <button
      disabled={mutation.isPending}
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

## Parameters

```ts
type Parameters = Parameters<typeof useSetData>[0];
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

### key

`string`

Record key.

### value

`Hex`

Value written by the mutation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetData>;
```

## Effect Atom

```ts
import { createSetDataMutationAtom } from "@ensforge/react/atoms";

const atom = createSetDataMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setData`](/core/api/actions/records/set-data)
- [`sdk.records.setData`](/sdk/api/records/set-data)
