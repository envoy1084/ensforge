---
title: setRecords
description: Sets heterogeneous resolver records with resolver or wallet aggregation.
---

# setRecords

Sets heterogeneous resolver records with resolver or wallet aggregation.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setRecords({
  name: "example.eth",
  records: [],
});
```

## Parameters

```ts
type SetRecordsParameters = Parameters<typeof sdk.records.setRecords>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### records

`ReadonlyArray<SetRecordInput>`

Records selected, read, or written.

### aggregation

`"auto" | "resolver" | "wallet" | undefined`

Value used for `aggregation` by this method.

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

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

```ts
type SetRecordsResult = Awaited<ReturnType<typeof sdk.records.setRecords>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setRecords.call(parameters);
```

## Action

- [`setRecords`](/core/api/actions/records/set-records)
