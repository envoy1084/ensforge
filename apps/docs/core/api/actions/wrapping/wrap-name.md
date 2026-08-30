---
title: wrapName
description: Wraps an ENS name and returns resumable write progress.
---

# wrapName

Wraps an ENS name and returns resumable write progress.

## Import

```ts
import { wrapName } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { wrapName } from "@ensforge/core";
import { config } from "./config";

const result = await wrapName(config, {
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { WrapNameParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### owner

`string`

Address that should own the resulting name or resource.

### resolver

`string | undefined`

Resolver address used by the operation.

### fuses

`number | ReadonlyArray<NameWrapperFuseName> | undefined`

Value used for `fuses` by this action.

### mode

`WriteMode | undefined`

Write execution strategy. `auto` uses wallet capabilities and falls back to sequential transactions.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

### resume

`WrapNameResult | undefined`

Previously returned progress used to continue an incomplete workflow.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
import type { WrapNameResult } from "@ensforge/core";
```

| Property     | Type                                                                                                                                                                                                                                                                                                        | Description                                                      |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `name`       | `string`                                                                                                                                                                                                                                                                                                    | Normalized ENS name.                                             |
| `protocol`   | `"v1"`                                                                                                                                                                                                                                                                                                      | ENS protocol route used for the result.                          |
| `strategy`   | `"registry" \| "eth-2ld"`                                                                                                                                                                                                                                                                                   | The strategy value returned by the operation.                    |
| `owner`      | `&#96;0x${string}&#96;`                                                                                                                                                                                                                                                                                     | Current owner address, or `null` when the name has no owner.     |
| `approvals`  | `{ readonly registrar: boolean; readonly registry: boolean; }`                                                                                                                                                                                                                                              | The approvals value returned by the operation.                   |
| `write`      | `WritePlanProgress`                                                                                                                                                                                                                                                                                         | Progress for the write plan used by the workflow.                |
| `finalState` | `{ readonly kind: "available"; readonly protocol: "v1" \| "v2"; readonly wrapped: false; readonly migrated: false; readonly name: string & Brand<"NormalizedName">; readonly status: "available" \| ... 3 more ... \| "expired"; ... 10 more ...; readonly renewable: boolean; } \| ... 5 more ... \| null` | Name state observed after the workflow finishes, when available. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = wrapName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { WrapNameError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.wrapping.wrapName`](/sdk/api/wrapping/wrap-name)
