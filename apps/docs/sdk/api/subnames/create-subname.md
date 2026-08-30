---
title: createSubname
description: Creates subname for subname management.
---

# createSubname

Creates subname for subname management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.subnames.createSubname({
  owner: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { CreateSubnameParameters } from "@ensforge/sdk";
```

### owner

`string`

Address that should own the resulting name or resource.

### resolver

`string | undefined`

Resolver address used by the method.

### ttl

`bigint | undefined`

Registry time-to-live in seconds.

### expiry

`bigint | undefined`

Unix timestamp for the requested expiry.

### fuses

`number | undefined`

Value used for `fuses` by this method.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### salt

`bigint | undefined`

Value used for `salt` by this method.

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

`CreateSubnameResult | undefined`

Previously returned progress used to continue the workflow.

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

## Return Type

```ts
import type { CreateSubnameResult } from "@ensforge/sdk";
```

| Property          | Type                                                                                                                                                                                                                                                                                                        | Description                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `name`            | `string`                                                                                                                                                                                                                                                                                                    | Normalized ENS name.                                             |
| `parent`          | `string`                                                                                                                                                                                                                                                                                                    | The parent value returned by the operation.                      |
| `protocol`        | `"v1" \| "v2"`                                                                                                                                                                                                                                                                                              | ENS protocol route used for the result.                          |
| `createdRegistry` | `&#96;0x${string}&#96; \| null`                                                                                                                                                                                                                                                                             | The createdRegistry value returned by the operation.             |
| `registry`        | `&#96;0x${string}&#96;`                                                                                                                                                                                                                                                                                     | The registry value returned by the operation.                    |
| `write`           | `WritePlanProgress`                                                                                                                                                                                                                                                                                         | Progress for the write plan used by the workflow.                |
| `finalState`      | `{ readonly kind: "available"; readonly protocol: "v1" \| "v2"; readonly wrapped: false; readonly migrated: false; readonly name: string & Brand<"NormalizedName">; readonly status: "available" \| ... 3 more ... \| "expired"; ... 10 more ...; readonly renewable: boolean; } \| ... 5 more ... \| null` | Name state observed after the workflow finishes, when available. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.subnames.createSubname.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { CreateSubnameError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`createSubname`](/core/api/actions/subnames/create-subname)
