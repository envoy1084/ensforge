---
title: sendCalls
description: Submits write intents through the best supported wallet route.
---

# sendCalls

Submits write intents through the best supported wallet route.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.batch.sendCalls({
  calls: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SendCallsParameters } from "@ensforge/sdk/batch";
```

### mode

`WriteMode | undefined`

Write execution strategy. `auto` uses wallet capabilities and falls back to sequential transactions.

### atomicity

`WriteAtomicity | undefined`

Value used for `atomicity` by this method.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

### simulation

`"required" | "skip" | undefined`

Value used for `simulation` by this method.

### capabilities

`Readonly<Record<string, unknown>> | undefined`

Value used for `capabilities` by this method.

### calls

`ReadonlyArray<EnsWriteIntent<unknown, WriteError>>`

Read requests or write intents included in the operation.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
import type { SendCallsResult } from "@ensforge/sdk/batch";
```

| Property       | Type                                                     | Description                                                 |
| -------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| `mode`         | `"batch" \| "sequential"`                                | The mode value returned by the operation.                   |
| `atomic`       | `boolean \| false`                                       | Whether the wallet guarantees the calls execute atomically. |
| `status`       | `"submitted" \| "confirmed" \| "completed" \| "partial"` | Current query, transaction, batch, or workflow status.      |
| `id`           | `string \| undefined`                                    | Stable operation or wallet batch identifier.                |
| `calls`        | `readonly CallExecutionResult[]`                         | Per-call preparation, simulation, or execution results.     |
| `receipts`     | `readonly WriteReceipt[] \| undefined`                   | Confirmed transaction receipts.                             |
| `capabilities` | `WalletCapabilitiesResult \| undefined`                  | The capabilities value returned by the operation.           |
| `failure`      | `WriteError \| null \| undefined`                        | The failure value returned by the operation.                |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.batch.sendCalls.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/sdk/error.md-->

## Action

- [`sendCalls`](/core/api/actions/batch/send-calls)
