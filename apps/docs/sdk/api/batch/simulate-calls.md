---
title: simulateCalls
description: simulate calls for batch execution.
---

# simulateCalls

simulate calls for batch execution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.batch.simulateCalls({
  calls: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SimulateCallsParameters } from "@ensforge/sdk/batch";
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
type SimulateCallsResult = Awaited<ReturnType<typeof simulateCalls>>;
```

Returns `readonly SimulatedWriteCall[]`.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.batch.simulateCalls.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/sdk/error.md-->

## Action

- [`simulateCalls`](/core/api/actions/batch/simulate-calls)
