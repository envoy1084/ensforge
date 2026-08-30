---
title: useRevokeResolverRoles
description: Hook for revoking resolver roles.
---

# useRevokeResolverRoles

Hook for revoking resolver roles.

## Import

```tsx
import { useRevokeResolverRoles } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRevokeResolverRoles } from "@ensforge/react";

function Component() {
  const mutation = useRevokeResolverRoles();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          account: "value",
          record: {},
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
import type { ResolverRolesMutationParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useRevokeResolverRoles>;
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
import { createRevokeResolverRolesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createRevokeResolverRolesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`revokeResolverRoles`](/core/api/actions/permissions/revoke-resolver-roles)
- [`sdk.permissions.revokeResolverRoles`](/sdk/api/permissions/revoke-resolver-roles)
