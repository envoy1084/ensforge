# `@ensforge/contracts`

ENSv2 contract ABIs, deployment addresses, resolver profiles, and shared interfaces. ENSv1 exports
are included for applications that need transition and migration support.

## Installation

```sh
pnpm add @ensforge/contracts
```

## Usage

```ts
import { textResolverAbi } from "@ensforge/contracts/resolver-profiles";
import { mainnetV1Deployment, sepoliaV2Deployment } from "@ensforge/contracts/deployments";
import { ensRegistryV1Abi } from "@ensforge/contracts/v1";
import { ethRegistrarV2Abi } from "@ensforge/contracts/v2";
```

Exports are organized under `deployments`, `resolver-profiles`, `shared`, `v1`, and `v2`.
