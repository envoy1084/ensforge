---
title: getOwner
description: Gets the effective owner and ownership source of an ENS name.
---

# getOwner

Gets the effective owner and ownership source of an ENS name.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.name.getOwner({
  name: "example.eth",
});
```

## Parameters

```ts
type GetOwnerParameters = Parameters<typeof sdk.name.getOwner>[0];
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
type GetOwnerResult = Awaited<ReturnType<typeof sdk.name.getOwner>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.name.getOwner.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.name.getOwner.request(parameters);
```

## Action

- [`getOwner`](/core/api/actions/name/get-owner)
