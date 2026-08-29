---
title: Verifiable Factory
description: Complete ABI for the Verifiable Factory contract.
---

# Verifiable Factory

Complete ABI for the Verifiable Factory contract.

## Import

```ts
import { verifiableFactoryV2Abi } from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: verifiableFactoryV2Abi,
  client: publicClient,
});
```

## Exports

| Export                   | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `verifiableFactoryV2Abi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
