---
title: setTexts
description: Sets texts for ENS resolver records.
---

# setTexts

Sets texts for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setTexts } from "@ensforge/core";
```

## Usage

```ts
import { setTexts } from "@ensforge/core";
import { config } from "./config";

const result = await setTexts(config, {
  name: "example.eth",
  texts: [{ key: "url", value: "https://example.com" }],
});
```

## Parameters

```ts
type SetTextsParameters = Parameters<typeof setTexts>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### texts

`ReadonlyArray<TextRecordInput>`

Text record key-value pairs to set.

## Return Type

```ts
type SetTextsResult = Awaited<ReturnType<typeof setTexts>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setTexts.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setTexts.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetTextsError = Effect.Effect.Error<ReturnType<typeof setTexts.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
