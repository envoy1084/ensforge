---
title: getRegistrant
description: Get the ENSv1 .eth registrant for a name.
---

# getRegistrant

Gets the registrar-level owner of an ENSv1 second-level `.eth` name.

## Import

```ts
import { getRegistrant } from "@ensforge/core";
```

## Usage

```ts
import { getRegistrant } from "@ensforge/core";
import { config } from "./config";

const registrant = await getRegistrant(config, { name: "ens.eth" });
```

Registrant is an ENSv1 concept exposed by the `.eth` Base Registrar. ENSv2 names and names outside
that registrar return `null`; use `getOwner` or `getManager` for their controlling account.

## Parameters

```ts
import type { GetRegistrantParameters } from "@ensforge/core";
```

### name

`string`

ENS name whose registrar owner should be read.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { GetRegistrantResult } from "@ensforge/core";
```

`EthereumAddress | null`

Returns `null` when the name does not have a supported separate registrant.

## Effect

```ts
const effect = getRegistrant.effect(config, { name: "ens.eth" });
```

## Request

```ts
const request = getRegistrant.request({ name: "ens.eth" });
```

## Error

```ts
import type { GetRegistrantError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
