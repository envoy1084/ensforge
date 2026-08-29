---
title: approveMigration
description: Approves migration for ENSv1 to ENSv2 migration.
---

# approveMigration

Approves migration for ENSv1 to ENSv2 migration.

This action belongs to ENSv1 to ENSv2 migration. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { approveMigration } from "@ensforge/core";
```

## Usage

```ts
import { approveMigration } from "@ensforge/core";
import { config } from "./config";

const result = await approveMigration(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type ApproveMigrationParameters = Parameters<typeof approveMigration>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### approved

`boolean | undefined`

Whether the target should be approved.

## Return Type

```ts
type ApproveMigrationResult = Awaited<ReturnType<typeof approveMigration>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = approveMigration.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = approveMigration.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ApproveMigrationError = Effect.Effect.Error<ReturnType<typeof approveMigration.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
