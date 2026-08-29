---
title: getResolverVersion
description: Gets resolver version for resolution and resolver lifecycle.
---

# getResolverVersion

Gets resolver version for resolution and resolver lifecycle.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.resolution.getResolverVersion({
  name: "example.eth",
});
```

## Parameters

```ts
type GetResolverVersionParameters = Parameters<typeof sdk.resolution.getResolverVersion>[0];
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
type GetResolverVersionResult = Awaited<ReturnType<typeof sdk.resolution.getResolverVersion>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.resolution.getResolverVersion.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.resolution.getResolverVersion.request(parameters);
```

## Action

- [`getResolverVersion`](/core/api/actions/resolution/get-resolver-version)
