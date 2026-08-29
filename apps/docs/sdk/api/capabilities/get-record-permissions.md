---
title: getRecordPermissions
description: Gets record permissions for capability and authorization discovery.
---

# getRecordPermissions

Gets record permissions for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.capabilities.getRecordPermissions({
  name: "example.eth",
  account: {},
  records: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetRecordPermissionsParameters } from "@ensforge/sdk";
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

### records

`ReadonlyArray<RecordOperation>`

Records selected, read, or written.

## Return Type

```ts
type GetRecordPermissionsResult = Awaited<ReturnType<typeof getRecordPermissions>>;
```

| Property    | Type                                                                                                                                                                                                                                                                                                                                      | Description                                    |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `resolver`  | `&#96;0x${string}&#96; \| null`                                                                                                                                                                                                                                                                                                           | The resolver value returned by the operation.  |
| `inherited` | `boolean`                                                                                                                                                                                                                                                                                                                                 | The inherited value returned by the operation. |
| `account`   | `&#96;0x${string}&#96;`                                                                                                                                                                                                                                                                                                                   | The account value returned by the operation.   |
| `records`   | `readonly { readonly record: { readonly type: "address"; readonly coinType: bigint; } \| { readonly type: "text"; readonly key: string; } \| { readonly type: "contentHash"; } \| { readonly type: "pubkey"; } \| { readonly type: "abi"; readonly contentType?: bigint \| undefined; } \| ... 6 more ... \| { ...; }; readonly suppo...` | The records value returned by the operation.   |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.capabilities.getRecordPermissions.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.capabilities.getRecordPermissions.request(parameters);
```

## Error

```ts
import type { GetRecordPermissionsError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getRecordPermissions`](/core/api/actions/capabilities/get-record-permissions)
