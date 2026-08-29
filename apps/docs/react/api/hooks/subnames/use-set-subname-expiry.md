---
title: useSetSubnameExpiry
description: Hook for setting subname expiry.
---

# useSetSubnameExpiry

Hook for setting subname expiry.

## Import

```tsx
import { useSetSubnameExpiry } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetSubnameExpiry();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          expiry: 2_000_000_000n,
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
type Parameters = Parameters<typeof useSetSubnameExpiry>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### expiry

`bigint`

Unix timestamp for the requested expiry.

### name

`string`

ENS name used by the query or mutation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetSubnameExpiry>;
```

## Effect Atom

```ts
import { createSetSubnameExpiryMutationAtom } from "@ensforge/react/atoms";

const atom = createSetSubnameExpiryMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setSubnameExpiry`](/core/api/actions/subnames/set-subname-expiry)
- [`sdk.subnames.setSubnameExpiry`](/sdk/api/subnames/set-subname-expiry)
