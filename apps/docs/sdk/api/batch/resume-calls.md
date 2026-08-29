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

```ts
import { sdk } from "./sdk";

const result = await sdk.batch.resumeCalls({
  batch: {},
});
```

## Parameters

```ts
type ResumeCallsParameters = Parameters<typeof sdk.batch.resumeCalls>[0];
```

### batch

`NativeBatchResult`

Value used for `batch` by this method.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

```ts
type ResumeCallsResult = Awaited<ReturnType<typeof sdk.batch.resumeCalls>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.batch.resumeCalls.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`resumeCalls`](/core/api/actions/batch/resume-calls)
