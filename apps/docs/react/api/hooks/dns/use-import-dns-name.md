---
title: useImportDnsName
description: Hook for importing dns name.
---

# useImportDnsName

Hook for importing dns name.

## Import

```tsx
import { useImportDnsName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useImportDnsName();

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
type Parameters = Parameters<typeof useImportDnsName>[0];
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

`ImportDnsNameResult | undefined`

Previously returned progress used to continue the workflow.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useImportDnsName>;
```

## Effect Atom

```ts
import { createImportDnsNameMutationAtom } from "@ensforge/react/atoms";

const atom = createImportDnsNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`importDnsName`](/core/api/actions/dns/import-dns-name)
- [`sdk.dns.importDnsName`](/sdk/api/dns/import-dns-name)
