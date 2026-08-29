---
title: getRecords
description: Gets a typed selection of resolver records.
---

# getRecords

Gets a typed selection of resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.getRecords({
  name: "example.eth",
  records: [],
});
```

## Parameters

```ts
type GetRecordsParameters = Parameters<typeof sdk.records.getRecords>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### records

`Selection`

Records selected, read, or written.

### gatewayUrls

`AssetGatewayUrls | undefined`

Value used for `gatewayUrls` by this method.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetRecordsResult = Awaited<ReturnType<typeof sdk.records.getRecords>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.getRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.records.getRecords.request(parameters);
```

## Action

- [`getRecords`](/core/api/actions/records/get-records)
