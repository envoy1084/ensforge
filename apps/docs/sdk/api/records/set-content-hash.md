---
title: setContentHash
description: Sets content hash for resolver records.
---

# setContentHash

Sets content hash for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setContentHash({
  name: "example.eth",
  protocol: "ipfs",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetContentHashParameters = Parameters<typeof sdk.records.setContentHash>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### protocol

`ContentHashProtocol`

Content-addressing protocol.

### value

`string`

Value written by the method.

## Return Type

```ts
type SetContentHashResult = Awaited<ReturnType<typeof sdk.records.setContentHash>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setContentHash.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setContentHash.call(parameters);
```

## Action

- [`setContentHash`](/core/api/actions/records/set-content-hash)
