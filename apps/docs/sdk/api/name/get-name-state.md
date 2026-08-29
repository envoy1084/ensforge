---
title: getNameState
description: Gets the complete protocol-aware state of an ENS name.
---

# getNameState

Gets the complete protocol-aware state of an ENS name.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.name.getNameState({
  name: "example.eth",
});
```

## Parameters

```ts
type GetNameStateParameters = Parameters<typeof sdk.name.getNameState>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetNameStateResult = Awaited<ReturnType<typeof sdk.name.getNameState>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.name.getNameState.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.name.getNameState.request(parameters);
```

## Action

- [`getNameState`](/core/api/actions/name/get-name-state)
