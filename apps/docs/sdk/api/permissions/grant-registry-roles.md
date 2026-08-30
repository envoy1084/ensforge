---
title: grantRegistryRoles
description: Grants registry roles for approvals and roles.
---

# grantRegistryRoles

Grants registry roles for approvals and roles.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.permissions.grantRegistryRoles({
  name: "example.eth",
  account: "value",
  roles: 1n,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { RegistryRolesMutationParameters } from "@ensforge/sdk/permissions";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### account

`string`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### roles

`bigint`

Role bitmask to inspect, grant, or revoke.

## Return Type

```ts
import type { CallExecutionResult } from "@ensforge/sdk";
```

| Property    | Type                                          | Description                                                                    |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------------------ |
| `id`        | `string`                                      | Stable operation or wallet batch identifier.                                   |
| `operation` | `string`                                      | The operation value returned by the operation.                                 |
| `status`    | `"not-started" \| "submitted" \| "confirmed"` | Current query, transaction, batch, or workflow status.                         |
| `hash`      | `null \| &#96;0x${string}&#96; \| null`       | Transaction hash, or `null` before submission.                                 |
| `receipt`   | `null \| WriteReceipt \| null`                | Normalized transaction receipt, or `null` when confirmation was not requested. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.permissions.grantRegistryRoles.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.permissions.grantRegistryRoles.call(parameters);
```

## Error

```ts
import type { GrantRegistryRolesError } from "@ensforge/sdk/permissions";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`grantRegistryRoles`](/core/api/actions/permissions/grant-registry-roles)
