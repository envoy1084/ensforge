---
title: setSubnameExpiry
description: Sets subname expiry for subname management.
---

# setSubnameExpiry

Sets subname expiry for subname management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.subnames.setSubnameExpiry({
  expiry: 2_000_000_000n,
  name: "example.eth",
});
```

## Parameters

```ts
type SetSubnameExpiryParameters = Parameters<typeof sdk.subnames.setSubnameExpiry>[0];
```

### expiry

`bigint`

Unix timestamp for the requested expiry.

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

## Return Type

```ts
type SetSubnameExpiryResult = Awaited<ReturnType<typeof sdk.subnames.setSubnameExpiry>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.subnames.setSubnameExpiry.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.subnames.setSubnameExpiry.call(parameters);
```

## Action

- [`setSubnameExpiry`](/core/api/actions/subnames/set-subname-expiry)
