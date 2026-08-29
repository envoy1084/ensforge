---
title: clearPrimaryName
description: Clears primary name for primary-name and reverse resolution.
---

# clearPrimaryName

Clears primary name for primary-name and reverse resolution.

This action belongs to primary-name and reverse resolution. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { clearPrimaryName } from "@ensforge/core";
```

## Usage

```ts
import { clearPrimaryName } from "@ensforge/core";
import { config } from "./config";

const result = await clearPrimaryName(config, {});
```

## Parameters

```ts
type ClearPrimaryNameParameters = Parameters<typeof clearPrimaryName>[1];
```

### parameters

`ClearPrimaryNameParameters`

Argument passed to `clearPrimaryName`.

### options

`Effect.RunOptions | undefined`

Argument passed to `clearPrimaryName`.

## Return Type

```ts
type ClearPrimaryNameResult = Awaited<ReturnType<typeof clearPrimaryName>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = clearPrimaryName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = clearPrimaryName.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ClearPrimaryNameError = Effect.Effect.Error<ReturnType<typeof clearPrimaryName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
