# `@ensforge/contracts`

Runtime-neutral ENSv1 and ENSv2 ABIs, interfaces, constants, resolver profiles, and deployment
metadata for viem and other TypeScript tooling.

## Installation

```sh
pnpm add @ensforge/contracts viem
```

## Usage

```ts
import { textResolverAbi } from "@ensforge/contracts/resolver-profiles";
import { mainnetV1Deployment, sepoliaV2Deployment } from "@ensforge/contracts/deployments";
import { ensRegistryV1Abi } from "@ensforge/contracts/v1";
import { ethRegistrarV2Abi } from "@ensforge/contracts/v2";
```

Available subpaths include `deployments`, `shared`, `resolver-profiles`, `v1`, `v2`, and the explicit
experimental `v2/experimental/hca` entrypoint.

## Development

```sh
pnpm --filter @ensforge/contracts typecheck
pnpm --filter @ensforge/contracts test
pnpm --filter @ensforge/contracts build
```
