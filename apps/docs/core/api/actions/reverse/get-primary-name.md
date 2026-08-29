---
title: getPrimaryName
description: Gets and optionally forward-verifies the primary name for an address.
---

# getPrimaryName

Gets and optionally forward-verifies the primary name for an address.

This action belongs to primary-name and reverse resolution. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getPrimaryName } from "@ensforge/core";
```

## Usage

```ts
import { getPrimaryName } from "@ensforge/core";
import { config } from "./config";

const result = await getPrimaryName(config, {
  address: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type GetPrimaryNameParameters = Parameters<typeof getPrimaryName>[1];
```

### address

`string`

Address used by this operation.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n` for Ethereum.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetPrimaryNameResult = Awaited<ReturnType<typeof getPrimaryName>>;
```

`{ readonly name: string & Brand<"NormalizedName">; readonly match: true; } | null`

## Effect

```ts
const effect = getPrimaryName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getPrimaryName.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetPrimaryNameError = Effect.Effect.Error<ReturnType<typeof getPrimaryName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
