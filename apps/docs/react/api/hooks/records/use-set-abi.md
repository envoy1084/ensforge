---
title: useSetAbi
description: Hook for setting abi.
---

# useSetAbi

Hook for setting abi.

## Import

```tsx
import { useSetAbi } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetAbi();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          contentType: {},
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
type Parameters = Parameters<typeof useSetAbi>[0];
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

### contentType

`Exclude<AbiContentType, "uri">`

Value used for `contentType` by this operation.

### value

`Abi`

Value written by the mutation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetAbi>;
```

## Effect Atom

```ts
import { createSetAbiMutationAtom } from "@ensforge/react/atoms";

const atom = createSetAbiMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setAbi`](/core/api/actions/records/set-abi)
- [`sdk.records.setAbi`](/sdk/api/records/set-abi)
