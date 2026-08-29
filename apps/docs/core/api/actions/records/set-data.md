---
title: setData
description: Sets data for ENS resolver records.
---

# setData

Sets data for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setData } from "@ensforge/core";
```

## Usage

```ts
import { setData } from "@ensforge/core";
import { config } from "./config";

const result = await setData(config, {
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetDataParameters = Parameters<typeof setData>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### key

`string`

Record key.

### value

`Hex`

Value written by the operation.

## Return Type

```ts
type SetDataResult = Awaited<ReturnType<typeof setData>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setData.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setData.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetDataError = Effect.Effect.Error<ReturnType<typeof setData.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
