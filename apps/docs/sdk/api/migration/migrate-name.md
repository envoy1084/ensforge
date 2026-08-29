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

```ts
import { sdk } from "./sdk";

const result = await sdk.migration.migrateName({
  name: "example.eth",
});
```

## Parameters

```ts
type MigrateNameParameters = Parameters<typeof sdk.migration.migrateName>[0];
```

### migrateParent

`boolean | undefined`

Value used for `migrateParent` by this method.

### resume

`MigrationNameProgress | undefined`

Previously returned progress used to continue the workflow.

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

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
type MigrateNameResult = Awaited<ReturnType<typeof sdk.migration.migrateName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.migration.migrateName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.migration.migrateName.call(parameters);
```

## Action

- [`migrateName`](/core/api/actions/migration/migrate-name)
