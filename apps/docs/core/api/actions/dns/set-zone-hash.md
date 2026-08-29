---
title: setZoneHash
description: Sets zone hash for DNSSEC names and DNS resolver records.
---

# setZoneHash

Sets zone hash for DNSSEC names and DNS resolver records.

This action belongs to DNSSEC names and DNS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setZoneHash } from "@ensforge/core";
```

## Usage

```ts
import { setZoneHash } from "@ensforge/core";
import { config } from "./config";

const result = await setZoneHash(config, {
  name: "example.eth",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetZoneHashParameters = Parameters<typeof setZoneHash>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### value

`Hex`

Value written by the operation.

## Return Type

```ts
type SetZoneHashResult = Awaited<ReturnType<typeof setZoneHash>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setZoneHash.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setZoneHash.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetZoneHashError = Effect.Effect.Error<ReturnType<typeof setZoneHash.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
