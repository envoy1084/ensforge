---
title: useExtendSubnameExpiry
description: Hook for extending subname expiry.
---

# useExtendSubnameExpiry

Hook for extending subname expiry.

## Import

```tsx
import { useExtendSubnameExpiry } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useExtendSubnameExpiry();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          expiry: 2_000_000_000n,
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
type Parameters = Parameters<typeof useExtendSubnameExpiry>[0];
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

### expiry

`bigint`

Unix timestamp for the requested expiry.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useExtendSubnameExpiry>;
```

## Effect Atom

```ts
import { createExtendSubnameExpiryMutationAtom } from "@ensforge/react/atoms";

const atom = createExtendSubnameExpiryMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`extendSubnameExpiry`](/core/api/actions/wrapping/extend-subname-expiry)
- [`sdk.wrapping.extendSubnameExpiry`](/sdk/api/wrapping/extend-subname-expiry)
