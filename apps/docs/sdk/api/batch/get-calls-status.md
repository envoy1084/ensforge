---
title: getCallsStatus
description: Gets calls status for batch execution.
---

# getCallsStatus

Gets calls status for batch execution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.batch.getCallsStatus({
  id: "0x1234",
});
```

## Parameters

```ts
type GetCallsStatusParameters = Parameters<typeof sdk.batch.getCallsStatus>[0];
```

### id

`string`

Submitted wallet batch identifier.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

```ts
type GetCallsStatusResult = Awaited<ReturnType<typeof sdk.batch.getCallsStatus>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.batch.getCallsStatus.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`getCallsStatus`](/core/api/actions/batch/get-calls-status)
