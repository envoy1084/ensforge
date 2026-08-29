---
title: setRecords
description: Sets heterogeneous resolver records using resolver or wallet aggregation.
---

# setRecords

Sets heterogeneous resolver records using resolver or wallet aggregation.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setRecords } from "@ensforge/core";
```

## Usage

```ts
import { setRecords } from "@ensforge/core";
import { config } from "./config";

const result = await setRecords(config, {
  name: "example.eth",
  records: [],
});
```

## Parameters

```ts
type SetRecordsParameters = Parameters<typeof setRecords>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### records

`ReadonlyArray<SetRecordInput>`

Records selected, read, or written by the operation.

### aggregation

`"auto" | "resolver" | "wallet" | undefined`

Where multiple record writes should be aggregated.

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

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

## Return Type

```ts
type SetRecordsResult = Awaited<ReturnType<typeof setRecords>>;
```

`SetRecordsResult`

## Effect

```ts
const effect = setRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setRecords.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetRecordsError = Effect.Effect.Error<ReturnType<typeof setRecords.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
