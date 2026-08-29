---
title: clearRecords
description: Clears records for ENS resolver records.
---

# clearRecords

Clears records for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { clearRecords } from "@ensforge/core";
```

## Usage

```ts
import { clearRecords } from "@ensforge/core";
import { config } from "./config";

const result = await clearRecords(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type ClearRecordsParameters = Parameters<typeof clearRecords>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

## Return Type

```ts
type ClearRecordsResult = Awaited<ReturnType<typeof clearRecords>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = clearRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = clearRecords.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ClearRecordsError = Effect.Effect.Error<ReturnType<typeof clearRecords.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
