---
title: unwrapName
description: Removes name from its wrapper.
---

# unwrapName

Removes name from its wrapper.

This action belongs to wrapped names, expiries, and fuses. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { unwrapName } from "@ensforge/core";
```

## Usage

```ts
import { unwrapName } from "@ensforge/core";
import { config } from "./config";

const result = await unwrapName(config, {
  name: "example.eth",
  manager: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type UnwrapNameParameters = Parameters<typeof unwrapName>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### manager

`string`

Address that should manage the name.

### registrant

`string | undefined`

Address that should own the registrar token.

## Return Type

```ts
type UnwrapNameResult = Awaited<ReturnType<typeof unwrapName>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = unwrapName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = unwrapName.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type UnwrapNameError = Effect.Effect.Error<ReturnType<typeof unwrapName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
