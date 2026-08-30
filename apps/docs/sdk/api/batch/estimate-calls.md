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

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.batch.estimateCalls({
  calls: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { EstimateCallsParameters } from "@ensforge/sdk";
```

### calls

`ReadonlyArray<EnsWriteIntent<unknown, WriteError>>`

Read requests or write intents included in the operation.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
import type { EstimateCallsResult } from "@ensforge/sdk";
```

| Property      | Type                                                                                                    | Description                                             |
| ------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `blockNumber` | `bigint`                                                                                                | The blockNumber value returned by the operation.        |
| `fee`         | `FeeEstimate`                                                                                           | The fee value returned by the operation.                |
| `calls`       | `readonly CallEstimate[]`                                                                               | Per-call preparation, simulation, or execution results. |
| `totals`      | `{ readonly gas: bigint; readonly fee: bigint; readonly value: bigint; readonly maximumCost: bigint; }` | The totals value returned by the operation.             |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.batch.estimateCalls.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/sdk/error.md-->

## Action

- [`estimateCalls`](/core/api/actions/batch/estimate-calls)
