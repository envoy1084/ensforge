---
title: approveMigration
description: Approves migration for name migration.
---

# approveMigration

Approves migration for name migration.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.migration.approveMigration({
  name: "example.eth",
});
```

## Parameters

```ts
type ApproveMigrationParameters = Parameters<typeof sdk.migration.approveMigration>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### approved

`boolean | undefined`

Whether the target should be approved.

## Return Type

```ts
type ApproveMigrationResult = Awaited<ReturnType<typeof sdk.migration.approveMigration>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.migration.approveMigration.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.migration.approveMigration.call(parameters);
```

## Action

- [`approveMigration`](/core/api/actions/migration/approve-migration)
