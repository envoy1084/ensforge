---
title: setPrimaryNameForAddress
description: Sets primary name for address for primary-name and reverse resolution.
---

# setPrimaryNameForAddress

Sets primary name for address for primary-name and reverse resolution.

This action belongs to primary-name and reverse resolution. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setPrimaryNameForAddress } from "@ensforge/core";
```

## Usage

```ts
import { setPrimaryNameForAddress } from "@ensforge/core";
import { config } from "./config";

const result = await setPrimaryNameForAddress(config, {
  address: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

## Parameters

```ts
type SetPrimaryNameForAddressParameters = Parameters<typeof setPrimaryNameForAddress>[1];
```

### address

`string`

Address used by this operation.

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### verifyForward

`boolean | undefined`

Whether a reverse result must resolve forward to the supplied address.

## Return Type

```ts
type SetPrimaryNameForAddressResult = Awaited<ReturnType<typeof setPrimaryNameForAddress>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setPrimaryNameForAddress.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setPrimaryNameForAddress.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetPrimaryNameForAddressError = Effect.Effect.Error<
  ReturnType<typeof setPrimaryNameForAddress.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
