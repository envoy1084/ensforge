---
title: setResolverAndRecords
description: Sets a resolver and its initial records as a resumable workflow.
---

# setResolverAndRecords

Sets a resolver and its initial records as a resumable workflow.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.resolution.setResolverAndRecords({
  name: "example.eth",
  records: [],
});
```

## Parameters

```ts
type SetResolverAndRecordsParameters = Parameters<typeof sdk.resolution.setResolverAndRecords>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### records

`ReadonlyArray<SetRecordInput>`

Records selected, read, or written.

### resolver

`string | undefined`

Resolver address used by the method.

### salt

`bigint | undefined`

Value used for `salt` by this method.

### admin

`string | undefined`

Value used for `admin` by this method.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Value used for `setters` by this method.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### resume

`SetResolverAndRecordsProgress | undefined`

Previously returned progress used to continue the workflow.

## Return Type

```ts
type SetResolverAndRecordsResult = Awaited<ReturnType<typeof sdk.resolution.setResolverAndRecords>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.resolution.setResolverAndRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`setResolverAndRecords`](/core/api/actions/resolution/set-resolver-and-records)
