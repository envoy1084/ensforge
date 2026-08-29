---
title: getRegistrationPrice
description: Gets registration price for registration and renewal.
---

# getRegistrationPrice

Gets registration price for registration and renewal.

## Import

```ts
import { getRegistrationPrice } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistrationPrice } from "@ensforge/core";
import { config } from "./config";

const result = await getRegistrationPrice(config, {
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof getRegistrationPrice>[1];
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

ERC-20 token used when the registrar supports token payments.

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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getRegistrationPrice.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getRegistrationPrice.request(parameters);
```

## Error

```ts
import type { GetRegistrationPriceError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.registration.getRegistrationPrice`](/sdk/api/registration/get-registration-price)
