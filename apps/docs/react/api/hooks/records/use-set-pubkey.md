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

```tsx
function Component() {
  const mutation = useSetPubkey();

  return (
    <button
      disabled={mutation.isPending}
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

## Parameters

```ts
type Parameters = Parameters<typeof useSetPubkey>[0];
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

### x

`Hex`

Public key X coordinate.

### y

`Hex`

Public key Y coordinate.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetPubkey>;
```

## Effect Atom

```ts
import { createSetPubkeyMutationAtom } from "@ensforge/react/atoms";

const atom = createSetPubkeyMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setPubkey`](/core/api/actions/records/set-pubkey)
- [`sdk.records.setPubkey`](/sdk/api/records/set-pubkey)
