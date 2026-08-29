---
title: getRenewalPrice
description: Gets renewal price for registration and renewal.
---

# getRenewalPrice

Gets renewal price for registration and renewal.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getRenewalPrice } from "@ensforge/core";
```

## Usage

```ts
import { getRenewalPrice } from "@ensforge/core";
import { config } from "./config";

const result = await getRenewalPrice(config, {
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
});
```

## Parameters

```ts
type GetRenewalPriceParameters = Parameters<typeof getRenewalPrice>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

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

ERC-20 token used when the registrar supports token payments.

## Return Type

```ts
type GetRenewalPriceResult = Awaited<ReturnType<typeof getRenewalPrice>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getRenewalPrice.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getRenewalPrice.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetRenewalPriceError = Effect.Effect.Error<ReturnType<typeof getRenewalPrice.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
