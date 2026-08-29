---
title: isWrapped
description: Check whether an ENS name is represented by a wrapper registry.
---

# isWrapped

Checks whether an ENS name uses a supported wrapper ownership model.

## Import

```ts
import { isWrapped } from "@ensforge/core";
```

## Usage

```ts
import { isWrapped } from "@ensforge/core";
import { config } from "./config";

const wrapped = await isWrapped(config, { name: "example.eth" });
```

ENSv1 checks the Name Wrapper. ENSv2 checks whether the active registry route exposes the Wrapper
Registry interface. Available names return `false`.

## Parameters

```ts
import type { IsWrappedParameters } from "@ensforge/core";
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
const effect = isWrapped.effect(config, { name: "example.eth" });
```

## Request

```ts
const request = isWrapped.request({ name: "example.eth" });
```

## Error

```ts
import type { IsWrappedError } from "@ensforge/core";
```

Can fail with `NameError`, `RpcError`, `ContractError`, or `CodecError`.
