---
title: getMigrationEligibility
description: Gets migration eligibility for name migration.
---

# getMigrationEligibility

Gets migration eligibility for name migration.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.migration.getMigrationEligibility({
  name: "example.eth",
  account: {},
});
```

## Parameters

```ts
type GetMigrationEligibilityParameters = Parameters<
  typeof sdk.migration.getMigrationEligibility
>[0];
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

### account

`EthereumAddress`

Account used for authorization and execution.

## Return Type

```ts
type GetMigrationEligibilityResult = Awaited<
  ReturnType<typeof sdk.migration.getMigrationEligibility>
>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.migration.getMigrationEligibility.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.migration.getMigrationEligibility.request(parameters);
```

## Action

- [`getMigrationEligibility`](/core/api/actions/migration/get-migration-eligibility)
