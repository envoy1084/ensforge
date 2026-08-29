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

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
