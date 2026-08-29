---
title: getNameState
description: Gets the complete protocol-aware state of an ENS name.
---

# getNameState

Gets the complete protocol-aware state of an ENS name.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.name.getNameState({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetNameStateParameters } from "@ensforge/sdk";
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

## Return Type

```ts
type GetNameStateResult = Awaited<ReturnType<typeof getNameState>>;
```

| Property         | Type                                                                                             | Description                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `kind`           | `"available" \| "v1-unwrapped" \| "v1-wrapped" \| "v2-native" \| "v2-migrated" \| "v2-reserved"` | The kind value returned by the operation.                    |
| `protocol`       | `"v1" \| "v2" \| "v1" \| "v2"`                                                                   | ENS protocol route used for the result.                      |
| `wrapped`        | `false \| true \| boolean`                                                                       | Whether the name is held by the ENS Name Wrapper.            |
| `migrated`       | `false \| true`                                                                                  | The migrated value returned by the operation.                |
| `name`           | `string & Brand<"NormalizedName">`                                                               | Normalized ENS name.                                         |
| `status`         | `"available" \| "reserved" \| "active" \| "grace" \| "expired"`                                  | Current query, transaction, batch, or workflow status.       |
| `owner`          | `&#96;0x${string}&#96; \| null`                                                                  | Current owner address, or `null` when the name has no owner. |
| `manager`        | `&#96;0x${string}&#96; \| null`                                                                  | The manager value returned by the operation.                 |
| `registrant`     | `&#96;0x${string}&#96; \| null`                                                                  | The registrant value returned by the operation.              |
| `registry`       | `&#96;0x${string}&#96;`                                                                          | The registry value returned by the operation.                |
| `resolver`       | `&#96;0x${string}&#96; \| null`                                                                  | The resolver value returned by the operation.                |
| `expiry`         | `bigint \| null`                                                                                 | The expiry value returned by the operation.                  |
| `gracePeriodEnd` | `bigint \| null`                                                                                 | The gracePeriodEnd value returned by the operation.          |
| `tokenId`        | `bigint \| null`                                                                                 | The tokenId value returned by the operation.                 |
| `resource`       | `bigint \| null`                                                                                 | The resource value returned by the operation.                |
| `available`      | `boolean`                                                                                        | The available value returned by the operation.               |
| `renewable`      | `boolean`                                                                                        | The renewable value returned by the operation.               |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.name.getNameState.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.name.getNameState.request(parameters);
```

## Error

```ts
import type { GetNameStateError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getNameState`](/core/api/actions/name/get-name-state)
