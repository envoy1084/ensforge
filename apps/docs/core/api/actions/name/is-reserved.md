---
title: isReserved
description: Check whether ENSv2 reserves a name for its ENSv1 owner.
---

# isReserved

Checks whether a name is reserved in ENSv2 for an existing ENSv1 owner and has not migrated yet.

## Import

```ts
import { isReserved } from "@ensforge/core";
```

## Usage

```ts
import { isReserved } from "@ensforge/core";
import { config } from "./config";

const reserved = await isReserved(config, { name: "example.eth" });
```

On a deployment without the ENSv2 migration route, this action returns `false`.

## Parameters

```ts
import type { IsReservedParameters } from "@ensforge/core";
```

### name

`string`

ENS name to check.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

`boolean`

## Effect

```ts
const effect = isReserved.effect(config, { name: "example.eth" });
```

## Request

```ts
const request = isReserved.request({ name: "example.eth" });
```

## Error

```ts
import type { IsReservedError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
