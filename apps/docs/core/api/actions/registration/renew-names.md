---
title: renewNames
description: Renews multiple names with safe batching and resumable progress.
---

# renewNames

Renews multiple names with safe batching and resumable progress.

## Import

```ts
import { renewNames } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { renewNames } from "@ensforge/core";
import { config } from "./config";

const result = await renewNames(config, {
  renewals: [],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { RenewNamesParameters } from "@ensforge/core";
```

### renewals

`ReadonlyArray<RenewNamesEntryParameters>`

Renewal entries executed by the batch workflow.

### maxTotalPrice

`bigint | undefined`

Maximum aggregate price accepted by the caller.

### resume

`RenewNamesResult | undefined`

Previously returned progress used to continue an incomplete workflow.

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

## Return Type

```ts
import type { RenewNamesResult } from "@ensforge/core";
```

| Property     | Type                                                                                                                                                                      | Description                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `status`     | `"completed" \| "partial"`                                                                                                                                                | Current query, transaction, batch, or workflow status. |
| `renewals`   | `readonly (Omit<RenewNameResult, "status" \| "write" \| "approval" \| "finalState"> & { readonly newExpiry: bigint \| null; readonly finalState: NameState \| null; })[]` | The renewals value returned by the operation.          |
| `approvals`  | `readonly RenewalApproval[]`                                                                                                                                              | The approvals value returned by the operation.         |
| `totalPrice` | `bigint`                                                                                                                                                                  | The totalPrice value returned by the operation.        |
| `write`      | `WritePlanProgress`                                                                                                                                                       | Progress for the write plan used by the workflow.      |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = renewNames.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.registration.renewNames`](/sdk/api/registration/renew-names)
