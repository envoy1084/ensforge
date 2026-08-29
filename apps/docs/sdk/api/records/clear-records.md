---
title: clearRecords
description: Clears records for resolver records.
---

# clearRecords

Clears records for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.clearRecords({
  name: "example.eth",
});
```

## Parameters

```ts
type ClearRecordsParameters = Parameters<typeof sdk.records.clearRecords>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

## Return Type

```ts
type ClearRecordsResult = Awaited<ReturnType<typeof sdk.records.clearRecords>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.clearRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.clearRecords.call(parameters);
```

## Action

- [`clearRecords`](/core/api/actions/records/clear-records)
