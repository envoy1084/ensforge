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

```tsx
function Component() {
  const mutation = useSetText();

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
type Parameters = Parameters<typeof useSetText>[0];
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

`string`

Value written by the mutation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetText>;
```

## Effect Atom

```ts
import { createSetTextMutationAtom } from "@ensforge/react/atoms";

const atom = createSetTextMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setText`](/core/api/actions/records/set-text)
- [`sdk.records.setText`](/sdk/api/records/set-text)
