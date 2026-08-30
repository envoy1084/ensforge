---
title: Resolver Interfaces
description: Typed protocol constants for Resolver Interfaces.
---

# Resolver Interfaces

Typed protocol constants for Resolver Interfaces.

## Import

```ts
import { resolverInterfaceIds, ResolverInterfaceId } from "@ensforge/contracts/v2";
```

## Usage

```ts
const definition = resolverInterfaceIds;
```

## Exports

| Export                 | Description                            |
| ---------------------- | -------------------------------------- |
| `resolverInterfaceIds` | ERC-165 interface identifier constant. |
| `ResolverInterfaceId`  | ERC-165 interface identifier constant. |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this immutable protocol constant directly with viem encoding, decoding, contract, and log utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof resolverInterfaceIds;
```
