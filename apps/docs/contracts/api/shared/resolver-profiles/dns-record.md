---
title: DNS Record
description: Composable resolver profile ABI for DNS Record records.
---

# DNS Record

Composable resolver profile ABI for DNS Record records.

## Import

```ts
import {
  dnsRecordResolverAbi,
  dnsRecordResolverInterfaceId,
} from "@ensforge/contracts/resolver-profiles";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dnsRecordResolverAbi,
  client: publicClient,
});
```

## Exports

| Export                         | Description                                             |
| ------------------------------ | ------------------------------------------------------- |
| `dnsRecordResolverAbi`         | Immutable ABI value with viem-compatible literal types. |
| `dnsRecordResolverInterfaceId` | ERC-165 interface identifier constant.                  |

## Entrypoint

`@ensforge/contracts/resolver-profiles`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
