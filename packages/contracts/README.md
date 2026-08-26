# `@ensforge/contracts`

Versioned ENS contract ABIs, interfaces, deployment addresses, and artifact provenance for
Ensforge.

The package is runtime-neutral and publishes ESM compatible with Node.js and browser bundlers. It
will contain protocol data only; Effect services, actions, wallet integration, and V1/V2 state
routing belong in `@ensforge/core`.

The package is private while its initial contract surface is being implemented.

## Shared interfaces

Phase 1 exports the standard ERC interfaces used by ENS ownership and payment flows, plus portable
ENS resolver profiles:

```ts
import {
  erc20Abi,
  erc721Abi,
  erc1155Abi,
  textResolverAbi,
  textResolverInterfaceId,
} from "@ensforge/contracts";
```

The ERC-20, ERC-721, and ERC-1155 ABIs are re-exported from viem. Resolver profiles are sourced
from the pinned ENS contract interfaces and include their associated events and ERC-165 interface
IDs.

The same exports are available through focused package subpaths:

```ts
import { erc165Abi } from "@ensforge/contracts/shared";
import { addrResolverAbi } from "@ensforge/contracts/resolver-profiles";
```

## ENSv1 ownership contracts

The V1 entrypoint exports the complete ownership and registry ABIs from the pinned
`@ensdomains/ens-contracts` `v1.7.0` source:

```ts
import {
  baseRegistrarV1Abi,
  ensRegistryV1Abi,
  nameWrapperFuses,
  nameWrapperUpgradeV1Abi,
  nameWrapperV1Abi,
} from "@ensforge/contracts/v1";
```

The same entrypoint exports the complete V1 resolution contracts:

```ts
import {
  offchainDnsResolverV1Abi,
  publicResolverV1Abi,
  universalResolverV1Abi,
} from "@ensforge/contracts/v1";
```

V1 registrar exports keep interfaces and materially different implementations separate:

```ts
import {
  bulkRenewalV1Abi,
  ethRegistrarControllerV1Abi,
  exponentialPremiumPriceOracleV1Abi,
  priceOracleV1Abi,
  staticBulkRenewalV1Abi,
  wrappedEthRegistrarControllerV1Abi,
} from "@ensforge/contracts/v1";
```

Reverse-resolution exports cover current L1, default, L2, migration-capable L2, and standalone
registrars:

```ts
import {
  defaultReverseRegistrarV1Abi,
  l2ReverseRegistrarV1Abi,
  l2ReverseRegistrarWithMigrationV1Abi,
  reverseRegistrarV1Abi,
  standaloneReverseRegistrarV1Abi,
} from "@ensforge/contracts/v1";
```

DNS ownership and proof verification are exposed separately from the offchain DNS resolver:

```ts
import {
  dnsRegistrarV1Abi,
  dnsRegistrarV1InterfaceAbi,
  dnssecOracleV1Abi,
  dnssecOracleV1InterfaceAbi,
} from "@ensforge/contracts/v1";
```

## Deployments

Addresses are exported separately from ABIs through explicit named profiles. This avoids ambiguous
chain-only selection when legacy V1 and V2 deployments coexist on the same chain.

```ts
import { mainnetV1Deployment, sepoliaV1Deployment } from "@ensforge/contracts/deployments";
```

Mainnet uses the canonical upgradeable Universal Resolver proxy. Sepolia V1 is marked as legacy
because current ENS applications and resolution use the V2 deployment there.

## Commands

```sh
pnpm --filter @ensforge/contracts build
pnpm --filter @ensforge/contracts dev
pnpm --filter @ensforge/contracts lint
pnpm --filter @ensforge/contracts typecheck
pnpm --filter @ensforge/contracts test
pnpm --filter @ensforge/contracts pack:check
```
