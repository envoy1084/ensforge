---
title: useRenewNames
description: Hook for renewing names.
---

# useRenewNames

Hook for renewing names.

## Import

```tsx
import { useRenewNames } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useRenewNames();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          renewals: [],
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
type Parameters = Parameters<typeof useRenewNames>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### renewals

`ReadonlyArray<RenewNamesEntryParameters>`

Renewal entries.

### maxTotalPrice

`bigint | undefined`

Maximum aggregate price accepted by the caller.

### resume

`RenewNamesResult | undefined`

Previously returned progress used to continue the workflow.

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

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useRenewNames>;
```

## Effect Atom

```ts
import { createRenewNamesMutationAtom } from "@ensforge/react/atoms";

const atom = createRenewNamesMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`renewNames`](/core/api/actions/registration/renew-names)
- [`sdk.registration.renewNames`](/sdk/api/registration/renew-names)
