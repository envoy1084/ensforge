---
title: setSubnameManager
description: Sets subname manager for subname management.
---

# setSubnameManager

Sets subname manager for subname management.

This action belongs to subname management. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setSubnameManager } from "@ensforge/core";
```

## Usage

```ts
import { setSubnameManager } from "@ensforge/core";
import { config } from "./config";

const result = await setSubnameManager(config, {
  manager: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

## Parameters

```ts
type SetSubnameManagerParameters = Parameters<typeof setSubnameManager>[1];
```

### manager

`string`

Address that should manage the name.

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

## Return Type

```ts
type SetSubnameManagerResult = Awaited<ReturnType<typeof setSubnameManager>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setSubnameManager.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setSubnameManager.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetSubnameManagerError = Effect.Effect.Error<ReturnType<typeof setSubnameManager.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
