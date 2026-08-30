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

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this immutable protocol constant directly with viem encoding, decoding, contract, and log utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof registryInterfaceIds;
```
