---
title: getMigrationEligibility
description: Gets migration eligibility for ENSv1 to ENSv2 migration.
---

# getMigrationEligibility

Gets migration eligibility for ENSv1 to ENSv2 migration.

## Import

```ts
import { getMigrationEligibility } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getMigrationEligibility } from "@ensforge/core";
import { config } from "./config";

const result = await getMigrationEligibility(config, {
  name: "example.eth",
  account: {},
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetMigrationEligibilityParameters } from "@ensforge/core";
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

## Return Type

```ts
type GetMigrationEligibilityResult = Awaited<ReturnType<typeof getMigrationEligibility>>;
```

| Property     | Type                                                                                                                                                                                                                                                               | Description                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `name`       | `string & Brand<"NormalizedName">`                                                                                                                                                                                                                                 | Normalized ENS name.                                         |
| `eligible`   | `boolean`                                                                                                                                                                                                                                                          | The eligible value returned by the operation.                |
| `status`     | `{ readonly status: "unsupported"; readonly name: string & Brand<"NormalizedName">; readonly reason: "ENSV2_NOT_ACTIVE" \| "NOT_ETH_NAME" \| "NAME_NOT_RESERVED"; } \| { ...; } \| ... 6 more ... \| { ...; }`                                                     | Current query, transaction, batch, or workflow status.       |
| `target`     | `{ readonly supported: false; readonly name: string & Brand<"NormalizedName">; readonly reason: "MIGRATION_UNSUPPORTED" \| "MIGRATION_NOT_REQUIRED" \| "PARENT_NOT_MIGRATED"; } \| { ...; }`                                                                       | The target value returned by the operation.                  |
| `account`    | `&#96;0x${string}&#96;`                                                                                                                                                                                                                                            | The account value returned by the operation.                 |
| `owner`      | `&#96;0x${string}&#96; \| null`                                                                                                                                                                                                                                    | Current owner address, or `null` when the name has no owner. |
| `authorized` | `boolean`                                                                                                                                                                                                                                                          | The authorized value returned by the operation.              |
| `blockers`   | `readonly ("ENSV2_NOT_ACTIVE" \| "NOT_ETH_NAME" \| "NAME_NOT_RESERVED" \| "PARENT_NOT_MIGRATED" \| "NAME_ALREADY_MIGRATED" \| "NAME_AVAILABLE" \| "ACCOUNT_NOT_OWNER_OR_OPERATOR" \| "INVALID_WRAPPER_STATE" \| "FROZEN_TOKEN_APPROVAL" \| "TRANSFER_DISABLED")[]` | The blockers value returned by the operation.                |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getMigrationEligibility.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getMigrationEligibility.request(parameters);
```

## Error

```ts
import type { GetMigrationEligibilityError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.migration.getMigrationEligibility`](/sdk/api/migration/get-migration-eligibility)
