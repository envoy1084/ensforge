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

```ts
import { sdk } from "./sdk";

const result = await sdk.batch.sendCalls({
  calls: [],
});
```

## Parameters

```ts
type SendCallsParameters = Parameters<typeof sdk.batch.sendCalls>[0];
```

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### atomicity

`WriteAtomicity | undefined`

Value used for `atomicity` by this method.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

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

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

```ts
type SendCallsResult = Awaited<ReturnType<typeof sdk.batch.sendCalls>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.batch.sendCalls.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`sendCalls`](/core/api/actions/batch/send-calls)
