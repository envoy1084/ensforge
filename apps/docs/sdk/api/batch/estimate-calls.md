---
title: estimateCalls
description: estimate calls for batch execution.
---

# estimateCalls

estimate calls for batch execution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.batch.estimateCalls({
  calls: [],
});
```

## Parameters

```ts
type EstimateCallsParameters = Parameters<typeof sdk.batch.estimateCalls>[0];
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
type EstimateCallsResult = Awaited<ReturnType<typeof sdk.batch.estimateCalls>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.batch.estimateCalls.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`estimateCalls`](/core/api/actions/batch/estimate-calls)
