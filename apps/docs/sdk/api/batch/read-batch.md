---
title: readBatch
description: Executes typed read requests with configuration already bound.
---

# readBatch

Executes typed read requests with configuration already bound.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.batch.readBatch({
  owner: sdk.name.getOwner.request({ name: "ens.eth" }),
});
```

## Parameters

```ts
type ReadBatchParameters = Parameters<typeof sdk.batch.readBatch>[0];
```

### requests

`Requests`

Argument passed to `readBatch`.

### options

`ReadExecutionOptions | undefined`

Argument passed to `readBatch`.

### runOptions

`Effect.RunOptions | undefined`

Argument passed to `readBatch`.

## Return Type

```ts
type ReadBatchResult = Awaited<ReturnType<typeof sdk.batch.readBatch>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.batch.readBatch.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`readBatch`](/core/api/actions/batch/read-batch)
