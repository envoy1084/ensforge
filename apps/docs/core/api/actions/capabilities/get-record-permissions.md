---
title: getRecordPermissions
description: Gets record permissions for ENS permissions and contract capabilities.
---

# getRecordPermissions

Gets record permissions for ENS permissions and contract capabilities.

This action belongs to ENS permissions and contract capabilities. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getRecordPermissions } from "@ensforge/core";
```

## Usage

```ts
import { getRecordPermissions } from "@ensforge/core";
import { config } from "./config";

const result = await getRecordPermissions(config, {
  name: "example.eth",
  account: {},
  records: [],
});
```

## Parameters

```ts
type GetRecordPermissionsParameters = Parameters<typeof getRecordPermissions>[1];
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

### records

`ReadonlyArray<RecordOperation>`

Records selected, read, or written by the operation.

## Return Type

```ts
type GetRecordPermissionsResult = Awaited<ReturnType<typeof getRecordPermissions>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getRecordPermissions.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getRecordPermissions.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetRecordPermissionsError = Effect.Effect.Error<
  ReturnType<typeof getRecordPermissions.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
