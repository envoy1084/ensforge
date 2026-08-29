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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.

## When to use

Use this immutable protocol constant directly with viem encoding, decoding, contract, and log utilities.

## Type Safety

Exports retain literal TypeScript types, so viem can infer valid function names, arguments, return values, and event fields without a manual cast.

```ts
type Export = typeof enhancedAccessControlRoles;
```
