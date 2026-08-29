---
title: Bulk Renewal
description: Complete ABI for the Bulk Renewal contract.
---

# Bulk Renewal

Complete ABI for the Bulk Renewal contract.

## Import

```ts
import {
  bulkRenewalV1InterfaceAbi,
  bulkRenewalV1Abi,
  staticBulkRenewalV1Abi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: bulkRenewalV1InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                      | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `bulkRenewalV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `bulkRenewalV1Abi`          | Immutable ABI value with viem-compatible literal types. |
| `staticBulkRenewalV1Abi`    | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
