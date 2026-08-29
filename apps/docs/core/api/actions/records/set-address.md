---
title: setAddress
description: Sets address for ENS resolver records.
---

# setAddress

Sets address for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setAddress } from "@ensforge/core";
```

## Usage

```ts
import { setAddress } from "@ensforge/core";
import { config } from "./config";

const result = await setAddress(config, {
  name: "example.eth",
  address: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type SetAddressParameters = Parameters<typeof setAddress>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n` for Ethereum.

### address

`string`

Address used by this operation.

## Return Type

```ts
type SetAddressResult = Awaited<ReturnType<typeof setAddress>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setAddress.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setAddress.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetAddressError = Effect.Effect.Error<ReturnType<typeof setAddress.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
