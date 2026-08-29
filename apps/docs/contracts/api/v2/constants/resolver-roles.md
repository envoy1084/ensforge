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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use this immutable protocol constant directly with viem encoding, decoding, contract, and log utilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof resolverRoles;
```
