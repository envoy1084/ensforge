---
title: executeWritePlan
description: Executes a staged write plan and returns resumable progress.
---

# executeWritePlan

Executes a staged write plan and returns resumable progress.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.batch.executeWritePlan({
  plan: { id: "profile", stages: [] },
});
```

## Parameters

```ts
type ExecuteWritePlanParameters = Parameters<typeof sdk.batch.executeWritePlan>[0];
```

### plan

`WritePlan`

Staged write plan.

### resume

`WritePlanProgress | undefined`

Previously returned progress used to continue the workflow.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

```ts
type ExecuteWritePlanResult = Awaited<ReturnType<typeof sdk.batch.executeWritePlan>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.batch.executeWritePlan.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`executeWritePlan`](/core/api/actions/batch/execute-write-plan)
