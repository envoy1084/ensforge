---
title: transferRegistrant
description: Transfers registrant through the active ownership route.
---

# transferRegistrant

Transfers registrant through the active ownership route.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.ownership.transferRegistrant({
  name: "example.eth",
  to: "value",
});
```

## Parameters

```ts
type TransferRegistrantParameters = Parameters<typeof sdk.ownership.transferRegistrant>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### to

`string`

Value used for `to` by this method.

## Return Type

```ts
type TransferRegistrantResult = Awaited<ReturnType<typeof sdk.ownership.transferRegistrant>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.ownership.transferRegistrant.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.ownership.transferRegistrant.call(parameters);
```

## Action

- [`transferRegistrant`](/core/api/actions/ownership/transfer-registrant)
