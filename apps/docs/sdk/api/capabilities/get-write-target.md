---
title: getWriteTarget
description: Gets write target for capability and authorization discovery.
---

# getWriteTarget

Gets write target for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.capabilities.getWriteTarget({
  name: "example.eth",
  operation: {},
});
```

## Parameters

```ts
type GetWriteTargetParameters = Parameters<typeof sdk.capabilities.getWriteTarget>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### operation

`WriteOperation`

Value used for `operation` by this method.

## Return Type

```ts
type GetWriteTargetResult = Awaited<ReturnType<typeof sdk.capabilities.getWriteTarget>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.capabilities.getWriteTarget.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.capabilities.getWriteTarget.request(parameters);
```

## Action

- [`getWriteTarget`](/core/api/actions/capabilities/get-write-target)
