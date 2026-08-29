---
title: renewName
description: Renews one name through its active protocol route.
---

# renewName

Renews one name through its active protocol route.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.registration.renewName({
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { RenewNameParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### duration

`bigint`

Duration in seconds.

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

### referrer

`Bytes32 | undefined`

Value used for `referrer` by this method.

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

Previously returned progress used to continue the workflow.

## Return Type

```ts
import type { RenewNameResult } from "@ensforge/sdk";
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
import { sdk } from "./client";

const program = sdk.registration.renewName.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

Use `.call` to prepare this write for simulation, wallet batching, or a custom execution policy.

```ts
const call = sdk.registration.renewName.call(parameters);
```

## Error

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`renewName`](/core/api/actions/registration/renew-name)
