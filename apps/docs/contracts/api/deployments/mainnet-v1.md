---
title: Mainnet V1
description: Versioned ENS deployment addresses with chain and source provenance.
---

# Mainnet V1

Versioned ENS deployment addresses with chain and source provenance.

## Import

```ts
import { mainnetV1Deployment } from "@ensforge/contracts/deployments";
```

## Usage

```ts
const chainId = mainnetV1Deployment.chainId;
const addresses = mainnetV1Deployment.contracts;
const sourceCommit = mainnetV1Deployment.provenance.commit;
```

## Exports

| Export                | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `mainnetV1Deployment` | Immutable deployment object containing addresses and provenance. |

## Entrypoint

`@ensforge/contracts/deployments`

<!--@include: @/shared/contracts/entrypoint.md-->

## When to use

Use the deployment object instead of copying addresses into application code. Network, protocol status, contract groups, and source provenance remain attached to the addresses.

## Type Safety

<!--@include: @/shared/contracts/type-safety.md-->

```ts
type Export = typeof mainnetV1Deployment;
```

## Deployment fields

| Property     | Description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| `chainId`    | Chain the addresses are deployed on.                                     |
| `protocol`   | ENS protocol generation represented by the object.                       |
| `status`     | Support status such as active, beta, or legacy.                          |
| `contracts`  | Typed public contract addresses, grouped where the protocol requires it. |
| `provenance` | Source repository, ref, commit, and documentation origin.                |
