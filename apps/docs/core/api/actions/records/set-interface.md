---
title: setInterface
description: Sets interface for ENS resolver records.
---

# setInterface

Sets interface for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setInterface } from "@ensforge/core";
```

## Usage

```ts
import { setInterface } from "@ensforge/core";
import { config } from "./config";

const result = await setInterface(config, {
  name: "example.eth",
  interfaceId: "0x01ffc9a7",
  implementer: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type SetInterfaceParameters = Parameters<typeof setInterface>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### interfaceId

`string`

Four-byte ERC-165 interface identifier.

### implementer

`string`

Contract address that implements the interface.

## Return Type

```ts
type SetInterfaceResult = Awaited<ReturnType<typeof setInterface>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setInterface.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setInterface.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetInterfaceError = Effect.Effect.Error<ReturnType<typeof setInterface.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
