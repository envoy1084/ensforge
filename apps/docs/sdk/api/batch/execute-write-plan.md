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

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.batch.executeWritePlan({
  plan: { id: "profile", stages: [] },
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { ExecuteWritePlanParameters } from "@ensforge/sdk/batch";
```

### plan

`WritePlan`

Staged write plan.

### resume

`WritePlanProgress | undefined`

Previously returned progress used to continue the workflow.

Submitted sequential transactions retain their hashes when confirmation fails. Resuming confirms
those transactions before moving to the next call without resubmitting them.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
import type { WritePlanProgress } from "@ensforge/sdk/batch";
```

| Property          | Type                                                   | Description                                            |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `planId`          | `string`                                               | The planId value returned by the operation.            |
| `status`          | `"completed" \| "waiting" \| "partial" \| "submitted"` | Current query, transaction, batch, or workflow status. |
| `completedStages` | `readonly WriteStageResult[]`                          | The completedStages value returned by the operation.   |
| `currentStage`    | `string \| null`                                       | The currentStage value returned by the operation.      |
| `nextActionAt`    | `bigint \| null`                                       | The nextActionAt value returned by the operation.      |
| `failure`         | `WriteError \| null`                                   | The failure value returned by the operation.           |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.batch.executeWritePlan.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/sdk/error.md-->

## Action

- [`executeWritePlan`](/core/api/actions/batch/execute-write-plan)
