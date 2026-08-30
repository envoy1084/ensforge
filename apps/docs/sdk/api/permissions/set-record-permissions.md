---
title: setRecordPermissions
description: Sets record permissions for approvals and roles.
---

# setRecordPermissions

Sets record permissions for approvals and roles.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.permissions.setRecordPermissions({
  name: "example.eth",
  account: "value",
  records: [],
  approved: true,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetRecordPermissionsParameters } from "@ensforge/sdk/permissions";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### account

`string`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### records

`ReadonlyArray<RecordOperation>`

Records selected, read, or written.

### approved

`boolean`

Whether the target should be approved.

### allowScopeWidening

`boolean | undefined`

Value used for `allowScopeWidening` by this method.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### walletAccount

`Account | Address | undefined`

Value used for `walletAccount` by this method.

### mode

`WriteMode | undefined`

Write execution strategy. `auto` uses wallet capabilities and falls back to sequential transactions.

### atomicity

`WriteAtomicity | undefined`

Value used for `atomicity` by this method.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

### capabilities

`Readonly<Record<string, unknown>> | undefined`

Value used for `capabilities` by this method.

## Return Type

```ts
import type { SetRecordPermissionsResult } from "@ensforge/sdk/permissions";
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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.permissions.setRecordPermissions.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { SetRecordPermissionsError } from "@ensforge/sdk/permissions";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`setRecordPermissions`](/core/api/actions/permissions/set-record-permissions)
