---
title: getRegistrationPrice
description: Gets registration price for registration and renewal.
---

# getRegistrationPrice

Gets registration price for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.registration.getRegistrationPrice({
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="registration.getRegistrationPrice" />

## Parameters

```ts
type Parameters = Parameters<typeof sdk.registration.getRegistrationPrice>[0];
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### duration

`bigint`

Duration in seconds.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

## Return Type

```ts
type GetRegistrationPriceResult = Awaited<ReturnType<typeof getRegistrationPrice>>;
```

| Property       | Type                                                                                                                                                                                                                   | Description                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `status`       | `"available" \| "unavailable" \| "payment-token-required" \| "unsupported-payment-token"`                                                                                                                              | Current query, transaction, batch, or workflow status. |
| `name`         | `string & Brand<"NormalizedName">`                                                                                                                                                                                     | Normalized ENS name.                                   |
| `protocol`     | `"v1" \| "v2"`                                                                                                                                                                                                         | ENS protocol route used for the result.                |
| `registrar`    | `&#96;0x${string}&#96; \| undefined`                                                                                                                                                                                   | The registrar value returned by the operation.         |
| `duration`     | `bigint \| undefined`                                                                                                                                                                                                  | The duration value returned by the operation.          |
| `base`         | `bigint \| undefined`                                                                                                                                                                                                  | The base value returned by the operation.              |
| `premium`      | `bigint \| undefined`                                                                                                                                                                                                  | The premium value returned by the operation.           |
| `total`        | `bigint \| undefined`                                                                                                                                                                                                  | The total value returned by the operation.             |
| `currency`     | `{ readonly kind: "native"; readonly symbol: "ETH"; readonly decimals: 18; } \| { readonly kind: "erc20"; readonly address: &#96;0x${string}&#96;; readonly symbol: string; readonly decimals: number; } \| undefined` | The currency value returned by the operation.          |
| `reason`       | `"NAME_UNAVAILABLE" \| undefined`                                                                                                                                                                                      | The reason value returned by the operation.            |
| `paymentToken` | `&#96;0x${string}&#96; \| undefined`                                                                                                                                                                                   | The paymentToken value returned by the operation.      |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.registration.getRegistrationPrice.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.registration.getRegistrationPrice.request(parameters);
```

## Error

```ts
import type { GetRegistrationPriceError } from "@ensforge/sdk/registration";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getRegistrationPrice`](/core/api/actions/registration/get-registration-price)
