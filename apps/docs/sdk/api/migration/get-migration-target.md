---
title: getMigrationTarget
description: Gets migration target for name migration.
---

# getMigrationTarget

Gets migration target for name migration.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.migration.getMigrationTarget({
  name: "example.eth",
});
```

## Parameters

```ts
type GetMigrationTargetParameters = Parameters<typeof sdk.migration.getMigrationTarget>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetMigrationTargetResult = Awaited<ReturnType<typeof sdk.migration.getMigrationTarget>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.migration.getMigrationTarget.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.migration.getMigrationTarget.request(parameters);
```

## Action

- [`getMigrationTarget`](/core/api/actions/migration/get-migration-target)
