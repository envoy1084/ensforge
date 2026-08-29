---
title: setSubnameRecord
description: Sets subname record for subname management.
---

# setSubnameRecord

Sets subname record for subname management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.subnames.setSubnameRecord({
  owner: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetSubnameRecordParameters } from "@ensforge/sdk";
```

### records

`ReadonlyArray<SetRecordInput> | undefined`

Records selected, read, or written.

### owner

`string`

Address that should own the resulting name or resource.

### resolver

`string | undefined`

Resolver address used by the method.

### ttl

`bigint | undefined`

Registry time-to-live in seconds.

### expiry

`bigint | undefined`

Unix timestamp for the requested expiry.

### fuses

`number | undefined`

Value used for `fuses` by this method.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### salt

`bigint | undefined`

Value used for `salt` by this method.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### mode

`WriteMode | undefined`

Write execution strategy. `auto` uses wallet capabilities and falls back to sequential transactions.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

### resume

`CreateSubnameResult | undefined`

Previously returned progress used to continue the workflow.

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

## Return Type

```ts
import type { SetSubnameRecordResult } from "@ensforge/sdk";
```

| Property        | Type                                                                                                                                                                                                                                                                                                            | Description                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `name`          | `string`                                                                                                                                                                                                                                                                                                        | Normalized ENS name.                                             |
| `protocol`      | `"v1" \| "v2"`                                                                                                                                                                                                                                                                                                  | ENS protocol route used for the result.                          |
| `created`       | `boolean`                                                                                                                                                                                                                                                                                                       | The created value returned by the operation.                     |
| `registry`      | `&#96;0x${string}&#96;`                                                                                                                                                                                                                                                                                         | The registry value returned by the operation.                    |
| `resolver`      | `&#96;0x${string}&#96; \| null`                                                                                                                                                                                                                                                                                 | The resolver value returned by the operation.                    |
| `resolverWrite` | `SetResolverAndRecordsProgress \| null`                                                                                                                                                                                                                                                                         | The resolverWrite value returned by the operation.               |
| `create`        | `CreateSubnameResult \| null`                                                                                                                                                                                                                                                                                   | The create value returned by the operation.                      |
| `mutations`     | `readonly CallExecutionResult[]`                                                                                                                                                                                                                                                                                | The mutations value returned by the operation.                   |
| `finalState`    | `{ readonly kind: "available"; readonly protocol: "v1" \| "v2"; readonly wrapped: false; readonly migrated: false; readonly name: string & Brand<"NormalizedName">; readonly status: "available" \| ... 3 more ... \| "expired"; ... 10 more ...; readonly renewable: boolean; } \| ... 4 more ... \| { ...; }` | Name state observed after the workflow finishes, when available. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.subnames.setSubnameRecord.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { SetSubnameRecordError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`setSubnameRecord`](/core/api/actions/subnames/set-subname-record)
