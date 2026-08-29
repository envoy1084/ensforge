---
title: setResolverAndRecords
description: Sets a resolver and initial records through a resumable workflow.
---

# setResolverAndRecords

Sets a resolver and initial records through a resumable workflow.

This action belongs to resolver discovery and Universal Resolver calls. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setResolverAndRecords } from "@ensforge/core";
```

## Usage

```ts
import { setResolverAndRecords } from "@ensforge/core";
import { config } from "./config";

const result = await setResolverAndRecords(config, {
  name: "example.eth",
  records: [],
});
```

## Parameters

```ts
type SetResolverAndRecordsParameters = Parameters<typeof setResolverAndRecords>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### records

`ReadonlyArray<SetRecordInput>`

Records selected, read, or written by the operation.

### resolver

`string | undefined`

Resolver address used by the operation.

### salt

`bigint | undefined`

Deterministic deployment salt.

### admin

`string | undefined`

Value used for `admin` by this action.

### roles

`bigint | undefined`

Role bitmask to read, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Encoded initial resolver setter calls.

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

### confirmation

`ConfirmationPolicy | undefined`

Transaction confirmation policy for this operation.

### resume

`SetResolverAndRecordsProgress | undefined`

Previously returned progress used to continue an incomplete workflow.

## Return Type

```ts
type SetResolverAndRecordsResult = Awaited<ReturnType<typeof setResolverAndRecords>>;
```

`SetResolverAndRecordsProgress`

## Effect

```ts
const effect = setResolverAndRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type SetResolverAndRecordsError = Effect.Effect.Error<
  ReturnType<typeof setResolverAndRecords.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
