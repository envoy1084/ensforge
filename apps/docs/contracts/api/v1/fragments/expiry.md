---
title: Expiry
description: Focused, tree-shakable ABI fragments for Expiry.
---

# Expiry

Focused, tree-shakable ABI fragments for Expiry.

## Import

```ts
import { getExpiryV1RegistrarAbi, getExpiryV1NameWrapperAbi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: getExpiryV1RegistrarAbi,
  client: publicClient,
});
```

## Exports

| Export                      | Description                                             |
| --------------------------- | ------------------------------------------------------- |
| `getExpiryV1RegistrarAbi`   | Immutable ABI value with viem-compatible literal types. |
| `getExpiryV1NameWrapperAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
