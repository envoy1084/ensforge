---
title: useRegisterNames
description: Hook for registering names.
---

# useRegisterNames

Hook for registering names.

## Import

```tsx
import { useRegisterNames } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useRegisterNames();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          registrations: [],
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
type Parameters = Parameters<typeof useRegisterNames>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### registrations

`ReadonlyArray<RegisterNamesEntryParameters>`

Registration entries.

### resume

`RegisterNamesResult | undefined`

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
type Result = ReturnType<typeof useRegisterNames>;
```

## Effect Atom

```ts
import { createRegisterNamesMutationAtom } from "@ensforge/react/atoms";

const atom = createRegisterNamesMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`registerNames`](/core/api/actions/registration/register-names)
- [`sdk.registration.registerNames`](/sdk/api/registration/register-names)
