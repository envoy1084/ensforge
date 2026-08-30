---
title: migrateName
description: Runs the resumable migration workflow for one name.
---

# migrateName

Runs the resumable migration workflow for one name.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.migration.migrateName({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { MigrateNameParameters } from "@ensforge/sdk";
```

### migrateParent

`boolean | undefined`

Value used for `migrateParent` by this method.

### resume

`MigrationNameProgress | undefined`

Previously returned progress used to continue the workflow.

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### owner

`EthereumAddress | undefined`

Address that should own the resulting name or resource.

### resolver

`EthereumAddress | undefined`

Resolver address used by the method.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this method.

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
import type { MigrateNameResult } from "@ensforge/sdk";
```

| Property     | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Description                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `status`     | `"completed" \| "partial" \| "not-required"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Current query, transaction, batch, or workflow status.           |
| `name`       | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Normalized ENS name.                                             |
| `route`      | `"unwrapped" \| "wrapped-unlocked" \| "wrapped-locked" \| "locked-child" \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | The route value returned by the operation.                       |
| `steps`      | `readonly { readonly name: string; readonly route: Extract<MigrationTarget, { readonly supported: true; }>["route"]; }[] \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | The steps value returned by the operation.                       |
| `write`      | `WritePlanProgress \| null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Progress for the write plan used by the workflow.                |
| `finalState` | `{ readonly kind: "available"; readonly protocol: "v1" \| "v2"; readonly wrapped: false; readonly migrated: false; readonly name: string & Brand<"NormalizedName">; readonly status: "available" \| ... 3 more ... \| "expired"; ... 10 more ...; readonly renewable: boolean; } \| ... 5 more ... \| null \| { readonly kind: "available"; readonly protocol: "v1" \| "v2"; readonly wrapped: false; readonly migrated: false; readonly name: string & Brand<"NormalizedName">; readonly status: "available" \| ... 3 more ... \| "expired"; ... 10 more ...; readonly renewable: boolean; } \| ... 4 more ... \| { ...; }` | Name state observed after the workflow finishes, when available. |
| `reason`     | `"V2_NATIVE" \| "AVAILABLE" \| "ALREADY_MIGRATED" \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | The reason value returned by the operation.                      |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.migration.migrateName.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.migration.migrateName.call(parameters);
```

## Error

<!--@include: @/shared/sdk/error.md-->

## Action

- [`migrateName`](/core/api/actions/migration/migrate-name)
