---
title: executeWritePlan
description: Executes a staged ENS write plan and returns resumable progress.
---

# executeWritePlan

Executes a staged ENS write plan and returns resumable progress.

This action belongs to typed read and wallet-aware write batching. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { executeWritePlan } from "@ensforge/core";
```

## Usage

```ts
import { executeWritePlan } from "@ensforge/core";
import { config } from "./config";

const result = await executeWritePlan(config, {
  plan: { id: "profile", stages: [] },
});
```

## Parameters

```ts
type ExecuteWritePlanParameters = Parameters<typeof executeWritePlan>[1];
```

### plan

`WritePlan`

Staged write plan to execute.

### resume

`WritePlanProgress | undefined`

Previously returned progress used to continue an incomplete workflow.

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

## Return Type

```ts
type ExecuteWritePlanResult = Awaited<ReturnType<typeof executeWritePlan>>;
```

`WritePlanProgress`

## Effect

```ts
const effect = executeWritePlan.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type ExecuteWritePlanError = Effect.Effect.Error<ReturnType<typeof executeWritePlan.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
