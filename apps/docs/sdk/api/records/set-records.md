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

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.records.setRecords({
  name: "example.eth",
  records: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetRecordsParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### records

`ReadonlyArray<SetRecordInput>`

Records selected, read, or written.

### aggregation

`"auto" | "resolver" | "wallet" | undefined`

Value used for `aggregation` by this method.

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

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
import type { SetRecordsResult } from "@ensforge/sdk";
```

| Property       | Type                                                     | Description                                                 |
| -------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| `mode`         | `"batch" \| "sequential" \| "resolver"`                  | The mode value returned by the operation.                   |
| `atomic`       | `boolean \| false \| true`                               | Whether the wallet guarantees the calls execute atomically. |
| `status`       | `"submitted" \| "confirmed" \| "completed" \| "partial"` | Current query, transaction, batch, or workflow status.      |
| `id`           | `string \| undefined`                                    | Stable operation or wallet batch identifier.                |
| `calls`        | `readonly CallExecutionResult[] \| undefined`            | Per-call preparation, simulation, or execution results.     |
| `receipts`     | `readonly WriteReceipt[] \| undefined`                   | Confirmed transaction receipts.                             |
| `capabilities` | `WalletCapabilitiesResult \| undefined`                  | The capabilities value returned by the operation.           |
| `failure`      | `WriteError \| null \| undefined`                        | The failure value returned by the operation.                |
| `call`         | `CallExecutionResult \| undefined`                       | The call value returned by the operation.                   |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.records.setRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

Use `.call` to prepare this write for simulation, wallet batching, or a custom execution policy.

```ts
const call = ens.records.setRecords.call(parameters);
```

## Error

```ts
import type { SetRecordsError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`setRecords`](/core/api/actions/records/set-records)
