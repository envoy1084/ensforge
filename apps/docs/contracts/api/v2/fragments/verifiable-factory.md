---
title: Verifiable Factory
description: Focused, tree-shakable ABI fragments for Verifiable Factory.
---

# Verifiable Factory

Focused, tree-shakable ABI fragments for Verifiable Factory.

## Import

```ts
import {
  verifiableFactoryV2DeployProxyAbi,
  verifiableFactoryV2VerifyContractAbi,
} from "@ensforge/contracts/v2";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: verifiableFactoryV2DeployProxyAbi,
  client: publicClient,
});
```

## Exports

| Export                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `verifiableFactoryV2DeployProxyAbi`    | Immutable ABI value with viem-compatible literal types. |
| `verifiableFactoryV2VerifyContractAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v2`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
