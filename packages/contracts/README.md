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

## Commands

```sh
pnpm --filter @ensforge/contracts build
pnpm --filter @ensforge/contracts dev
pnpm --filter @ensforge/contracts lint
pnpm --filter @ensforge/contracts typecheck
pnpm --filter @ensforge/contracts test
pnpm --filter @ensforge/contracts pack:check
```
