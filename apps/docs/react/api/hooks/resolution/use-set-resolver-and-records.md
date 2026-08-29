---
title: useSetResolverAndRecords
description: Hook for setting resolver and records.
---

# useSetResolverAndRecords

Hook for setting resolver and records.

## Import

```tsx
import { useSetResolverAndRecords } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetResolverAndRecords();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          records: [],
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
type Parameters = Parameters<typeof useSetResolverAndRecords>[0];
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

### records

`ReadonlyArray<SetRecordInput>`

Records selected, read, or written.

### resolver

`string | undefined`

Resolver address used by the operation.

### salt

`bigint | undefined`

Value used for `salt` by this operation.

### admin

`string | undefined`

Value used for `admin` by this operation.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Value used for `setters` by this operation.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### resume

`SetResolverAndRecordsProgress | undefined`

Previously returned progress used to continue the workflow.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetResolverAndRecords>;
```

## Effect Atom

```ts
import { createSetResolverAndRecordsMutationAtom } from "@ensforge/react/atoms";

const atom = createSetResolverAndRecordsMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setResolverAndRecords`](/core/api/actions/resolution/set-resolver-and-records)
- [`sdk.resolution.setResolverAndRecords`](/sdk/api/resolution/set-resolver-and-records)
