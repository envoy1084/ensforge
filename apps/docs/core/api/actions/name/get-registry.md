---
title: getRegistry
description: Get the registry contract that contains an ENS name.
---

# getRegistry

Gets the registry contract currently responsible for the name's record.

## Import

```ts
import { getRegistry } from "@ensforge/core";
```

## Usage

```ts
import { getRegistry } from "@ensforge/core";
import { config } from "./config";

const registry = await getRegistry(config, { name: "example.eth" });
```

For ENSv1 and reserved names this returns the V1 registry. For ENSv2 routes it returns the parent
registry containing the name resource.

## Parameters

```ts
import type { GetRegistryParameters } from "@ensforge/core";
```

### name

`string`

ENS name whose registry should be returned.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { GetRegistryResult } from "@ensforge/core";
```

`EthereumAddress`

## Effect

```ts
const effect = getRegistry.effect(config, { name: "example.eth" });
```

## Request

```ts
const request = getRegistry.request({ name: "example.eth" });
```

## Error

```ts
import type { GetRegistryError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
