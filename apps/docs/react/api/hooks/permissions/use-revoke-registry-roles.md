---
title: useRevokeRegistryRoles
description: Hook for revoking registry roles.
---

# useRevokeRegistryRoles

Hook for revoking registry roles.

## Import

```tsx
import { useRevokeRegistryRoles } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRevokeRegistryRoles } from "@ensforge/react";

function Component() {
  const mutation = useRevokeRegistryRoles();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          account: "value",
          roles: 1n,
        })
      }
    >
      Submit
    </button>
  );
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts an optional `EnsMutationOptions` object.

### retry

`false | Schedule<unknown, Failure> | undefined`

An Effect schedule used to retry typed failures. It defaults to `false`. Only retry writes that are known to be safe and idempotent.

### onExit

`(exit: Exit<Success, Failure>, parameters: Parameters) => void`

Receives the complete Effect `Exit` and the exact mutation parameters after execution. Use `Exit.match` or `Exit.isSuccess` to handle both outcomes without losing typed failures.

See [Mutation Options](/react/api/mutation-options) for schedules, provider defaults, and per-call `onExit` handlers.

## Mutation Parameters

```ts
import type { RegistryRolesMutationParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useRevokeRegistryRoles>;
```

Returns an [`EnsMutationResult`](/react/api/mutation-result).

| Property       | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `mutate`       | Starts the mutation and optionally reports its `Exit`.         |
| `mutateAsync`  | Starts the mutation and returns a Promise.                     |
| `mutateEffect` | Starts the mutation and returns an Effect with typed failures. |
| `data`         | Latest successful value, or `undefined`.                       |
| `error`        | Latest typed failure, an unexpected `Error`, or `null`.        |
| `cause`        | Complete Effect cause for the latest failure.                  |
| `isInitial`    | The mutation has not executed since creation or reset.         |
| `isWaiting`    | The mutation Effect is currently running.                      |
| `isSuccess`    | The latest execution succeeded.                                |
| `isFailure`    | The latest execution failed.                                   |
| `parameters`   | Parameters used by the latest execution.                       |
| `interrupt`    | Interrupts the active Effect.                                  |
| `reset`        | Restores the mutation to its initial state.                    |
| `result`       | Underlying Effect `AsyncResult`.                               |

## Effect Atom

```ts
import { createRevokeRegistryRolesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createRevokeRegistryRolesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`revokeRegistryRoles`](/core/api/actions/permissions/revoke-registry-roles)
- [`sdk.permissions.revokeRegistryRoles`](/sdk/api/permissions/revoke-registry-roles)
