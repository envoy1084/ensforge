---
title: resolveWithResolver
description: Resolves calldata against an explicit resolver.
---

# resolveWithResolver

Resolves calldata against an explicit resolver.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.resolution.resolveWithResolver({
  name: "example.eth",
  data: "0x",
  resolverAddress: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type ResolveWithResolverParameters = Parameters<typeof sdk.resolution.resolveWithResolver>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### data

`string`

Raw calldata or record bytes.

### resolverAddress

`string`

Explicit resolver contract.

### gateways

`ReadonlyArray<string> | undefined`

DNS gateway endpoints.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type ResolveWithResolverResult = Awaited<ReturnType<typeof sdk.resolution.resolveWithResolver>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.resolution.resolveWithResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.resolution.resolveWithResolver.request(parameters);
```

## Action

- [`resolveWithResolver`](/core/api/actions/resolution/resolve-with-resolver)
