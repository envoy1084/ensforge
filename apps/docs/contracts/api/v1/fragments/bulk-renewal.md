---
title: Bulk Renewal
description: Focused, tree-shakable ABI fragments for Bulk Renewal.
---

# Bulk Renewal

Focused, tree-shakable ABI fragments for Bulk Renewal.

## Import

```ts
import { bulkRenewalV1RenewAllAbi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: bulkRenewalV1RenewAllAbi,
  client: publicClient,
});
```

## Exports

| Export                     | Description                                             |
| -------------------------- | ------------------------------------------------------- |
| `bulkRenewalV1RenewAllAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
