---
title: getContentHash
description: Gets content hash for resolver records.
---

# getContentHash

Gets content hash for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.getContentHash({
  name: "example.eth",
});
```

## Parameters

```ts
type GetContentHashParameters = Parameters<typeof sdk.records.getContentHash>[0];
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
type GetContentHashResult = Awaited<ReturnType<typeof sdk.records.getContentHash>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.getContentHash.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.records.getContentHash.request(parameters);
```

## Action

- [`getContentHash`](/core/api/actions/records/get-content-hash)
