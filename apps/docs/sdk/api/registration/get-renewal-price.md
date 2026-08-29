---
title: getRenewalPrice
description: Gets renewal price for registration and renewal.
---

# getRenewalPrice

Gets renewal price for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.registration.getRenewalPrice({
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
});
```

## Parameters

```ts
type GetRenewalPriceParameters = Parameters<typeof sdk.registration.getRenewalPrice>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### duration

`bigint`

Duration in seconds.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

## Return Type

```ts
type GetRenewalPriceResult = Awaited<ReturnType<typeof sdk.registration.getRenewalPrice>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.registration.getRenewalPrice.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.registration.getRenewalPrice.request(parameters);
```

## Action

- [`getRenewalPrice`](/core/api/actions/registration/get-renewal-price)
