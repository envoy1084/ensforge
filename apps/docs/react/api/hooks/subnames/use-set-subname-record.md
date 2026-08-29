---
title: useSetSubnameRecord
description: Hook for setting subname record.
---

# useSetSubnameRecord

Hook for setting subname record.

## Import

```tsx
import { useSetSubnameRecord } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetSubnameRecord();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          owner: "0x0000000000000000000000000000000000000001",
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
type Parameters = Parameters<typeof useSetSubnameRecord>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### records

`ReadonlyArray<SetRecordInput> | undefined`

Records selected, read, or written.

### owner

`string`

Address that should own the name or resource.

### resolver

`string | undefined`

Resolver address used by the operation.

### ttl

`bigint | undefined`

Registry time-to-live in seconds.

### expiry

`bigint | undefined`

Unix timestamp for the requested expiry.

### fuses

`number | undefined`

Value used for `fuses` by this operation.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### salt

`bigint | undefined`

Value used for `salt` by this operation.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### resume

`CreateSubnameResult | undefined`

Previously returned progress used to continue the workflow.

### name

`string`

ENS name used by the query or mutation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetSubnameRecord>;
```

## Effect Atom

```ts
import { createSetSubnameRecordMutationAtom } from "@ensforge/react/atoms";

const atom = createSetSubnameRecordMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setSubnameRecord`](/core/api/actions/subnames/set-subname-record)
- [`sdk.subnames.setSubnameRecord`](/sdk/api/subnames/set-subname-record)
