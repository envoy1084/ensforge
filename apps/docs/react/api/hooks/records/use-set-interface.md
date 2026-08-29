---
title: useSetInterface
description: Hook for setting interface.
---

# useSetInterface

Hook for setting interface.

## Import

```tsx
import { useSetInterface } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetInterface();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          interfaceId: "0x01ffc9a7",
          implementer: "0x0000000000000000000000000000000000000001",
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
type Parameters = Parameters<typeof useSetInterface>[0];
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

### interfaceId

`string`

Four-byte ERC-165 interface identifier.

### implementer

`string`

Interface implementer address.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetInterface>;
```

## Effect Atom

```ts
import { createSetInterfaceMutationAtom } from "@ensforge/react/atoms";

const atom = createSetInterfaceMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setInterface`](/core/api/actions/records/set-interface)
- [`sdk.records.setInterface`](/sdk/api/records/set-interface)
