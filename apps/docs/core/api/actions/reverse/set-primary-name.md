---
title: setPrimaryName
description: Sets primary name for primary-name and reverse resolution.
---

# setPrimaryName

Sets primary name for primary-name and reverse resolution.

This action belongs to primary-name and reverse resolution. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setPrimaryName } from "@ensforge/core";
```

## Usage

```ts
import { setPrimaryName } from "@ensforge/core";
import { config } from "./config";

const result = await setPrimaryName(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type SetPrimaryNameParameters = Parameters<typeof setPrimaryName>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### verifyForward

`boolean | undefined`

Whether a reverse result must resolve forward to the supplied address.

## Return Type

```ts
type SetPrimaryNameResult = Awaited<ReturnType<typeof setPrimaryName>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setPrimaryName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setPrimaryName.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetPrimaryNameError = Effect.Effect.Error<ReturnType<typeof setPrimaryName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
