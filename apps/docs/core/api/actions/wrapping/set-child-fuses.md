---
title: setChildFuses
description: Sets child fuses for wrapped names, expiries, and fuses.
---

# setChildFuses

Sets child fuses for wrapped names, expiries, and fuses.

This action belongs to wrapped names, expiries, and fuses. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setChildFuses } from "@ensforge/core";
```

## Usage

```ts
import { setChildFuses } from "@ensforge/core";
import { config } from "./config";

const result = await setChildFuses(config, {
  expiry: 2_000_000_000n,
  name: "example.eth",
  fuses: [],
});
```

## Parameters

```ts
type SetChildFusesParameters = Parameters<typeof setChildFuses>[1];
```

### expiry

`bigint`

Unix timestamp for the requested expiry.

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### fuses

`number | ReadonlyArray<NameWrapperFuseName>`

Value used for `fuses` by this action.

## Return Type

```ts
type SetChildFusesResult = Awaited<ReturnType<typeof setChildFuses>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setChildFuses.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setChildFuses.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetChildFusesError = Effect.Effect.Error<ReturnType<typeof setChildFuses.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
