---
title: setRecordPermissions
description: Sets record permissions for approvals and scoped roles.
---

# setRecordPermissions

Sets record permissions for approvals and scoped roles.

This action belongs to approvals and scoped roles. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setRecordPermissions } from "@ensforge/core";
```

## Usage

```ts
import { setRecordPermissions } from "@ensforge/core";
import { config } from "./config";

const result = await setRecordPermissions(config, {
  name: "example.eth",
  account: "value",
  records: [],
  approved: true,
});
```

## Parameters

```ts
type SetRecordPermissionsParameters = Parameters<typeof setRecordPermissions>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### account

`string`

Account used for authorization and wallet execution.

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

Wallet client override for this operation.

### walletAccount

`Account | Address | undefined`

Wallet account used to execute this operation.

### mode

`WriteMode | undefined`

Execution mode. `auto` uses wallet capabilities and falls back safely.

### atomicity

`WriteAtomicity | undefined`

Atomicity required from the selected execution path.

### confirmation

`ConfirmationPolicy | undefined`

Transaction confirmation policy for this operation.

### capabilities

`Readonly<Record<string, unknown>> | undefined`

Wallet capability overrides included with the call request.

## Return Type

```ts
type SetRecordPermissionsResult = Awaited<ReturnType<typeof setRecordPermissions>>;
```

`SetRecordPermissionsResult`

## Effect

```ts
const effect = setRecordPermissions.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type SetRecordPermissionsError = Effect.Effect.Error<
  ReturnType<typeof setRecordPermissions.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
