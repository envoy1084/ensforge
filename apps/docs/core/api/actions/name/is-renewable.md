---
title: isRenewable
description: Check whether an ENS .eth registration can be renewed.
---

# isRenewable

Checks whether a second-level `.eth` registration can be renewed through its active route.

## Import

```ts
import { isRenewable } from "@ensforge/core";
```

## Usage

```ts
import { isRenewable } from "@ensforge/core";
import { config } from "./config";

const renewable = await isRenewable(config, { name: "example.eth" });
```

ENSv1 registrations use the V1 registrar state. ENSv2 names use the ETH Registrar. Reserved,
unmigrated names use the V1 renewal compatibility contract. Names outside second-level `.eth` return
`false`.

## Parameters

```ts
import type { IsRenewableParameters } from "@ensforge/core";
```

### name

`string`

Second-level `.eth` name to check.

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
const effect = isRenewable.effect(config, { name: "example.eth" });
```

## Request

```ts
const request = isRenewable.request({ name: "example.eth" });
```

## Error

```ts
import type { IsRenewableError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
