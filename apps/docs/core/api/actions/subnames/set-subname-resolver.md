---
title: setSubnameResolver
description: Sets subname resolver for subname management.
---

# setSubnameResolver

Sets subname resolver for subname management.

This action belongs to subname management. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setSubnameResolver } from "@ensforge/core";
```

## Usage

```ts
import { setSubnameResolver } from "@ensforge/core";
import { config } from "./config";

const result = await setSubnameResolver(config, {
  resolver: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

## Parameters

```ts
type SetSubnameResolverParameters = Parameters<typeof setSubnameResolver>[1];
```

### resolver

`string`

Resolver address used by the operation.

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

## Return Type

```ts
type SetSubnameResolverResult = Awaited<ReturnType<typeof setSubnameResolver>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setSubnameResolver.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setSubnameResolver.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetSubnameResolverError = Effect.Effect.Error<ReturnType<typeof setSubnameResolver.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
