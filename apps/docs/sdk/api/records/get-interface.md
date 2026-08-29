---
title: getInterface
description: Gets interface for resolver records.
---

# getInterface

Gets interface for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.getInterface({
  name: "example.eth",
  interfaceId: "0x01ffc9a7",
});
```

## Parameters

```ts
type GetInterfaceParameters = Parameters<typeof sdk.records.getInterface>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### interfaceId

`string`

Four-byte ERC-165 interface identifier.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetInterfaceResult = Awaited<ReturnType<typeof sdk.records.getInterface>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.getInterface.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.records.getInterface.request(parameters);
```

## Action

- [`getInterface`](/core/api/actions/records/get-interface)
