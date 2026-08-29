---
title: setContentHash
description: Sets content hash for ENS resolver records.
---

# setContentHash

Sets content hash for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setContentHash } from "@ensforge/core";
```

## Usage

```ts
import { setContentHash } from "@ensforge/core";
import { config } from "./config";

const result = await setContentHash(config, {
  name: "example.eth",
  protocol: "ipfs",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetContentHashParameters = Parameters<typeof setContentHash>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### protocol

`ContentHashProtocol`

Content-addressed protocol used to encode the record.

### value

`string`

Value written by the operation.

## Return Type

```ts
type SetContentHashResult = Awaited<ReturnType<typeof setContentHash>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setContentHash.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setContentHash.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetContentHashError = Effect.Effect.Error<ReturnType<typeof setContentHash.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
