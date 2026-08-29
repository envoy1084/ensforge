---
title: setZoneHash
description: Sets zone hash for DNS and DNSSEC.
---

# setZoneHash

Sets zone hash for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.dns.setZoneHash({
  name: "example.eth",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetZoneHashParameters = Parameters<typeof sdk.dns.setZoneHash>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### value

`Hex`

Value written by the method.

## Return Type

```ts
type SetZoneHashResult = Awaited<ReturnType<typeof sdk.dns.setZoneHash>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.dns.setZoneHash.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.dns.setZoneHash.call(parameters);
```

## Action

- [`setZoneHash`](/core/api/actions/dns/set-zone-hash)
