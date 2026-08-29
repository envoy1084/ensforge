---
title: Sepolia V2
description: Versioned ENS deployment addresses with chain and source provenance.
---

# Sepolia V2

Versioned ENS deployment addresses with chain and source provenance.

## Import

```ts
import { sepoliaV2Deployment } from "@ensforge/contracts/deployments";
```

## Usage

```ts
const chainId = sepoliaV2Deployment.chainId;
const addresses = sepoliaV2Deployment.contracts;
const sourceCommit = sepoliaV2Deployment.provenance.commit;
```

## Exports

| Export                | Description                                                      |
| --------------------- | ---------------------------------------------------------------- |
| `sepoliaV2Deployment` | Immutable deployment object containing addresses and provenance. |

## Entrypoint

`@ensforge/contracts/deployments`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
