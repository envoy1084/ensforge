---
title: getCallsStatus
description: Gets calls status for typed read and wallet-aware write batching.
---

# getCallsStatus

Gets calls status for typed read and wallet-aware write batching.

This action belongs to typed read and wallet-aware write batching. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getCallsStatus } from "@ensforge/core";
```

## Usage

```ts
import { getCallsStatus } from "@ensforge/core";
import { config } from "./config";

const result = await getCallsStatus(config, {
  id: "0x1234",
});
```

## Parameters

```ts
type GetCallsStatusParameters = Parameters<typeof getCallsStatus>[1];
```

### id

`string`

Identifier of a submitted wallet call batch.

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

## Return Type

```ts
type GetCallsStatusResult = Awaited<ReturnType<typeof getCallsStatus>>;
```

`CallsStatusResult`

## Effect

```ts
const effect = getCallsStatus.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type GetCallsStatusError = Effect.Effect.Error<ReturnType<typeof getCallsStatus.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
