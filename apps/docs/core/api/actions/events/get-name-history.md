---
title: getNameHistory
description: Gets the normalized event history for one ENS name.
---

# getNameHistory

Gets the normalized event history for one ENS name.

This action belongs to normalized ENS contract events. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getNameHistory } from "@ensforge/core";
```

## Usage

```ts
import { getNameHistory } from "@ensforge/core";
import { config } from "./config";

const result = await getNameHistory(config, {
  name: "example.eth",
  fromBlock: 22_000_000n,
});
```

## Parameters

```ts
type GetNameHistoryParameters = Parameters<typeof getNameHistory>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### fromBlock

`bigint`

First block included in the event query.

### toBlock

`bigint | undefined`

Last block included in the event query.

## Return Type

```ts
type GetNameHistoryResult = Awaited<ReturnType<typeof getNameHistory>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getNameHistory.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type GetNameHistoryError = Effect.Effect.Error<ReturnType<typeof getNameHistory.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
