---
title: readBatchSettled
description: Executes a read batch and preserves each result or failure.
---

# readBatchSettled

Executes a read batch and preserves each result or failure.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.batch.readBatchSettled({
  owner: sdk.name.getOwner.request({ name: "ens.eth" }),
});
```

## Parameters

```ts
type ReadBatchSettledParameters = Parameters<typeof sdk.batch.readBatchSettled>[0];
```

### requests

`Requests`

Argument passed to `readBatchSettled`.

### options

`ReadExecutionOptions | undefined`

Argument passed to `readBatchSettled`.

### runOptions

`Effect.RunOptions | undefined`

Argument passed to `readBatchSettled`.

## Return Type

```ts
type ReadBatchSettledResult = Awaited<ReturnType<typeof sdk.batch.readBatchSettled>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.batch.readBatchSettled.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`readBatchSettled`](/core/api/actions/batch/read-batch-settled)
