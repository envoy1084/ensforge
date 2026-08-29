---
title: resolveWithResolver
description: Resolves arbitrary calldata against an explicit resolver.
---

# resolveWithResolver

Resolves arbitrary calldata against an explicit resolver.

This action belongs to resolver discovery and Universal Resolver calls. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { resolveWithResolver } from "@ensforge/core";
```

## Usage

```ts
import { resolveWithResolver } from "@ensforge/core";
import { config } from "./config";

const result = await resolveWithResolver(config, {
  name: "example.eth",
  data: "0x",
  resolverAddress: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type ResolveWithResolverParameters = Parameters<typeof resolveWithResolver>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### data

`string`

Raw calldata or resolver bytes.

### resolverAddress

`string`

Explicit resolver contract address.

### gateways

`ReadonlyArray<string> | undefined`

DNS gateway endpoints used to obtain proofs.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type ResolveWithResolverResult = Awaited<ReturnType<typeof resolveWithResolver>>;
```

`{ readonly data: `0x${string}`; readonly resolverAddress: `0x${string}`; }`

## Effect

```ts
const effect = resolveWithResolver.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = resolveWithResolver.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ResolveWithResolverError = Effect.Effect.Error<ReturnType<typeof resolveWithResolver.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
