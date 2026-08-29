---
title: getProtocol
description: Get the active ENS protocol route for a name.
---

# getProtocol

Gets the protocol currently responsible for an ENS name.

## Import

```ts
import { getProtocol } from "@ensforge/core";
```

## Usage

```ts
import { getProtocol } from "@ensforge/core";
import { config } from "./config";

const protocol = await getProtocol(config, { name: "example.eth" });
```

An unmigrated reserved name returns `"v1"` because its active ownership remains in ENSv1. A migrated
or native ENSv2 name returns `"v2"`.

## Parameters

```ts
import type { GetProtocolParameters } from "@ensforge/core";
```

### name

`string`

ENS name whose active protocol should be returned.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { GetProtocolResult } from "@ensforge/core";
```

`"v1" | "v2"`

## Effect

```ts
const effect = getProtocol.effect(config, { name: "example.eth" });
```

## Request

```ts
const request = getProtocol.request({ name: "example.eth" });
```

## Error

```ts
import type { GetProtocolError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
