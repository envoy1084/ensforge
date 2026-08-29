---
title: useSetDnsRecords
description: Hook for setting dns records.
---

# useSetDnsRecords

Hook for setting dns records.

## Import

```tsx
import { useSetDnsRecords } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetDnsRecords();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          data: "0x",
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
type Parameters = Parameters<typeof useSetDnsRecords>[0];
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

### data

`Hex`

Raw calldata or record bytes.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetDnsRecords>;
```

## Effect Atom

```ts
import { createSetDnsRecordsMutationAtom } from "@ensforge/react/atoms";

const atom = createSetDnsRecordsMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setDnsRecords`](/core/api/actions/dns/set-dns-records)
- [`sdk.dns.setDnsRecords`](/sdk/api/dns/set-dns-records)
