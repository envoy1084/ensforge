---
title: resumeCalls
description: Continues a partially completed wallet or sequential call execution.
---

# resumeCalls

Continues a partially completed wallet or sequential call execution.

## Import

```ts
import { resumeCalls } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { resumeCalls } from "@ensforge/core";
import { config } from "./config";

const result = await resumeCalls(config, {
  batch: {},
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { ResumeCallsParameters } from "@ensforge/core";
```

### batch

`NativeBatchResult`

Previously submitted native wallet batch.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
import type { NativeBatchResult } from "@ensforge/core";
```

| Property       | Type                             | Description                                                 |
| -------------- | -------------------------------- | ----------------------------------------------------------- |
| `mode`         | `"batch"`                        | The mode value returned by the operation.                   |
| `atomic`       | `boolean`                        | Whether the wallet guarantees the calls execute atomically. |
| `status`       | `"submitted" \| "confirmed"`     | Current query, transaction, batch, or workflow status.      |
| `id`           | `string`                         | Stable operation or wallet batch identifier.                |
| `calls`        | `readonly CallExecutionResult[]` | Per-call preparation, simulation, or execution results.     |
| `receipts`     | `readonly WriteReceipt[]`        | Confirmed transaction receipts.                             |
| `capabilities` | `WalletCapabilitiesResult`       | The capabilities value returned by the operation.           |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = resumeCalls.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.batch.resumeCalls`](/sdk/api/batch/resume-calls)
