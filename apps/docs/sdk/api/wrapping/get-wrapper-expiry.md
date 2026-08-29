---
title: getWrapperExpiry
description: Gets wrapper expiry for wrapped names.
---

# getWrapperExpiry

Gets wrapper expiry for wrapped names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.wrapping.getWrapperExpiry({
  name: "example.eth",
});
```

## Parameters

```ts
type GetWrapperExpiryParameters = Parameters<typeof sdk.wrapping.getWrapperExpiry>[0];
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
type GetWrapperExpiryResult = Awaited<ReturnType<typeof sdk.wrapping.getWrapperExpiry>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.wrapping.getWrapperExpiry.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.wrapping.getWrapperExpiry.request(parameters);
```

## Action

- [`getWrapperExpiry`](/core/api/actions/wrapping/get-wrapper-expiry)
