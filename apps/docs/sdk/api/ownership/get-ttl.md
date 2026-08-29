---
title: getTtl
description: Gets ttl for ownership management.
---

# getTtl

Gets ttl for ownership management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.ownership.getTtl({
  name: "example.eth",
});
```

## Parameters

```ts
type GetTtlParameters = Parameters<typeof sdk.ownership.getTtl>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetTtlResult = Awaited<ReturnType<typeof sdk.ownership.getTtl>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.ownership.getTtl.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.ownership.getTtl.request(parameters);
```

## Action

- [`getTtl`](/core/api/actions/ownership/get-ttl)
