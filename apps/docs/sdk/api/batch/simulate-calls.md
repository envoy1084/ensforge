---
title: simulateCalls
description: simulate calls for batch execution.
---

# simulateCalls

simulate calls for batch execution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.batch.simulateCalls({
  calls: [],
});
```

## Parameters

```ts
type SimulateCallsParameters = Parameters<typeof sdk.batch.simulateCalls>[0];
```

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
type SimulateCallsResult = Awaited<ReturnType<typeof sdk.batch.simulateCalls>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.batch.simulateCalls.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`simulateCalls`](/core/api/actions/batch/simulate-calls)
