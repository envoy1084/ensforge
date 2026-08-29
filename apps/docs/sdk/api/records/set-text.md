---
title: setText
description: Sets text for resolver records.
---

# setText

Sets text for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setText({
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetTextParameters = Parameters<typeof sdk.records.setText>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### key

`string`

Record key.

### value

`string`

Value written by the method.

## Return Type

```ts
type SetTextResult = Awaited<ReturnType<typeof sdk.records.setText>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setText.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setText.call(parameters);
```

## Action

- [`setText`](/core/api/actions/records/set-text)
