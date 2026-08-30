---
title: grantResolverRoles
description: Grants resolver roles for approvals and scoped roles.
---

# grantResolverRoles

Grants resolver roles for approvals and scoped roles.

## Import

```ts
import { grantResolverRoles } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { grantResolverRoles } from "@ensforge/core";
import { config } from "./config";

const result = await grantResolverRoles(config, {
  name: "example.eth",
  account: "value",
  record: {},
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { ResolverRolesMutationParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### account

`string`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### record

`ResolverRecord`

Resolver record used by this operation.

### roles

`bigint | undefined`

Role bitmask to read, grant, or revoke.

## Return Type

```ts
import type { CallExecutionResult } from "@ensforge/core";
```

| Property    | Type                                          | Description                                                                    |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------------------ |
| `id`        | `string`                                      | Stable operation or wallet batch identifier.                                   |
| `operation` | `string`                                      | The operation value returned by the operation.                                 |
| `status`    | `"not-started" \| "submitted" \| "confirmed"` | Current query, transaction, batch, or workflow status.                         |
| `hash`      | `null \| &#96;0x${string}&#96; \| null`       | Transaction hash, or `null` before submission.                                 |
| `receipt`   | `null \| WriteReceipt \| null`                | Normalized transaction receipt, or `null` when confirmation was not requested. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = grantResolverRoles.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = grantResolverRoles.call(parameters);
```

## Error

```ts
import type { GrantResolverRolesError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.permissions.grantResolverRoles`](/sdk/api/permissions/grant-resolver-roles)
