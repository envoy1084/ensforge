---
title: clearAvatar
description: Clears avatar for ENS resolver records.
---

# clearAvatar

Clears avatar for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { clearAvatar } from "@ensforge/core";
```

## Usage

```ts
import { clearAvatar } from "@ensforge/core";
import { config } from "./config";

const result = await clearAvatar(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type ClearAvatarParameters = Parameters<typeof clearAvatar>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

## Return Type

```ts
type ClearAvatarResult = Awaited<ReturnType<typeof clearAvatar>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = clearAvatar.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = clearAvatar.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ClearAvatarError = Effect.Effect.Error<ReturnType<typeof clearAvatar.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
