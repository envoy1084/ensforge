---
title: DNS V1 Mirror Root Batch Registrar
description: Complete ABI for the DNS V1 Mirror Root Batch Registrar contract.
---

# DNS V1 Mirror Root Batch Registrar

Complete ABI for the DNS V1 Mirror Root Batch Registrar contract.

## Import

```ts
import { dnsV1MirrorRootBatchRegistrarV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dnsV1MirrorRootBatchRegistrarV2Abi,
  client: publicClient,
});
```

## Exports

| Export                               | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| `dnsV1MirrorRootBatchRegistrarV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
