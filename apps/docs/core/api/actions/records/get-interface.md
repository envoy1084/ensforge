---
title: getInterface
description: Gets interface for ENS resolver records.
---

# getInterface

Gets interface for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getInterface } from "@ensforge/core";
```

## Usage

```ts
import { getInterface } from "@ensforge/core";
import { config } from "./config";

const result = await getInterface(config, {
  name: "example.eth",
  interfaceId: "0x01ffc9a7",
});
```

## Parameters

```ts
type GetInterfaceParameters = Parameters<typeof getInterface>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### interfaceId

`string`

Four-byte ERC-165 interface identifier.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetInterfaceResult = Awaited<ReturnType<typeof getInterface>>;
```

`{ readonly interfaceId: `0x${string}` & Brand<"InterfaceId">; readonly implementer: `0x${string}` | null; }`

## Effect

```ts
const effect = getInterface.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getInterface.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetInterfaceError = Effect.Effect.Error<ReturnType<typeof getInterface.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
