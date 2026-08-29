---
title: Deployments
description: Select ENS addresses and verify their provenance.
---

# Deployments

Deployment objects keep contract addresses, protocol, chain, release status, and source provenance
together.

```ts
import { mainnetV1Deployment, sepoliaV2Deployment } from "@ensforge/contracts/deployments";

const registry = mainnetV1Deployment.contracts.registry;
const registrar = sepoliaV2Deployment.contracts.ethRegistrar;
```

## Status

`active` is the supported production route, `beta` identifies a pre-production deployment, and
`legacy` is retained for compatibility or migration reads.

## Provenance

Every deployment includes the source repository, ref, commit, and optional documentation URL. Use
these fields in release tooling or audits instead of inferring a source from the object name.

## ENSv2 groups

ENSv2 separates public contracts, implementations, migration contracts, infrastructure, optional
experimental deployments, and optional test tokens. Do not treat implementation addresses as public
interaction targets unless the contract documentation explicitly requires it.
