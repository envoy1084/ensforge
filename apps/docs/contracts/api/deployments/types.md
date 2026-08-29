---
title: Types
description: Type definitions for ENS deployments, addresses, status, and provenance.
---

# Types

Type definitions for ENS deployments, addresses, status, and provenance.

## Import

```ts
import type {
  EnsDeploymentStatus,
  EnsDeploymentProvenance,
  EnsV1ContractAddresses,
  EnsV1Deployment,
  EnsV2PublicContractAddresses,
  EnsV2ImplementationAddresses,
  EnsV2MigrationContractAddresses,
  EnsV2InfrastructureContractAddresses,
  EnsV2ExperimentalHcaContractAddresses,
  EnsV2TestTokenAddresses,
  EnsV2Deployment,
} from "@ensforge/contracts/deployments";
```

## Usage

```ts
const chainId = EnsV1Deployment.chainId;
const addresses = EnsV1Deployment.contracts;
const sourceCommit = EnsV1Deployment.provenance.commit;
```

## Exports

| Export                                  | Description                                                      |
| --------------------------------------- | ---------------------------------------------------------------- |
| `EnsDeploymentStatus`                   | Exported TypeScript type for this module.                        |
| `EnsDeploymentProvenance`               | Exported TypeScript type for this module.                        |
| `EnsV1ContractAddresses`                | Exported TypeScript type for this module.                        |
| `EnsV1Deployment`                       | Immutable deployment object containing addresses and provenance. |
| `EnsV2PublicContractAddresses`          | Exported TypeScript type for this module.                        |
| `EnsV2ImplementationAddresses`          | Exported TypeScript type for this module.                        |
| `EnsV2MigrationContractAddresses`       | Exported TypeScript type for this module.                        |
| `EnsV2InfrastructureContractAddresses`  | Exported TypeScript type for this module.                        |
| `EnsV2ExperimentalHcaContractAddresses` | Exported TypeScript type for this module.                        |
| `EnsV2TestTokenAddresses`               | Exported TypeScript type for this module.                        |
| `EnsV2Deployment`                       | Immutable deployment object containing addresses and provenance. |

## Entrypoint

`@ensforge/contracts/deployments`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
