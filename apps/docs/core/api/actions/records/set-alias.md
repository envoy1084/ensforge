---
title: setAlias
description: Sets alias for ENS resolver records.
---

# setAlias

Sets alias for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setAlias } from "@ensforge/core";
```

## Usage

```ts
import { setAlias } from "@ensforge/core";
import { config } from "./config";

const result = await setAlias(config, {
  name: "example.eth",
  target: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type SetAliasParameters = Parameters<typeof setAlias>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### target

`string | null`

Target selected by the operation.

## Return Type

```ts
type SetAliasResult = Awaited<ReturnType<typeof setAlias>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setAlias.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setAlias.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetAliasError = Effect.Effect.Error<ReturnType<typeof setAlias.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
