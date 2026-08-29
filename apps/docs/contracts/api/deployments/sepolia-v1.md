---
title: Sepolia V1
description: Versioned ENS deployment addresses with chain and source provenance.
---

# Sepolia V1

Versioned ENS deployment addresses with chain and source provenance.

## Import

```ts
import { sepoliaV1Deployment } from "@ensforge/contracts/deployments";
```

## Usage

```ts
const chainId = sepoliaV1Deployment.chainId;
const addresses = sepoliaV1Deployment.contracts;
const sourceCommit = sepoliaV1Deployment.provenance.commit;
```

## Exports

| Export                | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `sepoliaV1Deployment` | Immutable deployment object containing addresses and provenance. |

## Entrypoint

`@ensforge/contracts/deployments`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
