---
title: ETH Renewer V1
description: Complete ABI for the ETH Renewer V1 contract.
---

# ETH Renewer V1

Complete ABI for the ETH Renewer V1 contract.

## Import

```ts
import { ethRenewerV1Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRenewerV1Abi,
  client: publicClient,
});
```

## Exports

| Export            | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `ethRenewerV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
