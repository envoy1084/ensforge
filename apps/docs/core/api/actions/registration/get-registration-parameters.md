---
title: getRegistrationParameters
description: Gets registration parameters for registration and renewal.
---

# getRegistrationParameters

Gets registration parameters for registration and renewal.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getRegistrationParameters } from "@ensforge/core";
```

## Usage

```ts
import { getRegistrationParameters } from "@ensforge/core";
import { config } from "./config";

const result = await getRegistrationParameters(config, {});
```

## Parameters

```ts
type GetRegistrationParametersParameters = Parameters<typeof getRegistrationParameters>[1];
```

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetRegistrationParametersResult = Awaited<ReturnType<typeof getRegistrationParameters>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getRegistrationParameters.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getRegistrationParameters.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetRegistrationParametersError = Effect.Effect.Error<
  ReturnType<typeof getRegistrationParameters.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
