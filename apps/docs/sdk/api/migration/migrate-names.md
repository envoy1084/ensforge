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

```ts
import { sdk } from "./sdk";

const result = await sdk.migration.migrateNames({
  migrations: [],
});
```

## Parameters

```ts
type MigrateNamesParameters = Parameters<typeof sdk.migration.migrateNames>[0];
```

### migrations

`ReadonlyArray<MigrateNameCallParameters>`

Migration entries.

### resume

`MigrationBatchProgress | undefined`

Previously returned progress used to continue the workflow.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

## Return Type

```ts
type MigrateNamesResult = Awaited<ReturnType<typeof sdk.migration.migrateNames>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.migration.migrateNames.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`migrateNames`](/core/api/actions/migration/migrate-names)
