---
title: deleteSubname
description: Deletes subname from subname management.
---

# deleteSubname

Deletes subname from subname management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.subnames.deleteSubname({
  name: "example.eth",
});
```

## Parameters

```ts
type DeleteSubnameParameters = Parameters<typeof sdk.subnames.deleteSubname>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

## Return Type

```ts
type DeleteSubnameResult = Awaited<ReturnType<typeof sdk.subnames.deleteSubname>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.subnames.deleteSubname.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.subnames.deleteSubname.call(parameters);
```

## Action

- [`deleteSubname`](/core/api/actions/subnames/delete-subname)
