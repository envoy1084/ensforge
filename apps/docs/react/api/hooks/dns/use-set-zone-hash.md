---
title: useSetZoneHash
description: Hook for setting zone hash.
---

# useSetZoneHash

Hook for setting zone hash.

## Import

```tsx
import { useSetZoneHash } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetZoneHash();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
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
type Parameters = Parameters<typeof useSetZoneHash>[0];
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

### value

`Hex`

Value written by the mutation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetZoneHash>;
```

## Effect Atom

```ts
import { createSetZoneHashMutationAtom } from "@ensforge/react/atoms";

const atom = createSetZoneHashMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setZoneHash`](/core/api/actions/dns/set-zone-hash)
- [`sdk.dns.setZoneHash`](/sdk/api/dns/set-zone-hash)
