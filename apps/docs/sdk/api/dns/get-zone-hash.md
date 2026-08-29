---
title: getZoneHash
description: Gets zone hash for DNS and DNSSEC.
---

# getZoneHash

Gets zone hash for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.dns.getZoneHash({
  name: "example.eth",
});
```

## Parameters

```ts
type GetZoneHashParameters = Parameters<typeof sdk.dns.getZoneHash>[0];
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
type GetZoneHashResult = Awaited<ReturnType<typeof sdk.dns.getZoneHash>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.dns.getZoneHash.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.dns.getZoneHash.request(parameters);
```

## Action

- [`getZoneHash`](/core/api/actions/dns/get-zone-hash)
