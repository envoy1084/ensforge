---
title: Registration
description: Focused, tree-shakable ABI fragments for Registration.
---

# Registration

Focused, tree-shakable ABI fragments for Registration.

## Import

```ts
import {
  ethRegistrarV2CommitAbi,
  ethRegistrarV2RenewAbi,
  ethRegistrarV2RenewalPriceAbi,
  ethRenewerV1RenewAbi,
  ethRenewerV1RenewalPriceAbi,
} from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: ethRegistrarV2CommitAbi,
  client: publicClient,
});
```

## Exports

| Export                          | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| `ethRegistrarV2CommitAbi`       | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2RenewAbi`        | Immutable ABI value with viem-compatible literal types. |
| `ethRegistrarV2RenewalPriceAbi` | Immutable ABI value with viem-compatible literal types. |
| `ethRenewerV1RenewAbi`          | Immutable ABI value with viem-compatible literal types. |
| `ethRenewerV1RenewalPriceAbi`   | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
