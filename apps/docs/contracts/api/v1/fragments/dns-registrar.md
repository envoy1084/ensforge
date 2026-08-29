---
title: DNS Registrar
description: Focused, tree-shakable ABI fragments for DNS Registrar.
---

# DNS Registrar

Focused, tree-shakable ABI fragments for DNS Registrar.

## Import

```ts
import {
  dnsRegistrarV1InceptionsAbi,
  dnsRegistrarV1OracleAbi,
  dnsRegistrarV1ProveAndClaimAbi,
  dnsRegistrarV1ProveAndClaimWithResolverAbi,
} from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dnsRegistrarV1InceptionsAbi,
  client: publicClient,
});
```

## Exports

| Export                                       | Description                                             |
| -------------------------------------------- | ------------------------------------------------------- |
| `dnsRegistrarV1InceptionsAbi`                | Immutable ABI value with viem-compatible literal types. |
| `dnsRegistrarV1OracleAbi`                    | Immutable ABI value with viem-compatible literal types. |
| `dnsRegistrarV1ProveAndClaimAbi`             | Immutable ABI value with viem-compatible literal types. |
| `dnsRegistrarV1ProveAndClaimWithResolverAbi` | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
