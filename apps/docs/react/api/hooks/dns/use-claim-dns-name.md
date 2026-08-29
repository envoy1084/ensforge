---
title: useClaimDnsName
description: Hook for claiming dns name.
---

# useClaimDnsName

Hook for claiming dns name.

## Import

```tsx
import { useClaimDnsName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useClaimDnsName();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          proof: [],
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
type Parameters = Parameters<typeof useClaimDnsName>[0];
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

### proof

`ReadonlyArray<DnssecProof>`

DNSSEC proof records.

### resolver

`string | undefined`

Resolver address used by the operation.

### address

`string | undefined`

Address used by the operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useClaimDnsName>;
```

## Effect Atom

```ts
import { createClaimDnsNameMutationAtom } from "@ensforge/react/atoms";

const atom = createClaimDnsNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`claimDnsName`](/core/api/actions/dns/claim-dns-name)
- [`sdk.dns.claimDnsName`](/sdk/api/dns/claim-dns-name)
