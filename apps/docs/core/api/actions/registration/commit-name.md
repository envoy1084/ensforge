---
title: commitName
description: commit name for registration and renewal.
---

# commitName

commit name for registration and renewal.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { commitName } from "@ensforge/core";
```

## Usage

```ts
import { commitName } from "@ensforge/core";
import { config } from "./config";

const result = await commitName(config, {
  commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type CommitNameParameters = Parameters<typeof commitName>[1];
```

### commitment

`Bytes32`

Registration commitment to submit or inspect.

## Return Type

```ts
type CommitNameResult = Awaited<ReturnType<typeof commitName>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = commitName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = commitName.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type CommitNameError = Effect.Effect.Error<ReturnType<typeof commitName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
