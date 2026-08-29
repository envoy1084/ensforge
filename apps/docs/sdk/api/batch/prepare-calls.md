---
title: prepareCalls
description: Prepares and simulates write intents without submitting them.
---

# prepareCalls

Prepares and simulates write intents without submitting them.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.batch.prepareCalls({
  calls: [],
});
```

## Parameters

```ts
type PrepareCallsParameters = Parameters<typeof sdk.batch.prepareCalls>[0];
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
type PrepareCallsResult = Awaited<ReturnType<typeof sdk.batch.prepareCalls>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.batch.prepareCalls.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`prepareCalls`](/core/api/actions/batch/prepare-calls)
