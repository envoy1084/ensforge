---
title: DNS Zone
description: Composable resolver profile ABI for DNS Zone records.
---

# DNS Zone

Composable resolver profile ABI for DNS Zone records.

## Import

```ts
import {
  dnsZoneResolverAbi,
  dnsZoneResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dnsZoneResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `dnsZoneResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `dnsZoneResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
