---
title: getCanonicalResource
description: Get the canonical ENSv2 resource identifier for a name.
---

# getCanonicalResource

Gets the canonical ENSv2 resource identifier assigned to a name.

## Import

```ts
import { getCanonicalResource } from "@ensforge/core";
```

## Usage

```ts
import { getCanonicalResource } from "@ensforge/core";
import { config } from "./config";

const resource = await getCanonicalResource(config, {
  name: "example.eth",
});
```

Canonical resources identify records inside ENSv2 registries. ENSv1 names and available names
without an assigned V2 resource return `null`.

## Parameters

```ts
import type { GetCanonicalResourceParameters } from "@ensforge/core";
```

### name

`string`

ENS name whose canonical resource should be returned.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { GetCanonicalResourceResult } from "@ensforge/core";
```

`bigint | null`

Returns `null` when the active route does not expose a canonical ENSv2 resource.

## Effect

```ts
const effect = getCanonicalResource.effect(config, { name: "example.eth" });
```

## Request

```ts
const request = getCanonicalResource.request({ name: "example.eth" });
```

## Error

```ts
import type { GetCanonicalResourceError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
