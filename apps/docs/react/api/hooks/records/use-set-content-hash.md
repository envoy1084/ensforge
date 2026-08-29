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

```tsx
function Component() {
  const mutation = useSetContentHash();

  return (
    <button
      disabled={mutation.isPending}
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

## Parameters

```ts
type Parameters = Parameters<typeof useSetContentHash>[0];
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

### protocol

`ContentHashProtocol`

Content-addressing protocol.

### value

`string`

Value written by the mutation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetContentHash>;
```

## Effect Atom

```ts
import { createSetContentHashMutationAtom } from "@ensforge/react/atoms";

const atom = createSetContentHashMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setContentHash`](/core/api/actions/records/set-content-hash)
- [`sdk.records.setContentHash`](/sdk/api/records/set-content-hash)
