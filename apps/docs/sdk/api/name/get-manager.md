---
title: getManager
description: Gets manager for name state.
---

# getManager

Gets manager for name state.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.name.getManager({
  name: "example.eth",
});
```

## Parameters

```ts
type GetManagerParameters = Parameters<typeof sdk.name.getManager>[0];
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

## Return Type

```ts
type GetManagerResult = Awaited<ReturnType<typeof sdk.name.getManager>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.name.getManager.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.name.getManager.request(parameters);
```

## Action

- [`getManager`](/core/api/actions/name/get-manager)
