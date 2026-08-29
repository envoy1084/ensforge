---
title: isMigrated
description: Check whether an ENS name migrated from ENSv1 to ENSv2.
---

# isMigrated

Checks whether an ENS name is an ENSv2 resource migrated from ENSv1.

## Import

```ts
import { isMigrated } from "@ensforge/core";
```

## Usage

```ts
import { isMigrated } from "@ensforge/core";
import { config } from "./config";

const migrated = await isMigrated(config, { name: "example.eth" });
```

The action checks the active V2 registry resource and its `wasReserved` role. ENSv1, available,
reserved-but-unmigrated, and V2-native names return `false`.

## Parameters

```ts
import type { IsMigratedParameters } from "@ensforge/core";
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
const effect = isMigrated.effect(config, { name: "example.eth" });
```

## Request

```ts
const request = isMigrated.request({ name: "example.eth" });
```

## Error

```ts
import type { IsMigratedError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
