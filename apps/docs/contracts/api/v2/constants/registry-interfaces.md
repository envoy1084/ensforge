---
title: Registry Interfaces
description: Typed protocol constants for Registry Interfaces.
---

# Registry Interfaces

Typed protocol constants for Registry Interfaces.

## Import

```ts
import { registryInterfaceIds, RegistryInterfaceId } from "@ensforge/contracts/v2";
```

## Usage

```ts
const definition = registryInterfaceIds;
```

## Exports

| Export                 | Description                            |
| ---------------------- | -------------------------------------- |
| `registryInterfaceIds` | ERC-165 interface identifier constant. |
| `RegistryInterfaceId`  | ERC-165 interface identifier constant. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use this immutable protocol constant directly with viem encoding, decoding, contract, and log utilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof registryInterfaceIds;
```
