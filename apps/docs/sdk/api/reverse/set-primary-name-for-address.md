---
title: setPrimaryNameForAddress
description: Sets primary name for address for reverse resolution.
---

# setPrimaryNameForAddress

Sets primary name for address for reverse resolution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.reverse.setPrimaryNameForAddress({
  address: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

## Parameters

```ts
type SetPrimaryNameForAddressParameters = Parameters<
  typeof sdk.reverse.setPrimaryNameForAddress
>[0];
```

### address

`string`

Address used by the method.

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### verifyForward

`boolean | undefined`

Value used for `verifyForward` by this method.

## Return Type

```ts
type SetPrimaryNameForAddressResult = Awaited<
  ReturnType<typeof sdk.reverse.setPrimaryNameForAddress>
>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.reverse.setPrimaryNameForAddress.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.reverse.setPrimaryNameForAddress.call(parameters);
```

## Action

- [`setPrimaryNameForAddress`](/core/api/actions/reverse/set-primary-name-for-address)
