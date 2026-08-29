---
title: setAddresses
description: Sets addresses for resolver records.
---

# setAddresses

Sets addresses for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setAddresses({
  name: "example.eth",
  addresses: [],
});
```

## Parameters

```ts
type SetAddressesParameters = Parameters<typeof sdk.records.setAddresses>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### addresses

`ReadonlyArray<AddressRecordInput>`

Value used for `addresses` by this method.

## Return Type

```ts
type SetAddressesResult = Awaited<ReturnType<typeof sdk.records.setAddresses>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setAddresses.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setAddresses.call(parameters);
```

## Action

- [`setAddresses`](/core/api/actions/records/set-addresses)
