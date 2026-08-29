---
title: getMigrationPlan
description: Gets migration plan for name migration.
---

# getMigrationPlan

Gets migration plan for name migration.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.migration.getMigrationPlan({
  name: "example.eth",
  account: {},
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetMigrationPlanParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

### account

`EthereumAddress`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### owner

`EthereumAddress | undefined`

Address that should own the resulting name or resource.

### resolver

`EthereumAddress | undefined`

Resolver address used by the method.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this method.

## Return Type

```ts
type GetMigrationPlanResult = Awaited<ReturnType<typeof getMigrationPlan>>;
```

| Property    | Type                                                                                                                                                                                                                                                                            | Description                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `status`    | `"unsupported" \| "not-required" \| "blocked" \| "authorization-required" \| "ready"`                                                                                                                                                                                           | Current query, transaction, batch, or workflow status.       |
| `name`      | `string & Brand<"NormalizedName">`                                                                                                                                                                                                                                              | Normalized ENS name.                                         |
| `blockers`  | `readonly ("ENSV2_NOT_ACTIVE" \| "NOT_ETH_NAME" \| "NAME_NOT_RESERVED" \| "PARENT_NOT_MIGRATED" \| "NAME_ALREADY_MIGRATED" \| "NAME_AVAILABLE" \| "ACCOUNT_NOT_OWNER_OR_OPERATOR" \| "INVALID_WRAPPER_STATE" \| "FROZEN_TOKEN_APPROVAL" \| "TRANSFER_DISABLED")[] \| undefined` | The blockers value returned by the operation.                |
| `reason`    | `"V2_NATIVE" \| "AVAILABLE" \| "ALREADY_MIGRATED" \| undefined`                                                                                                                                                                                                                 | The reason value returned by the operation.                  |
| `account`   | `&#96;0x${string}&#96; \| undefined`                                                                                                                                                                                                                                            | The account value returned by the operation.                 |
| `owner`     | `&#96;0x${string}&#96; \| undefined`                                                                                                                                                                                                                                            | Current owner address, or `null` when the name has no owner. |
| `target`    | `{ readonly supported: false; readonly name: string & Brand<"NormalizedName">; readonly reason: "MIGRATION_UNSUPPORTED" \| "MIGRATION_NOT_REQUIRED" \| "PARENT_NOT_MIGRATED"; } \| { ...; } \| undefined`                                                                       | The target value returned by the operation.                  |
| `migration` | `{ readonly label: string; readonly owner: &#96;0x${string}&#96;; readonly resolver: &#96;0x${string}&#96;; readonly subregistry: &#96;0x${string}&#96;; } \| undefined`                                                                                                        | The migration value returned by the operation.               |
| `warnings`  | `readonly ("SUBREGISTRY_IGNORED_FOR_LOCKED_NAME" \| "RESOLVER_MAY_BE_PRESERVED")[] \| undefined`                                                                                                                                                                                | The warnings value returned by the operation.                |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.migration.getMigrationPlan.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = sdk.migration.getMigrationPlan.request(parameters);
```

## Error

```ts
import type { GetMigrationPlanError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getMigrationPlan`](/core/api/actions/migration/get-migration-plan)
