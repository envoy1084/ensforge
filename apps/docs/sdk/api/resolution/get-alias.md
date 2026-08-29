---
title: getAlias
description: Gets alias for resolution and resolver lifecycle.
---

# getAlias

Gets alias for resolution and resolver lifecycle.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.resolution.getAlias({
  name: "example.eth",
});
```

## Parameters

```ts
type GetAliasParameters = Parameters<typeof sdk.resolution.getAlias>[0];
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
type GetAliasResult = Awaited<ReturnType<typeof sdk.resolution.getAlias>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.resolution.getAlias.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.resolution.getAlias.request(parameters);
```

## Action

- [`getAlias`](/core/api/actions/resolution/get-alias)
