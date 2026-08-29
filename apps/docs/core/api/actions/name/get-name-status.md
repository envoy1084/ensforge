---
title: getNameStatus
description: Get the lifecycle status of an ENS name.
---

# getNameStatus

Gets the current lifecycle status of an ENS name.

## Import

```ts
import { getNameStatus } from "@ensforge/core";
```

## Usage

```ts
import { getNameStatus } from "@ensforge/core";
import { config } from "./config";

const status = await getNameStatus(config, { name: "example.eth" });
```

The result accounts for registrar expiry, grace periods, V2 reservation, and the active name route.

## Parameters

```ts
import type { GetNameStatusParameters } from "@ensforge/core";
```

### name

`string`

ENS name whose lifecycle status should be returned.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { GetNameStatusResult } from "@ensforge/core";
```

`"available" | "active" | "grace" | "expired" | "reserved"`

- `available`: the name can be registered or claimed through the supported route.
- `active`: the name is owned and has not expired.
- `grace`: the registration has expired but remains renewable by the existing owner.
- `expired`: the active ownership period and grace behavior no longer apply.
- `reserved`: ENSv2 reserves the name for an existing ENSv1 registration.

## Effect

```ts
const effect = getNameStatus.effect(config, { name: "example.eth" });
```

## Request

```ts
const request = getNameStatus.request({ name: "example.eth" });
```

## Error

```ts
import type { GetNameStatusError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
