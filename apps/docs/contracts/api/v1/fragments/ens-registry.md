---
title: ENS Registry
description: Focused, tree-shakable ABI fragments for ENS Registry.
---

# ENS Registry

Focused, tree-shakable ABI fragments for ENS Registry.

## Import

```ts
import {
  ensRegistryV1IsApprovedForAllAbi,
  ensRegistryV1OwnerAbi,
  ensRegistryV1ResolverAbi,
  ensRegistryV1SetApprovalForAllAbi,
  ensRegistryV1SetOwnerAbi,
  ensRegistryV1SetResolverAbi,
  ensRegistryV1SetSubnodeOwnerAbi,
  ensRegistryV1SetSubnodeRecordAbi,
  ensRegistryV1SetTTLAbi,
  ensRegistryV1TtlAbi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ensRegistryV1IsApprovedForAllAbi,
  client: publicClient,
});
```

## Exports

| Export                              | Description                                             |
| ----------------------------------- | ------------------------------------------------------- |
| `ensRegistryV1IsApprovedForAllAbi`  | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1OwnerAbi`             | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1ResolverAbi`          | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetApprovalForAllAbi` | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetOwnerAbi`          | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetResolverAbi`       | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetSubnodeOwnerAbi`   | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetSubnodeRecordAbi`  | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1SetTTLAbi`            | Immutable ABI value with viem-compatible literal types. |
| `ensRegistryV1TtlAbi`               | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
