---
title: setAvatar
description: Sets avatar for ENS resolver records.
---

# setAvatar

Sets avatar for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setAvatar } from "@ensforge/core";
```

## Usage

```ts
import { setAvatar } from "@ensforge/core";
import { config } from "./config";

const result = await setAvatar(config, {
  name: "example.eth",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetAvatarParameters = Parameters<typeof setAvatar>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### value

`string`

Value written by the operation.

## Return Type

```ts
type SetAvatarResult = Awaited<ReturnType<typeof setAvatar>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setAvatar.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setAvatar.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetAvatarError = Effect.Effect.Error<ReturnType<typeof setAvatar.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
