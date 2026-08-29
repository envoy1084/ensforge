---
title: clearPrimaryName
description: Clears primary name for reverse resolution.
---

# clearPrimaryName

Clears primary name for reverse resolution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.reverse.clearPrimaryName({});
```

## Parameters

```ts
type ClearPrimaryNameParameters = Parameters<typeof sdk.reverse.clearPrimaryName>[0];
```

### parameters

`ClearPrimaryNameParameters`

Argument passed to `clearPrimaryName`.

### options

`Effect.RunOptions | undefined`

Argument passed to `clearPrimaryName`.

## Return Type

```ts
type ClearPrimaryNameResult = Awaited<ReturnType<typeof sdk.reverse.clearPrimaryName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.reverse.clearPrimaryName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.reverse.clearPrimaryName.call(parameters);
```

## Action

- [`clearPrimaryName`](/core/api/actions/reverse/clear-primary-name)
