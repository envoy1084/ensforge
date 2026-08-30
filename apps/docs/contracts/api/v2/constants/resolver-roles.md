---
title: Resolver Roles
description: Typed protocol constants for Resolver Roles.
---

# Resolver Roles

Typed protocol constants for Resolver Roles.

## Import

```ts
import { resolverRoles, ResolverRole } from "@ensforge/contracts/v2";
```

## Usage

```ts
const definition = resolverRoles;
```

## Exports

| Export          | Description                                      |
| --------------- | ------------------------------------------------ |
| `resolverRoles` | Role bitmask constants or their TypeScript type. |
| `ResolverRole`  | Exported TypeScript type for this module.        |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this immutable protocol constant directly with viem encoding, decoding, contract, and log utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof resolverRoles;
```
