---
title: setRecordPermissions
description: Sets record permissions for approvals and scoped roles.
---

# setRecordPermissions

Sets record permissions for approvals and scoped roles.

## Import

```ts
import { setRecordPermissions } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setRecordPermissions } from "@ensforge/core";
import { config } from "./config";

const result = await setRecordPermissions(config, {
  name: "example.eth",
  account: "value",
  records: [],
  approved: true,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetRecordPermissionsParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### account

`string`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### records

`ReadonlyArray<RecordOperation>`

Records selected, read, or written by the operation.

### approved

`boolean`

Whether the target should be approved.

### allowScopeWidening

`boolean | undefined`

Allows the operation to use a broader supported permission scope.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### walletAccount

`Account | Address | undefined`

Wallet account used to execute this operation.

### mode

`WriteMode | undefined`

Write execution strategy. `auto` uses wallet capabilities and falls back to sequential transactions.

### atomicity

`WriteAtomicity | undefined`

Atomicity required from the selected execution path.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

### capabilities

`Readonly<Record<string, unknown>> | undefined`

Wallet capability overrides included with the call request.

## Return Type

```ts
import type { SetRecordPermissionsResult } from "@ensforge/core";
```

| Property      | Type                                                          | Description                                      |
| ------------- | ------------------------------------------------------------- | ------------------------------------------------ |
| `model`       | `"public-resolver-delegate" \| "permissioned-resolver-roles"` | The model value returned by the operation.       |
| `protocol`    | `"v1" \| "v2" \| "v2"`                                        | ENS protocol route used for the result.          |
| `resolver`    | `&#96;0x${string}&#96;`                                       | The resolver value returned by the operation.    |
| `account`     | `&#96;0x${string}&#96;`                                       | The account value returned by the operation.     |
| `approved`    | `boolean`                                                     | The approved value returned by the operation.    |
| `scope`       | `"node" \| "exact"`                                           | The scope value returned by the operation.       |
| `widened`     | `true \| false`                                               | The widened value returned by the operation.     |
| `execution`   | `SendCallsResult`                                             | The execution value returned by the operation.   |
| `permissions` | `readonly AppliedRecordPermission[] \| undefined`             | The permissions value returned by the operation. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = setRecordPermissions.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { SetRecordPermissionsError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.permissions.setRecordPermissions`](/sdk/api/permissions/set-record-permissions)
