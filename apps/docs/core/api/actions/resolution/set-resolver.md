---
title: setResolver
description: Sets resolver for resolver discovery and Universal Resolver calls.
---

# setResolver

Sets resolver for resolver discovery and Universal Resolver calls.

This action belongs to resolver discovery and Universal Resolver calls. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setResolver } from "@ensforge/core";
```

## Usage

```ts
import { setResolver } from "@ensforge/core";
import { config } from "./config";

const result = await setResolver(config, {
  name: "example.eth",
  resolver: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type SetResolverParameters = Parameters<typeof setResolver>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### resolver

`string`

Resolver address used by the operation.

## Return Type

```ts
type SetResolverResult = Awaited<ReturnType<typeof setResolver>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setResolver.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setResolver.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetResolverError = Effect.Effect.Error<ReturnType<typeof setResolver.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
