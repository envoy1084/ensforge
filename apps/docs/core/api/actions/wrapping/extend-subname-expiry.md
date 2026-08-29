---
title: extendSubnameExpiry
description: Extends subname expiry for wrapped names, expiries, and fuses.
---

# extendSubnameExpiry

Extends subname expiry for wrapped names, expiries, and fuses.

This action belongs to wrapped names, expiries, and fuses. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { extendSubnameExpiry } from "@ensforge/core";
```

## Usage

```ts
import { extendSubnameExpiry } from "@ensforge/core";
import { config } from "./config";

const result = await extendSubnameExpiry(config, {
  name: "example.eth",
  expiry: 2_000_000_000n,
});
```

## Parameters

```ts
type ExtendSubnameExpiryParameters = Parameters<typeof extendSubnameExpiry>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### expiry

`bigint`

Unix timestamp for the requested expiry.

## Return Type

```ts
type ExtendSubnameExpiryResult = Awaited<ReturnType<typeof extendSubnameExpiry>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = extendSubnameExpiry.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = extendSubnameExpiry.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ExtendSubnameExpiryError = Effect.Effect.Error<ReturnType<typeof extendSubnameExpiry.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
