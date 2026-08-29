# `@ensforge/contracts`

Type-safe contract definitions and deployment metadata for ENS.

## Features

- Versioned ENS contract ABIs organized by protocol
- Function-focused ABI fragments for tree-shakable reads and writes
- Mainnet and Sepolia deployment addresses with provenance
- Reusable resolver profile ABIs
- Shared interfaces, events, errors, and standards
- Immutable TypeScript exports designed for viem

## Installation

```sh
pnpm add @ensforge/contracts
```

## Overview

```ts
import { mainnetV1Deployment, sepoliaV2Deployment } from "@ensforge/contracts/deployments";
import { textResolverAbi } from "@ensforge/contracts/resolver-profiles";
import { ensRegistryV1Abi, ensRegistryV1OwnerAbi } from "@ensforge/contracts/v1";
import { ethRegistrarV2Abi } from "@ensforge/contracts/v2";

const registryAddress = mainnetV1Deployment.contracts.registry;
const registrarAddress = sepoliaV2Deployment.contracts.ethRegistrar;
```

Use the ABIs directly with viem:

```ts
import { namehash } from "viem/ens";

const owner = await publicClient.readContract({
  address: mainnetV1Deployment.contracts.registry,
  abi: ensRegistryV1OwnerAbi,
  functionName: "owner",
  args: [namehash("ens.eth")],
});
```

Function fragments include the relevant custom errors so viem can decode contract reverts. Complete
ABIs such as `ensRegistryV1Abi` remain available for advanced use and event processing.

Package entrypoints include `deployments`, `resolver-profiles`, `shared`, `v1`, and `v2`.

## License

Apache-2.0
