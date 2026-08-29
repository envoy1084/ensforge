---
title: getAbi
description: Gets abi for ENS resolver records.
---

# getAbi

Gets abi for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getAbi } from "@ensforge/core";
```

## Usage

```ts
import { getAbi } from "@ensforge/core";
import { config } from "./config";

const result = await getAbi(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetAbiParameters = Parameters<typeof getAbi>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### contentTypes

`ReadonlyArray<AbiContentType> | undefined`

ABI content types attempted in priority order.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetAbiResult = Awaited<ReturnType<typeof getAbi>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getAbi.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getAbi.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetAbiError = Effect.Effect.Error<ReturnType<typeof getAbi.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
