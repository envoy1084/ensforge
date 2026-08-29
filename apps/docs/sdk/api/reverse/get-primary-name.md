---
title: getPrimaryName
description: Gets primary name for reverse resolution.
---

# getPrimaryName

Gets primary name for reverse resolution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.reverse.getPrimaryName({
  address: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type GetPrimaryNameParameters = Parameters<typeof sdk.reverse.getPrimaryName>[0];
```

### address

`string`

Address used by the method.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n`.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetPrimaryNameResult = Awaited<ReturnType<typeof sdk.reverse.getPrimaryName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.reverse.getPrimaryName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.reverse.getPrimaryName.request(parameters);
```

## Action

- [`getPrimaryName`](/core/api/actions/reverse/get-primary-name)
