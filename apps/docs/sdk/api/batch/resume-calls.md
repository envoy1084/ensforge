---
title: resumeCalls
description: Continues a partially completed call execution.
---

# resumeCalls

Continues a partially completed call execution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.batch.resumeCalls({
  batch: {},
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { ResumeCallsParameters } from "@ensforge/sdk";
```

### batch

`NativeBatchResult`

Value used for `batch` by this method.

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
import type { NativeBatchResult } from "@ensforge/sdk";
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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.batch.resumeCalls.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`resumeCalls`](/core/api/actions/batch/resume-calls)
