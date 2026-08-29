---
title: useSetContractPrimaryName
description: Hook for setting contract primary name.
---

# useSetContractPrimaryName

Hook for setting contract primary name.

## Import

```tsx
import { useSetContractPrimaryName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetContractPrimaryName();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          contract: "value",
          name: "example.eth",
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
type Parameters = Parameters<typeof useSetContractPrimaryName>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### contract

`string`

Value used for `contract` by this operation.

### name

`string`

ENS name used by the query or mutation.

### verifyForward

`boolean | undefined`

Value used for `verifyForward` by this operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetContractPrimaryName>;
```

## Effect Atom

```ts
import { createSetContractPrimaryNameMutationAtom } from "@ensforge/react/atoms";

const atom = createSetContractPrimaryNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setContractPrimaryName`](/core/api/actions/reverse/set-contract-primary-name)
- [`sdk.reverse.setContractPrimaryName`](/sdk/api/reverse/set-contract-primary-name)
