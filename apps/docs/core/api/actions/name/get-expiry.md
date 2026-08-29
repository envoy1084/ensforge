---
title: getExpiry
description: Get the expiry and grace-period boundary of an ENS name.
---

# getExpiry

Gets the expiry, grace period, and contract source for a renewable ENS name.

## Import

```ts
import { getExpiry } from "@ensforge/core";
```

## Usage

```ts
import { getExpiry } from "@ensforge/core";
import { config } from "./config";

const expiry = await getExpiry(config, { name: "ens.eth" });
```

## Parameters

```ts
import type { GetExpiryParameters } from "@ensforge/core";
```

### name

`string`

ENS name whose expiry should be read.

```ts
const expiry = await getExpiry(config, {
  name: "ens.eth", // [!code focus]
});
```

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { ExpiryResult } from "@ensforge/core";
```

`ExpiryResult | null`

```ts
type ExpiryResult = {
  name: NormalizedName;
  expiry: bigint;
  gracePeriod: bigint;
  gracePeriodEnd: bigint;
  protocol: "v1" | "v2";
  source: "baseRegistrar" | "nameWrapper" | "registry";
};
```

All time values are Unix timestamps or durations in seconds. Returns `null` when the name has no
expiry tracked by a supported registrar, wrapper, or registry.

## Effect

```ts
const effect = getExpiry.effect(config, { name: "ens.eth" });
// Effect.Effect<ExpiryResult | null, GetExpiryError>
```

## Request

```ts
const request = getExpiry.request({ name: "ens.eth" });
```

## Error

```ts
import type { GetExpiryError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
