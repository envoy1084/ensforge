---
title: getNameHistory
description: Gets name history for ENS events.
---

# getNameHistory

Gets name history for ENS events.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.events.getNameHistory({
  name: "example.eth",
  fromBlock: 22_000_000n,
});
```

## Parameters

```ts
type GetNameHistoryParameters = Parameters<typeof sdk.events.getNameHistory>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### fromBlock

`bigint`

First block included in an event query.

### toBlock

`bigint | undefined`

Last block included in an event query.

## Return Type

```ts
type GetNameHistoryResult = Awaited<ReturnType<typeof sdk.events.getNameHistory>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.events.getNameHistory.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`getNameHistory`](/core/api/actions/events/get-name-history)
