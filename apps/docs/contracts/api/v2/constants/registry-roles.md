---
title: Registry Roles
description: Typed protocol constants for Registry Roles.
---

# Registry Roles

Typed protocol constants for Registry Roles.

## Import

```ts
import { enhancedAccessControlRoles, registryRoles, RegistryRole } from "@ensforge/contracts/v2";
```

## Usage

```ts
const definition = enhancedAccessControlRoles;
```

## Exports

| Export                       | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| `enhancedAccessControlRoles` | Role bitmask constants or their TypeScript type. |
| `registryRoles`              | Role bitmask constants or their TypeScript type. |
| `RegistryRole`               | Exported TypeScript type for this module.        |

## Entrypoint

`@ensforge/contracts/v2`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use this immutable protocol constant directly with viem encoding, decoding, contract, and log utilities.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof enhancedAccessControlRoles;
```
