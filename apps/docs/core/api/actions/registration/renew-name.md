---
title: renewName
description: Renews one name through its active ENSv1 or ENSv2 route.
---

# renewName

Renews one name through its active ENSv1 or ENSv2 route.

## Import

```ts
import { renewName } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { renewName } from "@ensforge/core";
import { config } from "./config";

const result = await renewName(config, {
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { RenewNameParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### duration

`bigint`

Duration in seconds.

### paymentToken

`EthereumAddress | undefined`

ERC-20 token used when the registrar supports token payments.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

### referrer

`Bytes32 | undefined`

Optional protocol-specific referral identifier.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### mode

`WriteMode | undefined`

Write execution strategy. `auto` uses wallet capabilities and falls back to sequential transactions.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

### resume

`RenewNameResult | undefined`

Previously returned progress used to continue an incomplete workflow.

## Return Type

```ts
import type { RenewNameResult } from "@ensforge/core";
```

| Property         | Type                                                                                                                                                                                                                                                                                                        | Description                                                      |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `status`         | `"completed" \| "partial"`                                                                                                                                                                                                                                                                                  | Current query, transaction, batch, or workflow status.           |
| `name`           | `string & Brand<"NormalizedName">`                                                                                                                                                                                                                                                                          | Normalized ENS name.                                             |
| `protocol`       | `"v1" \| "v2"`                                                                                                                                                                                                                                                                                              | ENS protocol route used for the result.                          |
| `route`          | `"v1-controller" \| "v2-registrar" \| "v1-renewer"`                                                                                                                                                                                                                                                         | The route value returned by the operation.                       |
| `duration`       | `bigint`                                                                                                                                                                                                                                                                                                    | The duration value returned by the operation.                    |
| `previousExpiry` | `bigint \| null`                                                                                                                                                                                                                                                                                            | The previousExpiry value returned by the operation.              |
| `newExpiry`      | `bigint \| null`                                                                                                                                                                                                                                                                                            | The newExpiry value returned by the operation.                   |
| `price`          | `bigint`                                                                                                                                                                                                                                                                                                    | The price value returned by the operation.                       |
| `currency`       | `{ readonly kind: "native"; readonly symbol: "ETH"; readonly decimals: 18; } \| { readonly kind: "erc20"; readonly address: &#96;0x${string}&#96;; readonly symbol: string; readonly decimals: number; }`                                                                                                   | The currency value returned by the operation.                    |
| `approval`       | `RenewalApproval`                                                                                                                                                                                                                                                                                           | The approval value returned by the operation.                    |
| `write`          | `WritePlanProgress`                                                                                                                                                                                                                                                                                         | Progress for the write plan used by the workflow.                |
| `finalState`     | `{ readonly kind: "available"; readonly protocol: "v1" \| "v2"; readonly wrapped: false; readonly migrated: false; readonly name: string & Brand<"NormalizedName">; readonly status: "available" \| ... 3 more ... \| "expired"; ... 10 more ...; readonly renewable: boolean; } \| ... 5 more ... \| null` | Name state observed after the workflow finishes, when available. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = renewName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

Use `.call` to prepare this write for simulation, wallet batching, or a custom execution policy.

```ts
const call = renewName.call(parameters);
```

## Error

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.registration.renewName`](/sdk/api/registration/renew-name)
