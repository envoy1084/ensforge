---
title: setText
description: Sets text for ENS resolver records.
---

# setText

Sets text for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setText } from "@ensforge/core";
```

## Usage

```ts
import { setText } from "@ensforge/core";
import { config } from "./config";

const result = await setText(config, {
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetTextParameters = Parameters<typeof setText>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### key

`string`

Record key.

### value

`string`

Value written by the operation.

## Return Type

```ts
type SetTextResult = Awaited<ReturnType<typeof setText>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setText.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setText.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetTextError = Effect.Effect.Error<ReturnType<typeof setText.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
