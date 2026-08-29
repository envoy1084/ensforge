---
title: setTexts
description: Sets texts for resolver records.
---

# setTexts

Sets texts for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setTexts({
  name: "example.eth",
  texts: [],
});
```

## Parameters

```ts
type SetTextsParameters = Parameters<typeof sdk.records.setTexts>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### texts

`ReadonlyArray<TextRecordInput>`

Value used for `texts` by this method.

## Return Type

```ts
type SetTextsResult = Awaited<ReturnType<typeof sdk.records.setTexts>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setTexts.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setTexts.call(parameters);
```

## Action

- [`setTexts`](/core/api/actions/records/set-texts)
