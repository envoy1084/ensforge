---
title: useTransferRegistrant
description: Hook for transferring registrant.
---

# useTransferRegistrant

Hook for transferring registrant.

## Import

```tsx
import { useTransferRegistrant } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useTransferRegistrant();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          to: "value",
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
type Parameters = Parameters<typeof useTransferRegistrant>[0];
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

### to

`string`

Value used for `to` by this operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useTransferRegistrant>;
```

## Effect Atom

```ts
import { createTransferRegistrantMutationAtom } from "@ensforge/react/atoms";

const atom = createTransferRegistrantMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`transferRegistrant`](/core/api/actions/ownership/transfer-registrant)
- [`sdk.ownership.transferRegistrant`](/sdk/api/ownership/transfer-registrant)
