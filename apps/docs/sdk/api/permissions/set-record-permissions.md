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

```ts
import { sdk } from "./sdk";

const result = await sdk.permissions.setRecordPermissions({
  name: "example.eth",
  account: "value",
  records: [],
  approved: true,
});
```

## Parameters

```ts
type SetRecordPermissionsParameters = Parameters<typeof sdk.permissions.setRecordPermissions>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### account

`string`

Account used for authorization and execution.

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

Wallet client override.

### walletAccount

`Account | Address | undefined`

Value used for `walletAccount` by this method.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### atomicity

`WriteAtomicity | undefined`

Value used for `atomicity` by this method.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### capabilities

`Readonly<Record<string, unknown>> | undefined`

Value used for `capabilities` by this method.

## Return Type

```ts
type SetRecordPermissionsResult = Awaited<ReturnType<typeof sdk.permissions.setRecordPermissions>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.permissions.setRecordPermissions.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`setRecordPermissions`](/core/api/actions/permissions/set-record-permissions)
