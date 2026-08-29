---
title: getMigrationPlan
description: Builds the authorization and transaction plan for migrating a name.
---

# getMigrationPlan

Builds the authorization and transaction plan for migrating a name.

This action belongs to ENSv1 to ENSv2 migration. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getMigrationPlan } from "@ensforge/core";
```

## Usage

```ts
import { getMigrationPlan } from "@ensforge/core";
import { config } from "./config";

const result = await getMigrationPlan(config, {
  name: "example.eth",
  account: {},
});
```

## Parameters

```ts
type GetMigrationPlanParameters = Parameters<typeof getMigrationPlan>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### account

`EthereumAddress`

Account used for authorization and wallet execution.

### owner

`EthereumAddress | undefined`

Address that should own the resulting name or resource.

### resolver

`EthereumAddress | undefined`

Resolver address used by the operation.

### subregistry

`EthereumAddress | undefined`

ENSv2 subregistry assigned during registration.

## Return Type

```ts
type GetMigrationPlanResult = Awaited<ReturnType<typeof getMigrationPlan>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getMigrationPlan.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getMigrationPlan.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetMigrationPlanError = Effect.Effect.Error<ReturnType<typeof getMigrationPlan.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
