---
title: setAbi
description: Sets abi for resolver records.
---

# setAbi

Sets abi for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setAbi({
  name: "example.eth",
  contentType: {},
  value: "https://example.com",
});
```

## Parameters

```ts
type SetAbiParameters = Parameters<typeof sdk.records.setAbi>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### contentType

`Exclude<AbiContentType, "uri">`

Value used for `contentType` by this method.

### value

`Abi`

Value written by the method.

## Return Type

```ts
type SetAbiResult = Awaited<ReturnType<typeof sdk.records.setAbi>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setAbi.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setAbi.call(parameters);
```

## Action

- [`setAbi`](/core/api/actions/records/set-abi)
