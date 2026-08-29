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

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.registration.getRenewalPrice({
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof ens.registration.getRenewalPrice>[0];
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
type GetRenewalPriceResult = Awaited<ReturnType<typeof getRenewalPrice>>;
```

| Property       | Type                                                                                                                                                                                                                   | Description                                            |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `status`       | `"payment-token-required" \| "unsupported-payment-token" \| "renewable" \| "not-renewable"`                                                                                                                            | Current query, transaction, batch, or workflow status. |
| `name`         | `string & Brand<"NormalizedName">`                                                                                                                                                                                     | Normalized ENS name.                                   |
| `protocol`     | `"v1" \| "v2"`                                                                                                                                                                                                         | ENS protocol route used for the result.                |
| `paymentToken` | `&#96;0x${string}&#96; \| undefined`                                                                                                                                                                                   | The paymentToken value returned by the operation.      |
| `route`        | `"v1-controller" \| "v2-registrar" \| "v1-renewer" \| undefined`                                                                                                                                                       | The route value returned by the operation.             |
| `renewer`      | `&#96;0x${string}&#96; \| undefined`                                                                                                                                                                                   | The renewer value returned by the operation.           |
| `duration`     | `bigint \| undefined`                                                                                                                                                                                                  | The duration value returned by the operation.          |
| `price`        | `bigint \| undefined`                                                                                                                                                                                                  | The price value returned by the operation.             |
| `currency`     | `{ readonly kind: "native"; readonly symbol: "ETH"; readonly decimals: 18; } \| { readonly kind: "erc20"; readonly address: &#96;0x${string}&#96;; readonly symbol: string; readonly decimals: number; } \| undefined` | The currency value returned by the operation.          |
| `reason`       | `"NAME_NOT_RENEWABLE" \| undefined`                                                                                                                                                                                    | The reason value returned by the operation.            |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.registration.getRenewalPrice.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.registration.getRenewalPrice.request(parameters);
```

## Error

```ts
import type { GetRenewalPriceError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getRenewalPrice`](/core/api/actions/registration/get-renewal-price)
