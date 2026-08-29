---
title: getManager
description: Get the account that manages an ENS name.
---

# getManager

Gets the account with manager-level control of an ENS name.

## Import

```ts
import { getManager } from "@ensforge/core";
```

## Usage

```ts
import { getManager } from "@ensforge/core";
import { config } from "./config";

const manager = await getManager(config, { name: "ens.eth" });
```

On ENSv1, this is the effective registry or wrapper owner. On ENSv2, it is the latest owner stored by
the active registry route. This action performs only the reads needed for the manager; it does not
assemble a complete name state.

## Parameters

```ts
import type { GetManagerParameters } from "@ensforge/core";
```

### name

`string`

ENS name whose manager should be returned.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { GetManagerResult } from "@ensforge/core";
```

`EthereumAddress | null`

Returns `null` when the name has no active manager.

## Effect

```ts
const effect = getManager.effect(config, { name: "ens.eth" });
// Effect.Effect<EthereumAddress | null, GetManagerError>
```

## Request

```ts
const request = getManager.request({ name: "ens.eth" });
```

## Error

```ts
import type { GetManagerError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
