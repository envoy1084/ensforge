---
title: getEnsEvents
description: Gets ens events for normalized ENS contract events.
---

# getEnsEvents

Gets ens events for normalized ENS contract events.

This action belongs to normalized ENS contract events. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getEnsEvents } from "@ensforge/core";
```

## Usage

```ts
import { getEnsEvents } from "@ensforge/core";
import { config } from "./config";

const result = await getEnsEvents(config, {
  fromBlock: 22_000_000n,
});
```

## Parameters

```ts
type GetEnsEventsParameters = Parameters<typeof getEnsEvents>[1];
```

### fromBlock

`bigint`

First block included in the event query.

### toBlock

`bigint | undefined`

Last block included in the event query.

### kinds

`ReadonlyArray<EnsEventKind> | undefined`

Event categories included in the query or watcher.

### name

`string | undefined`

ENS name used by the operation. It is normalized before contract interaction.

### account

`EthereumAddress | undefined`

Account used for authorization and wallet execution.

### commitment

`Bytes32 | undefined`

Registration commitment to submit or inspect.

## Return Type

```ts
type GetEnsEventsResult = Awaited<ReturnType<typeof getEnsEvents>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getEnsEvents.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type GetEnsEventsError = Effect.Effect.Error<ReturnType<typeof getEnsEvents.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
