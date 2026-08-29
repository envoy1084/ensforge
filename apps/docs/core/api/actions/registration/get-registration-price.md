---
title: getRegistrationPrice
description: Gets registration price for registration and renewal.
---

# getRegistrationPrice

Gets registration price for registration and renewal.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getRegistrationPrice } from "@ensforge/core";
```

## Usage

```ts
import { getRegistrationPrice } from "@ensforge/core";
import { config } from "./config";

const result = await getRegistrationPrice(config, {
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
});
```

## Parameters

```ts
type GetRegistrationPriceParameters = Parameters<typeof getRegistrationPrice>[1];
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
type GetRegistrationPriceResult = Awaited<ReturnType<typeof getRegistrationPrice>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getRegistrationPrice.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getRegistrationPrice.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetRegistrationPriceError = Effect.Effect.Error<
  ReturnType<typeof getRegistrationPrice.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
