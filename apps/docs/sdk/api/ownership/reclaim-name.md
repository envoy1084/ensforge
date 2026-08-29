---
title: reclaimName
description: reclaim name for ownership management.
---

# reclaimName

reclaim name for ownership management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.ownership.reclaimName({
  name: "example.eth",
  manager: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type ReclaimNameParameters = Parameters<typeof sdk.ownership.reclaimName>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### manager

`string`

Address that should manage the name.

## Return Type

```ts
type ReclaimNameResult = Awaited<ReturnType<typeof sdk.ownership.reclaimName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.ownership.reclaimName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.ownership.reclaimName.call(parameters);
```

## Action

- [`reclaimName`](/core/api/actions/ownership/reclaim-name)
