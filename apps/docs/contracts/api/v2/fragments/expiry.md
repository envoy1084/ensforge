---
title: Expiry
description: Focused, tree-shakable ABI fragments for Expiry.
---

# Expiry

Focused, tree-shakable ABI fragments for Expiry.

## Import

```ts
import {
  getExpiryV2EthRegistryAbi,
  getExpiryV2TemporalRegistryAbi,
  getExpiryV2GracePeriodAbi,
  getExpiryV2UniversalResolverAbi,
} from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: getExpiryV2EthRegistryAbi,
  client: publicClient,
});
```

## Exports

| Export                            | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| `getExpiryV2EthRegistryAbi`       | Immutable ABI value with viem-compatible literal types. |
| `getExpiryV2TemporalRegistryAbi`  | Immutable ABI value with viem-compatible literal types. |
| `getExpiryV2GracePeriodAbi`       | Immutable ABI value with viem-compatible literal types. |
| `getExpiryV2UniversalResolverAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
