---
title: isAvailable
description: Check whether an ENS name is available through its active registration route.
---

# isAvailable

Checks whether an ENS name is currently available.

## Import

```ts
import { isAvailable } from "@ensforge/core";
```

## Usage

```ts
import { isAvailable } from "@ensforge/core";
import { config } from "./config";

const available = await isAvailable(config, { name: "example.eth" });
```

Second-level `.eth` names are checked through the active ETH registrar. Other names use their
registry ownership state. Names reserved for ENSv1 owners on ENSv2 are not available.

## Parameters

```ts
import type { IsAvailableParameters } from "@ensforge/core";
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

Returns `true` when the active route reports the name as available.

## Effect

```ts
const effect = isAvailable.effect(config, { name: "example.eth" });
```

## Request

```ts
const request = isAvailable.request({ name: "example.eth" });
```

## Error

```ts
import type { IsAvailableError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
