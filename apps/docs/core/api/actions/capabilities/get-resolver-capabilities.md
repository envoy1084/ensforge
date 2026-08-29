---
title: getResolverCapabilities
description: Gets resolver capabilities for ENS permissions and contract capabilities.
---

# getResolverCapabilities

Gets resolver capabilities for ENS permissions and contract capabilities.

This action belongs to ENS permissions and contract capabilities. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getResolverCapabilities } from "@ensforge/core";
```

## Usage

```ts
import { getResolverCapabilities } from "@ensforge/core";
import { config } from "./config";

const result = await getResolverCapabilities(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetResolverCapabilitiesParameters = Parameters<typeof getResolverCapabilities>[1];
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

## Return Type

```ts
type GetResolverCapabilitiesResult = Awaited<ReturnType<typeof getResolverCapabilities>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getResolverCapabilities.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getResolverCapabilities.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetResolverCapabilitiesError = Effect.Effect.Error<
  ReturnType<typeof getResolverCapabilities.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
