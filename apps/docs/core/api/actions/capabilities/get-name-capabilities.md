---
title: getNameCapabilities
description: Gets name capabilities for ENS permissions and contract capabilities.
---

# getNameCapabilities

Gets name capabilities for ENS permissions and contract capabilities.

This action belongs to ENS permissions and contract capabilities. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getNameCapabilities } from "@ensforge/core";
```

## Usage

```ts
import { getNameCapabilities } from "@ensforge/core";
import { config } from "./config";

const result = await getNameCapabilities(config, {
  name: "example.eth",
  account: {},
});
```

## Parameters

```ts
type GetNameCapabilitiesParameters = Parameters<typeof getNameCapabilities>[1];
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

### records

`ReadonlyArray<RecordOperation> | undefined`

Records selected, read, or written by the operation.

## Return Type

```ts
type GetNameCapabilitiesResult = Awaited<ReturnType<typeof getNameCapabilities>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getNameCapabilities.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getNameCapabilities.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetNameCapabilitiesError = Effect.Effect.Error<ReturnType<typeof getNameCapabilities.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
