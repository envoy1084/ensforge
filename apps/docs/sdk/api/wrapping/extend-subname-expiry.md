---
title: extendSubnameExpiry
description: extend subname expiry for wrapped names.
---

# extendSubnameExpiry

extend subname expiry for wrapped names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.wrapping.extendSubnameExpiry({
  name: "example.eth",
  expiry: 2_000_000_000n,
});
```

## Parameters

```ts
type ExtendSubnameExpiryParameters = Parameters<typeof sdk.wrapping.extendSubnameExpiry>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### expiry

`bigint`

Unix timestamp for the requested expiry.

## Return Type

```ts
type ExtendSubnameExpiryResult = Awaited<ReturnType<typeof sdk.wrapping.extendSubnameExpiry>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.wrapping.extendSubnameExpiry.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.wrapping.extendSubnameExpiry.call(parameters);
```

## Action

- [`extendSubnameExpiry`](/core/api/actions/wrapping/extend-subname-expiry)
