---
title: resolveBatch
description: Resolves multiple Universal Resolver calls.
---

# resolveBatch

Resolves multiple Universal Resolver calls.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.resolution.resolveBatch({
  calls: [],
});
```

## Parameters

```ts
type ResolveBatchParameters = Parameters<typeof sdk.resolution.resolveBatch>[0];
```

### calls

`ReadonlyArray<ResolveBatchCall>`

Read requests or write intents included in the operation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type ResolveBatchResult = Awaited<ReturnType<typeof sdk.resolution.resolveBatch>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.resolution.resolveBatch.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.resolution.resolveBatch.request(parameters);
```

## Action

- [`resolveBatch`](/core/api/actions/resolution/resolve-batch)
