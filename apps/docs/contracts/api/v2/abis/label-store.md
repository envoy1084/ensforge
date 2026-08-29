---
title: Label Store
description: Complete ABI for the Label Store contract.
---

# Label Store

Complete ABI for the Label Store contract.

## Import

```ts
import { labelStoreV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: labelStoreV2Abi,
  client: publicClient,
});
```

## Exports

| Export            | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `labelStoreV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
