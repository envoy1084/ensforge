---
title: setSubnameExpiry
description: Sets subname expiry for subname management.
---

# setSubnameExpiry

Sets subname expiry for subname management.

This action belongs to subname management. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setSubnameExpiry } from "@ensforge/core";
```

## Usage

```ts
import { setSubnameExpiry } from "@ensforge/core";
import { config } from "./config";

const result = await setSubnameExpiry(config, {
  expiry: 2_000_000_000n,
  name: "example.eth",
});
```

## Parameters

```ts
type SetSubnameExpiryParameters = Parameters<typeof setSubnameExpiry>[1];
```

### expiry

`bigint`

Unix timestamp for the requested expiry.

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

## Return Type

```ts
type SetSubnameExpiryResult = Awaited<ReturnType<typeof setSubnameExpiry>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setSubnameExpiry.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setSubnameExpiry.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetSubnameExpiryError = Effect.Effect.Error<ReturnType<typeof setSubnameExpiry.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
