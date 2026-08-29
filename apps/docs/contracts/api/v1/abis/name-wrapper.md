---
title: Name Wrapper
description: Complete ABI for the Name Wrapper contract.
---

# Name Wrapper

Complete ABI for the Name Wrapper contract.

## Import

```ts
import { nameWrapperV1Abi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: nameWrapperV1Abi,
  client: publicClient,
});
```

## Exports

| Export             | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `nameWrapperV1Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
