---
title: reclaimName
description: reclaim name for name ownership and registry management.
---

# reclaimName

reclaim name for name ownership and registry management.

This action belongs to name ownership and registry management. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { reclaimName } from "@ensforge/core";
```

## Usage

```ts
import { reclaimName } from "@ensforge/core";
import { config } from "./config";

const result = await reclaimName(config, {
  name: "example.eth",
  manager: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type ReclaimNameParameters = Parameters<typeof reclaimName>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### manager

`string`

Address that should manage the name.

## Return Type

```ts
type ReclaimNameResult = Awaited<ReturnType<typeof reclaimName>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = reclaimName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = reclaimName.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ReclaimNameError = Effect.Effect.Error<ReturnType<typeof reclaimName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
