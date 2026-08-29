---
title: resolve
description: Resolves calldata through the active Universal Resolver.
---

# resolve

Resolves calldata through the active Universal Resolver.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.resolution.resolve({
  name: "example.eth",
  data: "0x",
});
```

## Parameters

```ts
type ResolveParameters = Parameters<typeof sdk.resolution.resolve>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### data

`string`

Raw calldata or record bytes.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type ResolveResult = Awaited<ReturnType<typeof sdk.resolution.resolve>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.resolution.resolve.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.resolution.resolve.request(parameters);
```

## Action

- [`resolve`](/core/api/actions/resolution/resolve)
