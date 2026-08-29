---
title: getOwner
description: Get the effective owner of an ENS name.
---

# getOwner

Gets the effective owner and ownership source for an ENS name.

## Import

```ts
import { getOwner } from "@ensforge/core";
```

## Usage

```ts
import { getOwner } from "@ensforge/core";
import { config } from "./config";

const result = await getOwner(config, { name: "ens.eth" });
```

The action routes across the ENS registry, ETH registrar, and Name Wrapper as required. It also
handles migrated and reserved names on an ENSv2 deployment.

## Parameters

```ts
import type { GetOwnerParameters } from "@ensforge/core";
```

### name

`string`

ENS name to inspect. The name is normalized before it is read.

```ts
await getOwner(config, {
  name: "ens.eth", // [!code focus]
});
```

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be used with `blockTag`.

```ts
await getOwner(config, {
  name: "ens.eth",
  blockNumber: 22_000_000n, // [!code focus]
});
```

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be used with `blockNumber`.

## Return Type

```ts
import type { OwnerResult } from "@ensforge/core";
```

`OwnerResult | null`

```ts
type OwnerResult = {
  name: NormalizedName;
  owner: EthereumAddress | null;
  registrant: EthereumAddress | null;
  protocol: "v1" | "v2";
  ownershipLevel: "registry" | "registrar" | "nameWrapper";
};
```

Returns `null` when the name has no owner. `owner` is the account that currently controls the name.
`registrant` is present when a separate registrar-level owner exists.

## Effect

```ts
const effect = getOwner.effect(config, { name: "ens.eth" });
// Effect.Effect<OwnerResult | null, GetOwnerError>
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getOwner.request({ name: "ens.eth" });
```

## Error

```ts
import type { GetOwnerError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
