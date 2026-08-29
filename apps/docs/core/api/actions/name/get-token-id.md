---
title: getTokenId
description: Get the registrar, wrapper, or registry token ID for an ENS name.
---

# getTokenId

Gets the token identifier representing an ENS name on its active ownership route.

## Import

```ts
import { getTokenId } from "@ensforge/core";
```

## Usage

```ts
import { getTokenId } from "@ensforge/core";
import { config } from "./config";

const tokenId = await getTokenId(config, { name: "ens.eth" });
```

For a wrapped ENSv1 name, the token ID is its namehash. For an unwrapped second-level `.eth` name,
it is the labelhash interpreted as a bigint. ENSv2 returns the token ID stored by the registry route.

## Parameters

```ts
import type { GetTokenIdParameters } from "@ensforge/core";
```

### name

`string`

ENS name whose token identifier should be returned.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
import type { GetTokenIdResult } from "@ensforge/core";
```

`bigint | null`

Returns `null` when the name is not represented by a supported registrar, wrapper, or tokenized V2
registry.

## Effect

```ts
const effect = getTokenId.effect(config, { name: "ens.eth" });
```

## Request

```ts
const request = getTokenId.request({ name: "ens.eth" });
```

## Error

```ts
import type { GetTokenIdError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
