---
title: sendCalls
description: Submits ENS write intents through wallet batching or sequential fallback.
---

# sendCalls

Submits ENS write intents through wallet batching or sequential fallback.

## Import

```ts
import { sendCalls } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { sendCalls } from "@ensforge/core";
import { config } from "./config";

const result = await sendCalls(config, {
  calls: [],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SendCallsParameters } from "@ensforge/core";
```

### mode

`WriteMode | undefined`

Write execution strategy. `auto` uses wallet capabilities and falls back to sequential transactions.

### atomicity

`WriteAtomicity | undefined`

Atomicity required from the selected execution path.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

### simulation

`"required" | "skip" | undefined`

Whether prepared calls must be simulated.

### capabilities

`Readonly<Record<string, unknown>> | undefined`

Wallet capability overrides included with the call request.

### calls

`ReadonlyArray<EnsWriteIntent<unknown, WriteError>>`

Read calls or write intents included in the operation.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
import type { SendCallsResult } from "@ensforge/core";
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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = sendCalls.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.batch.sendCalls`](/sdk/api/batch/send-calls)
