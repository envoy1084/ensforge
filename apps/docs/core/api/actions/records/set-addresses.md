---
title: setAddresses
description: Sets addresses for ENS resolver records.
---

# setAddresses

Sets addresses for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setAddresses } from "@ensforge/core";
```

## Usage

```ts
import { setAddresses } from "@ensforge/core";
import { config } from "./config";

const result = await setAddresses(config, {
  name: "example.eth",
  addresses: [{ coinType: 60n, address: "0x0000000000000000000000000000000000000001" }],
});
```

## Parameters

```ts
type SetAddressesParameters = Parameters<typeof setAddresses>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### addresses

`ReadonlyArray<AddressRecordInput>`

Coin address records to set.

## Return Type

```ts
type SetAddressesResult = Awaited<ReturnType<typeof setAddresses>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setAddresses.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setAddresses.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetAddressesError = Effect.Effect.Error<ReturnType<typeof setAddresses.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
