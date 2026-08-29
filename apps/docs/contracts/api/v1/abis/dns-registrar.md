---
title: DNS Registrar
description: Complete ABI for the DNS Registrar contract.
---

# DNS Registrar

Complete ABI for the DNS Registrar contract.

## Import

```ts
import { dnsRegistrarV1InterfaceAbi, dnsRegistrarV1Abi } from "@ensforge/contracts/v1";
```

## Usage

```ts
import { getContract } from "viem";

const contract = getContract({
  address,
  abi: dnsRegistrarV1InterfaceAbi,
  client: publicClient,
});
```

## Exports

| Export                       | Description                                             |
| ---------------------------- | ------------------------------------------------------- |
| `dnsRegistrarV1InterfaceAbi` | Immutable ABI value with viem-compatible literal types. |
| `dnsRegistrarV1Abi`          | Immutable ABI value with viem-compatible literal types. |

## Entrypoint

`@ensforge/contracts/v1`

The values are immutable and can be passed directly to viem contract, log, and encoding utilities.
