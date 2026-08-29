---
title: transferSubname
description: Transfers subname through the active ownership route.
---

# transferSubname

Transfers subname through the active ownership route.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.subnames.transferSubname({
  to: "value",
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { TransferSubnameParameters } from "@ensforge/sdk";
```

### to

`string`

Value used for `to` by this method.

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

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

## Return Type

```ts
import type { TransferNameProgress } from "@ensforge/sdk";
```

| Property     | Type                                                                                                                                                                                                                                                                                                        | Description                                                      |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `name`       | `string`                                                                                                                                                                                                                                                                                                    | Normalized ENS name.                                             |
| `protocol`   | `"v1" \| "v2"`                                                                                                                                                                                                                                                                                              | ENS protocol route used for the result.                          |
| `strategy`   | `TransferNameStrategy`                                                                                                                                                                                                                                                                                      | The strategy value returned by the operation.                    |
| `from`       | `&#96;0x${string}&#96;`                                                                                                                                                                                                                                                                                     | The from value returned by the operation.                        |
| `to`         | `&#96;0x${string}&#96;`                                                                                                                                                                                                                                                                                     | The to value returned by the operation.                          |
| `write`      | `WritePlanProgress`                                                                                                                                                                                                                                                                                         | Progress for the write plan used by the workflow.                |
| `finalState` | `{ readonly kind: "available"; readonly protocol: "v1" \| "v2"; readonly wrapped: false; readonly migrated: false; readonly name: string & Brand<"NormalizedName">; readonly status: "available" \| ... 3 more ... \| "expired"; ... 10 more ...; readonly renewable: boolean; } \| ... 5 more ... \| null` | Name state observed after the workflow finishes, when available. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.subnames.transferSubname.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { TransferSubnameError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`transferSubname`](/core/api/actions/subnames/transfer-subname)
