---
title: getRecordPermissions
description: Gets record permissions for ENS permissions and contract capabilities.
---

# getRecordPermissions

Gets record permissions for ENS permissions and contract capabilities.

## Import

```ts
import { getRecordPermissions } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getRecordPermissions } from "@ensforge/core";
import { config } from "./config";

const result = await getRecordPermissions(config, {
  name: "example.eth",
  account: {},
  records: [],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetRecordPermissionsParameters } from "@ensforge/core";
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

Records selected, read, or written by the operation.

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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRecordPermissions.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getRecordPermissions.request(parameters);
```

## Error

```ts
import type { GetRecordPermissionsError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.capabilities.getRecordPermissions`](/sdk/api/capabilities/get-record-permissions)
