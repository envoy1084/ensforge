---
title: setAlias
description: Sets alias for resolver records.
---

# setAlias

Sets alias for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setAlias({
  name: "example.eth",
  target: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type SetAliasParameters = Parameters<typeof sdk.records.setAlias>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### target

`string | null`

Target account or approval kind.

## Return Type

```ts
type SetAliasResult = Awaited<ReturnType<typeof sdk.records.setAlias>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setAlias.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setAlias.call(parameters);
```

## Action

- [`setAlias`](/core/api/actions/records/set-alias)
