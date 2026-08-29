---
title: executeWritePlan
description: Executes a staged ENS write plan and returns resumable progress.
---

# executeWritePlan

Executes a staged ENS write plan and returns resumable progress.

## Import

```ts
import { executeWritePlan } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { executeWritePlan } from "@ensforge/core";
import { config } from "./config";

const result = await executeWritePlan(config, {
  plan: { id: "profile", stages: [] },
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { ExecuteWritePlanParameters } from "@ensforge/core";
```

### plan

`WritePlan`

Staged write plan to execute.

### resume

`WritePlanProgress | undefined`

Previously returned progress used to continue an incomplete workflow.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
import type { WritePlanProgress } from "@ensforge/core";
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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = executeWritePlan.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.batch.executeWritePlan`](/sdk/api/batch/execute-write-plan)
