---
title: transferRegistrant
description: Transfers registrant through the active ENS ownership route.
---

# transferRegistrant

Transfers registrant through the active ENS ownership route.

This action belongs to name ownership and registry management. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { transferRegistrant } from "@ensforge/core";
```

## Usage

```ts
import { transferRegistrant } from "@ensforge/core";
import { config } from "./config";

const result = await transferRegistrant(config, {
  name: "example.eth",
  to: "value",
});
```

## Parameters

```ts
type TransferRegistrantParameters = Parameters<typeof transferRegistrant>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### to

`string`

Value used for `to` by this action.

## Return Type

```ts
type TransferRegistrantResult = Awaited<ReturnType<typeof transferRegistrant>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = transferRegistrant.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = transferRegistrant.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type TransferRegistrantError = Effect.Effect.Error<ReturnType<typeof transferRegistrant.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
