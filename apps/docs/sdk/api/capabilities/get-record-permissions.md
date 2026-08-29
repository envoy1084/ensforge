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

```ts
import { sdk } from "./sdk";

const result = await sdk.capabilities.getRecordPermissions({
  name: "example.eth",
  account: {},
  records: [],
});
```

## Parameters

```ts
type GetRecordPermissionsParameters = Parameters<typeof sdk.capabilities.getRecordPermissions>[0];
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

### records

`ReadonlyArray<RecordOperation>`

Records selected, read, or written.

## Return Type

```ts
type GetRecordPermissionsResult = Awaited<ReturnType<typeof sdk.capabilities.getRecordPermissions>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.capabilities.getRecordPermissions.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.capabilities.getRecordPermissions.request(parameters);
```

## Action

- [`getRecordPermissions`](/core/api/actions/capabilities/get-record-permissions)
