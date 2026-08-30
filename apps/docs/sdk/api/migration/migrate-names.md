---
title: migrateNames
description: Runs a resumable migration workflow for multiple names.
---

# migrateNames

Runs a resumable migration workflow for multiple names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.migration.migrateNames({
  migrations: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { MigrateNamesParameters } from "@ensforge/sdk/migration";
```

### migrations

`ReadonlyArray<MigrateNameCallParameters>`

Migration entries.

### resume

`MigrationBatchProgress | undefined`

Previously returned progress used to continue the workflow.

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
import type { MigrationBatchProgress } from "@ensforge/sdk/migration";
```

| Property     | Type                                                                                                                      | Description                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `status`     | `"completed" \| "partial"`                                                                                                | Current query, transaction, batch, or workflow status. |
| `strategy`   | `"sequential" \| "helper"`                                                                                                | The strategy value returned by the operation.          |
| `migrations` | `readonly MigrationBatchEntry[]`                                                                                          | The migrations value returned by the operation.        |
| `approvals`  | `readonly MigrationBatchApproval[]`                                                                                       | The approvals value returned by the operation.         |
| `steps`      | `readonly { readonly name: string; readonly route: Extract<MigrationTarget, { readonly supported: true; }>["route"]; }[]` | The steps value returned by the operation.             |
| `write`      | `WritePlanProgress`                                                                                                       | Progress for the write plan used by the workflow.      |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.migration.migrateNames.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/sdk/error.md-->

## Action

- [`migrateNames`](/core/api/actions/migration/migrate-names)
