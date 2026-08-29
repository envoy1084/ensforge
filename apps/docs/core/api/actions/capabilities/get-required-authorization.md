---
title: getRequiredAuthorization
description: Determines the authorization required by a proposed ENS write.
---

# getRequiredAuthorization

Determines the authorization required by a proposed ENS write.

This action belongs to ENS permissions and contract capabilities. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getRequiredAuthorization } from "@ensforge/core";
```

## Usage

```ts
import { getRequiredAuthorization } from "@ensforge/core";
import { config } from "./config";

const result = await getRequiredAuthorization(config, {
  name: "example.eth",
  account: {},
  operation: {},
});
```

## Parameters

```ts
type GetRequiredAuthorizationParameters = Parameters<typeof getRequiredAuthorization>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### account

`EthereumAddress`

Account used for authorization and wallet execution.

### operation

`WriteOperation`

Write operation whose authorization should be resolved.

## Return Type

```ts
type GetRequiredAuthorizationResult = Awaited<ReturnType<typeof getRequiredAuthorization>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getRequiredAuthorization.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getRequiredAuthorization.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetRequiredAuthorizationError = Effect.Effect.Error<
  ReturnType<typeof getRequiredAuthorization.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
