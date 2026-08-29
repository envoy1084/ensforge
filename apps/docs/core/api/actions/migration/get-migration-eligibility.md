---
title: getMigrationEligibility
description: Gets migration eligibility for ENSv1 to ENSv2 migration.
---

# getMigrationEligibility

Gets migration eligibility for ENSv1 to ENSv2 migration.

This action belongs to ENSv1 to ENSv2 migration. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getMigrationEligibility } from "@ensforge/core";
```

## Usage

```ts
import { getMigrationEligibility } from "@ensforge/core";
import { config } from "./config";

const result = await getMigrationEligibility(config, {
  name: "example.eth",
  account: {},
});
```

## Parameters

```ts
type GetMigrationEligibilityParameters = Parameters<typeof getMigrationEligibility>[1];
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

## Return Type

```ts
type GetMigrationEligibilityResult = Awaited<ReturnType<typeof getMigrationEligibility>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getMigrationEligibility.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getMigrationEligibility.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetMigrationEligibilityError = Effect.Effect.Error<
  ReturnType<typeof getMigrationEligibility.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
