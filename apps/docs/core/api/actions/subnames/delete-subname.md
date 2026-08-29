---
title: deleteSubname
description: Deletes subname from subname management.
---

# deleteSubname

Deletes subname from subname management.

This action belongs to subname management. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { deleteSubname } from "@ensforge/core";
```

## Usage

```ts
import { deleteSubname } from "@ensforge/core";
import { config } from "./config";

const result = await deleteSubname(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type DeleteSubnameParameters = Parameters<typeof deleteSubname>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

## Return Type

```ts
type DeleteSubnameResult = Awaited<ReturnType<typeof deleteSubname>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = deleteSubname.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = deleteSubname.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type DeleteSubnameError = Effect.Effect.Error<ReturnType<typeof deleteSubname.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
