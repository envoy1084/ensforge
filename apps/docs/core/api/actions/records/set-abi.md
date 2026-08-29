---
title: setAbi
description: Sets abi for ENS resolver records.
---

# setAbi

Sets abi for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setAbi } from "@ensforge/core";
```

## Usage

```ts
import { setAbi } from "@ensforge/core";
import { config } from "./config";

const result = await setAbi(config, {
  name: "example.eth",
  contentType: "json",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetAbiParameters = Parameters<typeof setAbi>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### contentType

`Exclude<AbiContentType, "uri">`

Encoding used for the ABI record.

### value

`Abi`

Value written by the operation.

## Return Type

```ts
type SetAbiResult = Awaited<ReturnType<typeof setAbi>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setAbi.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setAbi.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetAbiError = Effect.Effect.Error<ReturnType<typeof setAbi.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
