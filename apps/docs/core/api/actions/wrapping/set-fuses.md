---
title: setFuses
description: Sets fuses for wrapped names, expiries, and fuses.
---

# setFuses

Sets fuses for wrapped names, expiries, and fuses.

This action belongs to wrapped names, expiries, and fuses. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setFuses } from "@ensforge/core";
```

## Usage

```ts
import { setFuses } from "@ensforge/core";
import { config } from "./config";

const result = await setFuses(config, {
  name: "example.eth",
  fuses: [],
});
```

## Parameters

```ts
type SetFusesParameters = Parameters<typeof setFuses>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### fuses

`number | ReadonlyArray<NameWrapperFuseName>`

Value used for `fuses` by this action.

## Return Type

```ts
type SetFusesResult = Awaited<ReturnType<typeof setFuses>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setFuses.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setFuses.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetFusesError = Effect.Effect.Error<ReturnType<typeof setFuses.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
