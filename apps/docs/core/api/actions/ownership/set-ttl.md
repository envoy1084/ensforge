---
title: setTtl
description: Sets ttl for name ownership and registry management.
---

# setTtl

Sets ttl for name ownership and registry management.

This action belongs to name ownership and registry management. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setTtl } from "@ensforge/core";
```

## Usage

```ts
import { setTtl } from "@ensforge/core";
import { config } from "./config";

const result = await setTtl(config, {
  name: "example.eth",
  ttl: 300n,
});
```

## Parameters

```ts
type SetTtlParameters = Parameters<typeof setTtl>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### ttl

`bigint`

Registry time-to-live in seconds.

## Return Type

```ts
type SetTtlResult = Awaited<ReturnType<typeof setTtl>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setTtl.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setTtl.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetTtlError = Effect.Effect.Error<ReturnType<typeof setTtl.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
